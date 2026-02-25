import { binarySearch } from "."

describe("No elements in array", ()=>{
	test("Doesn't exist", ()=>{
		expect(binarySearch([], 2)).toBe(null) 
	})
})

describe("Single element in array", ()=>{
	test("Exists", ()=>{
		expect(binarySearch([1], 1)).toBe(0)
	})
	test("Doesn't exist", ()=>{
		expect(binarySearch([1], 2)).toBe(null) 
	})
})

describe("Multiple elements in array", ()=>{
	test("Exists", ()=> {
		expect(binarySearch([1, 2], 2)).toBe(1)
		expect(binarySearch([1, 2], 1)).toBe(0)
		expect(binarySearch([1, 2, 3], 1)).toBe(0)
		expect(binarySearch([1, 2, 3], 2)).toBe(1)
		expect(binarySearch([1, 2, 3], 3)).toBe(2)
		expect(binarySearch([1, 2, 3, 4], 1)).toBe(0)
		expect(binarySearch([1, 2, 3, 4], 2)).toBe(1)
		expect(binarySearch([1, 2, 3, 4], 3)).toBe(2)
		expect(binarySearch([1, 2, 3, 4], 4)).toBe(3)
		expect(binarySearch([1, 3, 5, 7, 9], 1)).toBe(0)
		expect(binarySearch([1, 3, 5, 7, 9], 3)).toBe(1)
		expect(binarySearch([1, 3, 5, 7, 9], 5)).toBe(2)
		expect(binarySearch([1, 3, 5, 7, 9], 7)).toBe(3)
		expect(binarySearch([1, 3, 5, 7, 9], 9)).toBe(4)
	})
	test("Doesn't exist", ()=> {
		expect(binarySearch([1, 2], 3)).toBe(null)
		expect(binarySearch([1, 2, 3], 4)).toBe(null)
		expect(binarySearch([1, 2, 3, 4], 5)).toBe(null)
		expect(binarySearch([1, 3, 5, 7, 9], 11)).toBe(null)
		expect(binarySearch([1, 3, 5, 7, 9], -5)).toBe(null)
	})
})