export function errorArrayToString(errs: string[]): string {
  if (errs.length === 1) {
    return `${errs[0]}`
  }

  if (errs.length === 2) {
    return `${errs[0]} and ${errs.length - 1} more error`
  }

  return `${errs[0]} and ${errs.length - 1} more errors`
}
