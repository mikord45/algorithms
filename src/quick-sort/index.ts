type QuickSortFn = (list: number[], desc?: boolean) => number[]

export const quickSort: QuickSortFn = (list, desc) => {
  if(list.length < 2){
    return list
  }

  const pivot = list[Math.floor(Math.random() * list.length)]
  const smallerElements: number[] = []
  const biggerElements: number[] = []
  const pivots: number[] = []

  list.forEach((currentElement) => {
    if(currentElement < pivot) {
      smallerElements.push(currentElement)
    }
    else if(currentElement > pivot){
      biggerElements.push(currentElement)
    }
    else{
      pivots.push(pivot)
    }
  })

  if(desc){
    return [...quickSort(biggerElements, desc), ...pivots, ...quickSort(smallerElements, desc)]
  }

  return [...quickSort(smallerElements, desc), ...pivots, ...quickSort(biggerElements, desc)]
}