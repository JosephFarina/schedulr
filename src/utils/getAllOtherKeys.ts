/**
 * 
 * Takes in an objects and a list of keys 
 * 
 * return an array of all the object keys that ARE NOT the provided keys
 * 
 */


export function getAllOtherKeys(obj: Object, keys: string[]): string[] {
  return Object.keys(obj).filter(key => keys.indexOf(key) < 0)
}
