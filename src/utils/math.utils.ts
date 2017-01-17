export function mode(ary: number[]) {
  const counter = {}
  let mode: number[] = []
  let max = 0

  for (let i = 0; i < ary.length; i++) {

    if (!(ary[i] in counter)) {
      counter[ary[i]] = 0
    }

    counter[ary[i]]++

    if (counter[ary[i]] === max) {
      mode.push(ary[i])
    } else if (counter[ary[i]] > max) {
      max = counter[ary[i]]
      mode = [ary[i]]
    }

  }

  return mode[0]
}

export function roundToTwoPlaces(num: number): number {
  return +(Math.round(`${num}e+2` as any) + 'e-2')
}
