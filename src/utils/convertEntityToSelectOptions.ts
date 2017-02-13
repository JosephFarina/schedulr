import { map, values } from 'ramda'
import { Option } from 'react-select'
import { Entity, Entities } from 'src/models'


/**
 * 
 * Accepts any entity in object or array format and outputs and array 
 * of React-Select options
 * 
 */


export const convertEntityToSelectOptions = (entities: Entities<any> | Entity): Option[] => {
  if (!Array.isArray(entities)) {
    entities = values(entities)
  }

  return map((val: Entity) => ({ label: val.alias, value: val.id }))(<any> entities)
}
