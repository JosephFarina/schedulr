// Duration is time in minutes
export interface Shift {
  startTime: string
  duration: number
}

export interface Shifts {
  [id: string]: Shift
}
