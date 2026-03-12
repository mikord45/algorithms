import { quickSort } from "."

describe("Quick sort", () => {
  const dataToSort = [156, 141, 35, 94, 88, 61, 111]
  const dataToSortWithDuplication = [156, 5, 141, 141, 35, 35, 94, 88, 5, 61, 111]
  
  test("Ascending", () => {
    expect(quickSort(dataToSort)).toStrictEqual([35, 61, 88, 94, 111, 141, 156])
  })

  test("Ascending - duplication", () => {
    expect(quickSort(dataToSortWithDuplication)).toStrictEqual([5, 5, 35, 35, 61, 88, 94, 111, 141, 141, 156])
  })

  test("Descending", () => {
    expect(quickSort(dataToSort, true)).toStrictEqual([156, 141, 111, 94, 88, 61, 35])
  })

  test("Descending - duplication", () => {
    expect(quickSort(dataToSortWithDuplication, true)).toStrictEqual([156, 141, 141, 111, 94, 88, 61, 35, 35, 5, 5])
  })
})