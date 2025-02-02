import { useState, useEffect, SyntheticEvent } from 'react'
import { IField, IResource } from '../ifx'
import axios, { AxiosError } from 'axios'

export function useResource<T>(baseUrl: string): [T[], IResource<T>] {
  const [resources, setResources] = useState<T[]>([])
  const [errorMessage, setErrorMessage] = useState<string>('')
  useEffect(() => {
    const request = axios.get(`${baseUrl}`)
    request
      .then((response) => {
        setResources(response.data as T[])
      })
      .catch((error: AxiosError) => {
        console.log(error)
        const errMessage = error.message
        const response = error.response
        if (response) {
          const responseData = response.data as typeof response.data & {
            error: string
          }
          setErrorMessage(`${baseUrl} : ${responseData.error}`)
        } else {
          setErrorMessage(`${baseUrl} : Get Data Failed : ${errMessage}`)
        }
      })
  }, [])

  const create = (newResource: T) => {
    axios
      .post(baseUrl, newResource)
      .then((res) => {
        console.log(res.data)
        setResources(resources.concat(res.data as T))
      })
      .catch((error: AxiosError) => {
        console.log(error)
        const errMessage = error.message
        const response = error.response
        if (response) {
          const responseData = response.data as typeof response.data & {
            error: string
          }
          setErrorMessage(
            `${baseUrl} : Create ${newResource} Failed : ${responseData.error}`,
          )
        } else {
          setErrorMessage(
            `${baseUrl} : Create ${newResource} Failed : ${errMessage}`,
          )
        }
      })
  }

  const service = {
    create,
    errorMessage,
  }

  return [resources, service]
}

export function useField<T>(defaultValue: T, type: string): IField<T> {
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
