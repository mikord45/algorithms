import { recursiveHighestNumber } from "."

describe("Resursive highest number", () => {
  test("empty array", () => {
    expect(recursiveHighestNumber([])).toEqual(null)
  })

  test("single element in array", () => {
    expect(recursiveHighestNumber([5])).toEqual(5)  
  })

  test("multiple elements in array", () => {
    expect(recursiveHighestNumber([5, 10, 12, 18])).toEqual(18)
  })
})
