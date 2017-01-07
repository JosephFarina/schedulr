/**
 * 
 * Client Entity
 * 
 */

export interface Client {
  id?: string
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
  firstName?: string
  lastName?: string
}

export interface Employees {
  [id: string]: Employee
}
