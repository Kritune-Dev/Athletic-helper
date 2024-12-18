import React, { useState, useEffect, useCallback } from 'react'
import { View, ScrollView } from 'react-native'
import { Surface, TextInput, Text, Card, Divider } from 'react-native-paper'

import { Locales, styles } from '@/lib'

const PaceCalculator = () => {
  const [pace, setPace] = useState('')
  const [distance, setDistance] = useState('')
  const [results, setResults] = useState<{ distance: string; time: string }[]>(
    [],
  )

  const formatTime = (timeInSeconds: number): string => {
    if (timeInSeconds < 60) {
      return `${timeInSeconds.toFixed(2)} ${Locales.t('seconds')}`
    }
    const minutes = Math.floor(timeInSeconds / 60)
    const seconds = (timeInSeconds % 60).toFixed(0).padStart(2, '0')
    return `${minutes} ${Locales.t('minutes')} ${seconds} ${Locales.t('seconds')}`
  }

  const calculatePace = useCallback(() => {
    const distanceValue = parseFloat(distance)
    const paceValue = parseFloat(pace)

    if (
      isNaN(distanceValue) ||
      isNaN(paceValue) ||
      distanceValue <= 0 ||
      paceValue <= 0
    ) {
      setResults([])
      return
    }

    let splitDistances: number[] = []
    if (distanceValue <= 60) {
      splitDistances = [10, 20, 30, 40, 50, 60]
    } else if (distanceValue <= 200) {
      splitDistances = [50, 80, 100, 120, 150, 180, 200]
    } else if (distanceValue <= 800) {
      splitDistances = Array.from(
        { length: Math.ceil(distanceValue / 50) },
        (_, i) => (i + 1) * 50,
      )
    } else {
      splitDistances = Array.from(
        { length: Math.ceil(distanceValue / 100) },
        (_, i) => (i + 1) * 100,
      )
    }

    const calculatedResults = splitDistances
      .filter((d) => d <= distanceValue)
      .map((d) => {
        const timeInSeconds = (d / distanceValue) * paceValue
        return { distance: `${d}m`, time: formatTime(timeInSeconds) }
      })

    setResults(calculatedResults)
  }, [pace, distance]) // Ajout de 'pace' et 'distance' comme dépendances

  useEffect(() => {
    calculatePace()
  }, [calculatePace])

  const handleChangePace = (value: string) => {
    setPace(value.replace(',', '.')) // Remplacer la virgule par un point
  }

  const handleChangeDistance = (value: string) => {
    setDistance(value.replace(',', '.')) // Remplacer la virgule par un point
  }

  return (
    <Surface style={styles.screen}>
      <View style={styles.inputsContainer}>
        <TextInput
          label={Locales.t('distance')}
          value={distance}
          onChangeText={handleChangeDistance}
          keyboardType="numeric"
          returnKeyType="done"
          mode="flat"
          left={<TextInput.Icon icon="ruler" />}
          style={styles.input}
        />

        <TextInput
          label={Locales.t('pace')}
          value={pace}
          onChangeText={handleChangePace}
          keyboardType="numeric"
          returnKeyType="done"
          mode="flat"
          left={<TextInput.Icon icon="run" />}
          style={styles.input}
        />
      </View>

      <Card style={styles.resultsCard} elevation={3}>
        <Card.Title
          title={Locales.t('results')}
          titleStyle={styles.cardTitle}
        />
        <Card.Content>
          <ScrollView>
            {results.length > 0 ? (
              results.map((result, index) => (
                <View key={result.distance}>
                  <View style={styles.resultRow}>
                    <Text style={styles.resultDistance}>{result.distance}</Text>
                    <Text style={styles.resultTime}>{result.time}</Text>
                  </View>
                  {index < results.length - 1 && (
                    <Divider style={styles.divider} />
                  )}
                </View>
              ))
            ) : (
              <Text style={styles.placeholder}>{Locales.t('placeholder')}</Text>
            )}
          </ScrollView>
        </Card.Content>
      </Card>
    </Surface>
  )
}

export default PaceCalculator
