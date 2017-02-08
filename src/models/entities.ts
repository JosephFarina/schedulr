/**
 * 
 * Client Entity
 * 
 */

export interface Client {
  id?: string
  alias?: string
  locations?: string[]
}

export interface Clients {
  [id: string]: Client
}

/**
 * 
 * Location Entity
 * 
 */

export interface Location {
  id?: string
  alias?: string
}

export interface Locations {
  [id: string]: Location
}

/**
 * 
 * Employee Entity
 * 
 */

export interface Employee {
  id?: string
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

export interface Employees {
  [id: string]: Employee
}
