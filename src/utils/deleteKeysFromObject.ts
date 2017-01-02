export function deleteKeysFromObject(keysToDelete: string[], object: Object): Object {
  const clonedObject = Object.assign({}, object)
  keysToDelete.forEach(key => delete clonedObject[key])
  return clonedObject
}