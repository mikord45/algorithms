import { CustomMap } from "."

const map = new CustomMap(4)
map.add("very different key", "value1")
console.log(map)
map.add("randomKey", "value3")
console.log(map)
map.add("Lorem", "value3")
console.log(map) 


it("test", ()=>{
  expect(1).toBe(1)
})