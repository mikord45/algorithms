import { selectionSort } from "."

describe("Selection sort", ()=>{
	const dataToSort = [156, 141, 35, 94, 88, 61, 111]
	test("Ascending", ()=>{
		expect(selectionSort(dataToSort)).toStrictEqual([35, 61, 88, 94, 111, 141, 156]) 
	})

	test("Descending", ()=>{
		expect(selectionSort(dataToSort, true)).toStrictEqual([156, 141, 111, 94, 88, 61, 35]) 
	})
})