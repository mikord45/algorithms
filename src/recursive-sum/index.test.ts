import { recursiveSum } from "."

describe("Resursive sum", () => {
  test("empty array", () => {
    expect(recursiveSum([])).toEqual(0)
  })

  test("single element in array", () => {
    expect(recursiveSum([5])).toEqual(5)  
  })

  test("multiple elements in array", () => {
    expect(recursiveSum([5, 10, 12, 18])).toEqual(45)
  })
})
