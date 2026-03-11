type RecursiveHighestNumberFn = (list: number[], previousHighest?: number) => number

export const recursiveHighestNumber: RecursiveHighestNumberFn = (list, previousHighest) => {
  if(!list[0]){
    return previousHighest ?? null
  }

  const currentElement = list.shift()
  const highest = (!previousHighest || currentElement > previousHighest) ? currentElement : previousHighest
  return recursiveHighestNumber(list, highest)
}