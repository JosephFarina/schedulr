import * as M from 'moment'
import { createSelector } from 'reselect'
import {
  MorString,
  cloneOrCreateMo,
} from 'src/utils'

import * as I from 'src/models'
import { RState } from 'src/models'
import { getUpdatedEntitiesFactory } from 'src/modules/entityCrudFactories'

export const getRawShifts = (state: I.RState): I.Shifts => Object.assign({}, state.shift.data.shifts)
export const getEditedShifts = (state: I.RState): I.Shifts => Object.assign({}, state.shift.data.editedShifts)
export const getAddedShifts = (state: I.RState): I.Shifts => Object.assign({}, state.shift.data.addedShifts)
export const getDeletedShifts = (state: I.RState): string[] => Object.assign([], state.shift.data.deletedShifts)

/**
 * 
 * Get all shifts -- it gives updated version
 * 
 */


export const getShifts = getUpdatedEntitiesFactory(getRawShifts, getEditedShifts, getAddedShifts, getDeletedShifts)


/**
 * 
 * Get all the shifts of a single day
 * 
 */

export function getShiftsByDay(inputDate: MorString, shifts: I.Shift[]): I.Shift[] {
  const date = cloneOrCreateMo(inputDate)

  if (shifts) {
    return shifts.filter(shift => date.clone().isSame(cloneOrCreateMo(shift.startTime), 'day'))
  }
}


