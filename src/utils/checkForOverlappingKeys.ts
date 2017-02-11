import { intersection } from 'ramda'

export function checkForOverlappingKeys(obj1, obj2) {
  const intersectionKeys =
    intersection(Object.keys(obj1), Object.keys(obj2))

  if (intersectionKeys.length > 0) {
    throw new Error(`The provided objects overlap on the following keys ${JSON.stringify(intersectionKeys)}`)
  }
}
