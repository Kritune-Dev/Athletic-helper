import { useState, useEffect } from 'react'
import { Vibration } from 'react-native'

type Phases = 'marks' | 'set' | 'go'

const useChronometer = (
  initialMarksTime: number,
  initialSetTime: number,
  playSound: (phase: Phases) => void,
  vibrationsEnabled: boolean,
) => {
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const [currentPhase, setCurrentPhase] = useState<Phases>('marks')
  const [timeLeft, setTimeLeft] = useState(initialMarksTime)

  const getNextPhase = (currentPhase: Phases): Phases => {
    return currentPhase === 'marks'
      ? 'set'
      : currentPhase === 'set'
        ? 'go'
        : 'marks'
  }

  const triggerVibration = (phase: Phases) => {
    if (!vibrationsEnabled) return
    const vibrationPattern: { [key in Phases]: number[] } = {
      marks: [0, 200],
      set: [0, 400],
      go: [0, 600],
    }
    Vibration.vibrate(vibrationPattern[phase])
  }

  useEffect(() => {
    if (!isTimerRunning) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          if (currentPhase !== 'go') {
            const nextPhase = getNextPhase(currentPhase)
            setCurrentPhase(nextPhase)

            // Gestion des sons et vibrations
            playSound(nextPhase)
            triggerVibration(nextPhase)

            return nextPhase === 'marks' ? initialMarksTime : initialSetTime
          }
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [
    isTimerRunning,
    currentPhase,
    initialMarksTime,
    initialSetTime,
    playSound,
    vibrationsEnabled,
    triggerVibration,
  ])

  return {
    isTimerRunning,
    currentPhase,
    timeLeft,
    start: () => {
      setIsTimerRunning(true)
      setCurrentPhase('marks')
      setTimeLeft(initialMarksTime)

      // Déclenche les sons et vibrations au démarrage
      playSound('marks')
      triggerVibration('marks')
    },
    stopAndReset: () => {
      setIsTimerRunning(false)
      setCurrentPhase('marks')
      setTimeLeft(initialMarksTime)
    },
  }
}

export default useChronometer
