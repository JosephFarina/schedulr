export interface Entity {
  id?: string
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
}

/**
 * Difference between this and employee is that 
 * is it has an array of employee objects
 */

export interface NestedEmployee extends Employee {
  employees?: Employee[]
}

export interface Employees extends Entities<Employee> { }
