type RecursiveSumFn = (list: number[]) => number

export const recursiveSum:RecursiveSumFn = (list) => {
  if (list.length ===0){
    return 0
  }
  const currentElement = list.shift()
  return currentElement + recursiveSum(list) 
}
