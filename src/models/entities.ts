export interface Entity {
  id?: string
  alias?: string
}

export interface Entities<T> {
  [id: string]: T
}

/**
 * 
 * Shift Entity
 * 
 */

// Duration is time in minutes

export interface SharedShiftData extends Entity {
  startTime?: string
  duration?: number
  location?: string
  client?: string
}

// Used for creating multiple shifts at onces
export interface ShiftTemplate extends SharedShiftData { }

export interface Shift extends SharedShiftData {
  employee?: string
}

export interface Shifts extends Entities<Shift> { }

export interface UnnormalizedShift extends Entity {
  employee?: Employee
  startTime?: string
  duration?: number
  location: Location
  client?: Client
}


/**
 * 
 * Client Entity
 * 
 */

export interface Client extends Entity {
  alias?: string
  locations?: string[]
}

export interface Clients extends Entities<Client> { }

/**
 * 
 * Location Entity
 * 
 */

export interface Location extends Entity {
  alias?: string
}

export interface Locations extends Entities<Location> { }

/**
 * 
 * Employee Entity
 * 
 */

export interface Employee extends Entity {
  alias?: string
  firstName?: string
  lastName?: string
  manager?: string

  position?: string | Position
}

/**
 * Difference between this and employee is that 
 * is it has an array of employee objects
 */

export interface NestedEmployee extends Employee {
  employees?: Employee[]
}

export interface Employees extends Entities<Employee> { }

export interface EmployeeWithPosition extends Employee {
  position: Position
}

/**
 * 
 * Position entity
 * 
 */

export interface Position extends Entity { }

export interface Positions extends Entities<Position> { }


/**
 * 
 * EmployeeFavorability entity
 * 
 */

export interface EmployeeFavorability extends Entity {
  client: string
  employee: string
  rating: number
  canWorkWith: boolean
  isDefaultRating: boolean
}

export interface UnnormalizedEmployeeFavorability extends Entity {
  client: Client
  employee: Employee
  rating: number
  canWorkWith: boolean
  isDefaultRating: boolean
}

export interface EmployeeFavorabilies extends Entities<EmployeeFavorability> { }
