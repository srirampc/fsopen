import { SyntheticEvent } from "react"

export interface IField<T> {
  type: string
  value: T
  onChange: (event: SyntheticEvent) => void
}


export interface IResource<T> {
    create: (newResource: T) => void
    errorMessage: string
}

export interface INote {
    id?: string
    content: string
}

export interface IPerson {
    id?: string
    name: string
    number: string
}
