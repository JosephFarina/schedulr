import { Shift, RState, Shifts } from 'src/models'
import * as Crud from 'src/modules/entityCrudFactories'
import { MorString, cloneOrCreateMo, } from 'src/utils'


export const getRawShifts = (state: RState): Shifts => Object.assign({}, state.entities.shifts.raw)
export const getEditedShifts = (state: RState): Shifts => Object.assign({}, state.entities.shifts.edited)
export const getAddedShifts = (state: RState): Shifts => Object.assign({}, state.entities.shifts.added)
export const getDeletedShifts = (state: RState): string[] => Object.assign([], state.entities.shifts.deleted)


/**
 * 
 * Get all shifts -- it gives updated version
 * 
 */

export const getShifts = Crud.getUpdatedEntitiesFactory(getRawShifts, getEditedShifts, getAddedShifts, getDeletedShifts)

/**
 * 
 * Get all the shifts of a single day
 * 
 */

export function getShiftsByDay(inputDate: MorString, shifts: Shift[]): Shift[] {
  const date = cloneOrCreateMo(inputDate)

  if (shifts) {
    return shifts.filter(shift => date.clone().isSame(cloneOrCreateMo(shift.startTime), 'day'))
  }
}
