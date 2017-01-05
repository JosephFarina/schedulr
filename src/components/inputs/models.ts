export interface InputProps {
  label?: string
  value: string
  onBlur?(): void
  onFocus?(): void
  onChangeEnd?(): void
  onChange(val?: string): void
}

export interface InputI {
  onChange(): void
}



