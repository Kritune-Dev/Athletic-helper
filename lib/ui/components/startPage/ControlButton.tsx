import React from 'react'
import { Button } from 'react-native-paper'

type ControlButtonProps = {
  condition: boolean
  onTrue: () => void
  onFalse: () => void
  trueLabel: string
  falseLabel: string
}

const ControlButton = ({
  condition,
  onTrue,
  onFalse,
  trueLabel,
  falseLabel,
}: ControlButtonProps) => (
  <Button mode="contained" onPress={condition ? onTrue : onFalse}>
    {condition ? trueLabel : falseLabel}
  </Button>
)

export default ControlButton
