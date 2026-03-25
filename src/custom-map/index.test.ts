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

  it("Scenario 2", () => {
    const map2 = new CustomMap(6)

    expect(map2.numberOfElementsInTable).toBe(0)
    expect(map2.table.length).toBe(6)

    map2.add("key", "value")
    map2.add("key1", "value1")
    map2.add("key2", "value2")
    map2.add("key3", "value3")
    map2.add("key3", "value3")
    map2.add("key2", "value2")

    expect(map2.numberOfElementsInTable).toBe(4)
    Array.from(["", 1, 2, 3], (current) => {
      expect(map2.get(`key${current}`)).toEqual({key: `key${current}`, value: `value${current}`})
    })
    expect(map2.get("key4")).toBe(undefined)
    expect(map2.table).toEqual([      
      { key: "key1", value: "value1" },
      undefined, undefined, undefined, undefined,
      [
        { key: "key", value: "value" },
        { key: "key2", value: "value2" },
        { key: "key3", value: "value3" }
      ]])

    map2.delete("key2")
    map2.delete("key")
    map2.delete("key1")
    expect(map2.numberOfElementsInTable).toBe(1)
    expect(map2.table).toEqual([      
      undefined, undefined, undefined, undefined, undefined,
      { key: "key3", value: "value3" }
    ])
    expect(map2.get("key3")).toEqual({key: "key3", value: "value3"})
    expect(map2.get("key")).toEqual(undefined)
    expect(map2.get("key1")).toEqual(undefined)
    expect(map2.get("key2")).toEqual(undefined)

    map2.add("key", "value")
    map2.add("key1", "value1")
    map2.add("key2", "value2")
    map2.add("key2", "value2")

    expect(map2.numberOfElementsInTable).toBe(4)
    expect(map2.table.length).toBe(6)
    expect(map2.table).toEqual([      
      { key: "key1", value: "value1" },
      undefined, undefined, undefined, undefined,
      [
        { key: "key3", value: "value3" },
        { key: "key", value: "value" },
        { key: "key2", value: "value2" }
      ]])

    map2.add("key4", "value4")

    expect(map2.table).toEqual([      
      { key: "key1", value: "value1" },
      undefined, undefined, undefined,
      { key: "key4", value: "value4" },
      [
        { key: "key3", value: "value3" },
        { key: "key2", value: "value2" }
      ], 
      undefined, undefined, undefined, undefined, undefined, 
      {key: "key", value: "value"}])
    expect(map2.numberOfElementsInTable).toBe(5)
    expect(map2.table.length).toBe(12)
    Array.from(["", 1, 2, 3, 4], (current)=>{
      expect(map2.get(`key${current}`)).toEqual({key: `key${current}`,value: `value${current}`})
    })
    expect(map2.get("key5")).toBe(undefined)

    map2.add("key5", "value5")
    map2.delete("key5")
    map2.delete("key3")
    map2.delete("key2")
    map2.delete("key6")
    
    expect(map2.numberOfElementsInTable).toBe(3)
    expect(map2.table).toEqual([      
      { key: "key1", value: "value1" },
      undefined, undefined, undefined,
      { key: "key4", value: "value4" },
      undefined, undefined, undefined, undefined, undefined, undefined,
      { key: "key", value: "value"}
    ])
    Array.from(["", 1, 4], (current)=>{
      expect(map2.get(`key${current}`)).toEqual({key: `key${current}`, value: `value${current}`})
    })
    Array.from([2, 3, 5], (current)=>{
      expect(map2.get(`key${current}`)).toBe(undefined)
    })

    map2.add("key2", "value2")
    map2.add("key3", "value3")
    map2.add("key3", "value3")
    map2.add("key5", "value5")

    expect(map2.table).toEqual([
      { key: "key1", value: "value1" },
      undefined, undefined, undefined,
      { key: "key4", value: "value4" },
      [
        { key: "key2", value: "value2" },
        { key: "key3", value: "value3" },
        { key: "key5", value: "value5" }
      ],
      undefined, undefined, undefined, undefined, undefined,
      { key: "key", value: "value" }
    ])
    expect(map2.numberOfElementsInTable).toBe(6)
    expect(map2.table.length).toBe(12)

    map2.add("key6", "value6")
    map2.add("key7", "value7")
    map2.add("key8", "value8")

    expect(map2.numberOfElementsInTable).toBe(9)
    expect(map2.table.length).toBe(24)
    expect(map2.table).toEqual([
      { key: "key1", value: "value1" },
      { key: "key7", value: "value7" },
      undefined, undefined,
      [
        { key: "key4", value: "value4" },
        { key: "key8", value: "value8" }
      ],
      [
        { key: "key2", value: "value2" },
        { key: "key3", value: "value3" },
        { key: "key5", value: "value5" }
      ],
      undefined, undefined, undefined, undefined, undefined,
      { key: "key", value: "value" },
      undefined, undefined, undefined, undefined, undefined, undefined,
      { key: "key6", value: "value6" },
      undefined, undefined, undefined, undefined, undefined,
    ])
    Array.from(["", 1, 2, 3, 4, 5, 6, 7, 8], (current)=>{
      expect(map2.get(`key${current}`)).toEqual({key: `key${current}`, value: `value${current}`})
    })
    Array.from([0, 9, 10], (current)=>{
      expect(map2.get(`key${current}`)).toBe(undefined)
    })
  })
})

