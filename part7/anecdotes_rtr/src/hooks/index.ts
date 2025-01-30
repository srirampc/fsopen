import { SyntheticEvent, useState } from 'react'

export function useField<T>(defaultValue: T, type: string) {
  const [value, setValue] = useState<T>(defaultValue)

  const onChange = (event: SyntheticEvent) => {
    const target = event.target as typeof event.target & {
      value: T
    }
    setValue(target.value)
  }

  return {
    type,
    value,
    onChange,
  }
}
