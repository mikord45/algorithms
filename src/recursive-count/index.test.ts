import { recursiveCount } from "."

describe("Resursive count", () => {
  test("empty array", () => {
    expect(recursiveCount([])).toEqual(0)
  })

  test("single element in array", () => {
    expect(recursiveCount([5])).toEqual(1)  
  })

  test("multiple elements in array", () => {
    expect(recursiveCount([5, 10, 12, 18])).toEqual(4)
  })
})
