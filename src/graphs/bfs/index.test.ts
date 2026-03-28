import { getPathBFS, GraphNode } from "."

const getDestinationGraphNodes = (destinationExists: boolean) => {
  const node32 = new GraphNode("Piotr", [], destinationExists)
  const node31 = new GraphNode("Patrycja", [])
  const node3 = new GraphNode("Alicja", [node31, node32])
  const node21 = new GraphNode("Tamara", [])
  const node22 = new GraphNode("Jarek", [])
  const node2 = new GraphNode("Cecylia", [node21, node22])
  const node11 = new GraphNode("Janusz", [])
  const node1 = new GraphNode("Bartek", [node11, node31])
  const startingPoint = new GraphNode("Me", [node1, node2, node3])

  return {startingPoint, node1, node32}
}


describe("Looking for a given node", ()=>{
  it("destination node doesn't exist", () => {
    const {startingPoint, node1, node32} = getDestinationGraphNodes(false)

    expect(getPathBFS(startingPoint)).toEqual({
      exists: false,
    })

    // no depth property saved on actual nodes
    expect(node1.depth).toBeUndefined()
    expect(node32.depth).toBeUndefined()
  })

  it("destination node exists", () => {
    const {startingPoint, node1, node32} = getDestinationGraphNodes(true)

    expect(getPathBFS(startingPoint)).toEqual({
      exists: true,
      pathLength: 2
    })

    // no depth property saved on actual nodes
    expect(node1.depth).toBeUndefined()
    expect(node32.depth).toBeUndefined()
  })
})

describe("Looking for a given node by its name", ()=>{
  it("node doesn't exist", () => {
    const {startingPoint, node1, node32} = getDestinationGraphNodes(false)

    expect(getPathBFS(startingPoint, "Jan")).toEqual({
      exists: false,
    })

    // no depth property saved on actual nodes
    expect(node1.depth).toBeUndefined()
    expect(node32.depth).toBeUndefined()
  })

  it("node exists", () => {
    const {startingPoint, node1, node32} = getDestinationGraphNodes(false)

    expect(getPathBFS(startingPoint, "Piotr")).toEqual({
      exists: true,
      pathLength: 2
    })

    // no depth property saved on actual nodes
    expect(node1.depth).toBeUndefined()
    expect(node32.depth).toBeUndefined()
  })
})

describe("Infinite Loop", ()=>{
  it("Infinite loop doesn't happen", () => {
    const node1 = new GraphNode("Node1", [])
    const node21 = new GraphNode("Node21", [])
    const node22 = new GraphNode("Node22", [])
    const node2 = new GraphNode("Node2", [node21, node22])
    node1.linkedWith = [node2]
    node2.linkedWith.push(node1)

    expect(getPathBFS(node1)).toEqual({
      exists: false
    })
  })

})