type RecursiveCountFn = (list: number[]) => number

export const recursiveCount:RecursiveCountFn = (list) => {
  if (list[0]){
    list.shift()
    return 1 + recursiveCount(list) 
  }
  return 0
}
