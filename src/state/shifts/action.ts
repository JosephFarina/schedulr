import * as Models from './../../models'
import { ActionTypes } from './../actionTypes'

/**
 * 
 * Time Range Switching
 * 
 */

export const addShifts = (shifts: Models.Shifts): Models.Action<Models.RShifts> => {
  return {
    type: ActionTypes.addShifts,
    payload: {
      shifts
    }
  }
}
