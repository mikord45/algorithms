import {BinarySearchFn} from "./types"
export const binarySearch: BinarySearchFn = (list, searchingFor) => {
    let low = 0
    let high = list.length - 1

    while (low <= high){
        const mid = Math.floor((low + high) / 2)
        const currentMidValue = list[mid]
        if(currentMidValue > searchingFor){
            high = mid - 1
        }
        else if(currentMidValue < searchingFor){
            low = mid + 1
        }
        else{
            return mid
        }
    }
    return null
}

const testFn = () => {
    console.log(binarySearch([1], 1), "0")
    console.log(binarySearch([1], 2), "null")
}

testFn()

console.log(binarySearch([1], 1), "0")
console.log(binarySearch([1], 2), "null")
console.log(binarySearch([1, 2], 2), "1")
console.log(binarySearch([1, 2], 1), "0")
console.log(binarySearch([1, 2], 3), "null")
console.log(binarySearch([1, 2, 3], 1), "0")
console.log(binarySearch([1, 2, 3], 2), "1")
console.log(binarySearch([1, 2, 3], 3), "2")
console.log(binarySearch([1, 2, 3], 4), "null")
console.log(binarySearch([1, 2, 3, 4], 1), "0")
console.log(binarySearch([1, 2, 3, 4], 2), "1")
console.log(binarySearch([1, 2, 3, 4], 3), "2")
console.log(binarySearch([1, 2, 3, 4], 4), "3")
console.log(binarySearch([1, 2, 3, 4], 5), "null")
console.log(binarySearch([1, 3, 5, 7, 9], 1), "0")
console.log(binarySearch([1, 3, 5, 7, 9], 3), "1")
console.log(binarySearch([1, 3, 5, 7, 9], 5), "2")
console.log(binarySearch([1, 3, 5, 7, 9], 7), "3")
console.log(binarySearch([1, 3, 5, 7, 9], 9), "4")
console.log(binarySearch([1, 3, 5, 7, 9], 11), "null")
console.log(binarySearch([1, 3, 5, 7, 9], -5), "null")