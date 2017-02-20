import { RState, REmployeeInspector, UnnormalizedShift } from 'src/models'

export const getEmployeeInspectorUpcomingShifts = (state: RState): UnnormalizedShift[] => state.entities.employees.inspector.upcomingShifts

export const fetchingEmployeeInspectorDetails = (state: RState): boolean => state.entities.employees.inspector.fetching
