import * as Models from './../../models'
import { ActionTypes } from './../actionTypes'

/**
 * 
 * CRUD OPERATIONS FOR SHIFTS
 * 
 */

/** 
 * Add a shift / remove a shift that was added 
 */

export function addShifts(shifts: Models.Shift[]): Models.Action<Models.RShifts> {
  // convert shift to an object
  const addedShifts = {}
  shifts.forEach(shift => {
    addedShifts[shift.id] = shift
  })

  return {
    type: ActionTypes.addShifts,
    payload: addedShifts
  }
}

export function deleteAddedShifts(shifts: Models.Shift[]): Models.Action<string[]> {
  return {
    type: ActionTypes.removeAddedShifts,
    payload: shifts.map(shift => shift.id)
  }
}
