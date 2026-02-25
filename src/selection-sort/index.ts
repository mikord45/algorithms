import { SelectionSearchFn } from "./types"

const getNextElement = (list: number[], desc?: boolean): {result: number, list: number[]} => {
	let result = list[0]
	let resultPosition = 0

	list.forEach((item, index) => {
		if((!desc && item < result) || (desc && item > result)){
			result = item
			resultPosition = index
		}
	})

	list.splice(resultPosition, 1)
	return {result, list }
}

export const selectionSort: SelectionSearchFn = (list, desc) => {
	let unsortedList = [...list]
	const sortedList = []

	while(unsortedList.length > 0) {
    	const {result, list} = getNextElement(unsortedList, desc)
		sortedList.push(result)
		unsortedList = [...list]
	}

	return sortedList
}