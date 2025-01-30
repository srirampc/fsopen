import { SyntheticEvent, useState } from 'react'
import { IField } from '../ifx'

export function useField<T>(defaultValue: T, type: string): IField<T> {
  const [value, setValue] = useState<T>(defaultValue)

  const onChange = (event: SyntheticEvent) => {
    const target = event.target as typeof event.target & {
      value: T
    }
    setValue(target.value)
  }

  const reset = () => {
    setValue(defaultValue)
  }

  return {
    type,
    value,
    onChange,
    reset,
  }
}
