export type ValidatorResponseObject<T> = {
[P in keyof T]?: string[]
}

export type Validator<T> = {
[P in keyof T]:  {
    message: string,
    isValid(val: T[P]): boolean
  }
}
