import { CustomMap } from "."

describe("Custom Map", () => {
  it("Scenario 1", ()=>{
    const map1 = new CustomMap()

    expect(map1.numberOfElementsInTable).toBe(0)
    expect(map1.table.length).toBe(100)

    Array.from({length: 10}, (_,index) => {
      map1.add(`key${index}`, `value${index}`)
    })

    expect(map1.numberOfElementsInTable).toBe(10)
    expect(map1.table.length).toBe(100)

    Array.from({length: 10}, (_,index) => {
      expect(map1.get(`key${index}`)).toEqual({key: `key${index}`, value: `value${index}`})
    })

    Array.from([2,4,7]).forEach((currentElement)=>{
      map1.delete(`key${currentElement}`)
    })

    expect(map1.numberOfElementsInTable).toBe(7)

    map1.add("specialKey1", "specialValue1")
    map1.add("specialKey2", "specialValue2")

    expect(map1.numberOfElementsInTable).toBe(9)
    expect(map1.get("specialKey1")).toEqual({key: "specialKey1", value: "specialValue1"})
    expect(map1.get("specialKey2")).toEqual({key: "specialKey2", value: "specialValue2"})

    Array.from([0,1,3,5,6,8,9], (currentElement) => {
      expect(map1.get(`key${currentElement}`)).toEqual({key: `key${currentElement}`, value: `value${currentElement}`})
    })

    Array.from([2,4,7]).forEach((currentElement)=>{
      expect(map1.get(`key${currentElement}`)).toBe(undefined)
    })
  })
})

