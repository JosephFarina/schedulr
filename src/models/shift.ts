// Duration is time in minutes
export interface Shift {
  id: string
  startTime: string
  duration: number
}

export interface Shifts {
  [id: string]: Shift
}
