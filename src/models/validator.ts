export type ValidatorResponseObject<T> = {
[P in keyof T]?: string[]
}

export type Validator<T> = {
[P in keyof T]:  {
    invalid(val: T[P]): string[] | null
  }
}
