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