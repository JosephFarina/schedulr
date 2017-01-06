// Duration is time in minutes
export interface Shift {
  id?: string
  startTime?: string
  duration?: number
  location?: string
  employee?: string[]
  client?: string
}

export interface Shifts {
  [id: string]: Shift
}
