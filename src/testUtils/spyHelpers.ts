const curry = require('ramda/src/curry')

export function lastSpyCall(spy: jasmine.Spy): any[] {
  return spy.calls.mostRecent().args || null
}

export const createApiSpy = curry((mod: any, method: string, val: Promise<any>) => {
  return spyOn(mod, method).and.returnValue(val)
})

export const testSpyFlow = (dis: jasmine.Spy, args: any[]) => {
  args.forEach((arg, i) => {
    const dispatchArgs = dis.calls.all()[i] ? dis.calls.all()[i].args : undefined
    expect(dispatchArgs).toEqual([arg])
  })
}
