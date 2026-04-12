import { getPathBFS, GraphNode, isTreeBFS, topologySortBFS } from "."

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

  return {startingPoint, node1, node32, node31}
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

describe("Topology Sort", () => {
  it("Throws an error when graph has cycles", () => {
    const node1 = new GraphNode("Node1", [])
    const node21 = new GraphNode("Node21", [])
    const node22 = new GraphNode("Node22", [])
    const node2 = new GraphNode("Node2", [node21, node22])
    node1.linkedWith = [node2]
    node2.linkedWith.push(node1)

    expect(() => topologySortBFS(node1)).toThrowError("Graph has cycles")
  })

  it("Throws an error when graph has cycles in the middle", () => {
    const node21 = new GraphNode("Node21", [])
    const node22 = new GraphNode("Node22", [node21])
    node21.linkedWith.push(node22)
    const node2 = new GraphNode("Node2", [node21, node22])
    const node1 = new GraphNode("Node1", [node2])

    expect(() => topologySortBFS(node1)).toThrowError("Graph has cycles")
  })

  it("Throws on complex graph with cycles", ()=>{
    const node41 = new GraphNode("Node41", [])
    const node31 = new GraphNode("Node31", [node41])
    const node32 = new GraphNode("Node32", [])
    const node21 = new GraphNode("Node21", [node31])
    const node22 = new GraphNode("Node22", [node32])
    const node1 = new GraphNode("Node1", [node21, node22])
    node41.linkedWith.push(node32)
    node32.linkedWith.push(node21)

    expect(() => topologySortBFS(node1)).toThrowError("Graph has cycles")
  })

  it("Sorts complex graph", ()=>{
    const node41 = new GraphNode("Node41", [])
    const node31 = new GraphNode("Node31", [node41])
    const node32 = new GraphNode("Node32", [])
    const node21 = new GraphNode("Node21", [node31])
    const node22 = new GraphNode("Node22", [node32])
    const node1 = new GraphNode("Node1", [node21, node22])
    node32.linkedWith.push(node21)

    expect(topologySortBFS(node1).map((current) => current.name)).toEqual(["Node1", "Node22", "Node32", "Node21", "Node31", "Node41"])
  })

  it("Sorts complex graph 2", ()=>{
    const node42 = new GraphNode("Node42", [])
    const node41 = new GraphNode("Node41", [])
    const node31 = new GraphNode("Node31", [node41])
    const node32 = new GraphNode("Node32", [])
    const node21 = new GraphNode("Node21", [node31])
    const node22 = new GraphNode("Node22", [node32])
    const node1 = new GraphNode("Node1", [node21, node22])
    node41.linkedWith.push(node32)
    node32.linkedWith.push(node42)

    expect(topologySortBFS(node1).map((current) => current.name)).toEqual(["Node1", "Node21", "Node22", "Node31", "Node41", "Node32", "Node42"])
  })

  it("Sorts complex graph 3", ()=>{
    const node42 = new GraphNode("Node42", [])
    const node41 = new GraphNode("Node41", [])
    const node31 = new GraphNode("Node31", [node41])
    const node32 = new GraphNode("Node32", [])
    const node21 = new GraphNode("Node21", [node31])
    const node22 = new GraphNode("Node22", [node32])
    const node1 = new GraphNode("Node1", [node21, node22])
    node32.linkedWith.push(node42)

    expect(topologySortBFS(node1).map((current) => current.name)).toEqual(["Node1", "Node21", "Node22", "Node31", "Node32", "Node41", "Node42"])
  })

  it("Sorts graph correctly revisiting node 3 times", ()=>{
    const node51 = new GraphNode("Node51", [])
    const node41 = new GraphNode("Node41", [node51])
    const node34 = new GraphNode("Node34", [node41])
    const node33 = new GraphNode("Node33", [])
    const node32 = new GraphNode("Node32", [])
    const node31 = new GraphNode("Node31", [])
    const node23 = new GraphNode("Node23", [node34])
    const node22 = new GraphNode("Node22", [node33])
    const node21 = new GraphNode("Node21", [node31, node32])
    const node1 = new GraphNode("Node1", [node21, node22, node23])
    node33.linkedWith.push(node21)
    node41.linkedWith.push(node21)
    node32.linkedWith.push(node51)

    expect(topologySortBFS(node1).map((current) => current.name)).toEqual(["Node1", "Node22", "Node23", "Node33", "Node34", "Node41", "Node21", "Node31", "Node32", "Node51"])
  })

  it("Sorts very complex graph", () => {
    const node44 = new GraphNode("Node44", [])
    const node43 = new GraphNode("Node43", [node44])
    const node42 = new GraphNode("Node42", [])
    const node41 = new GraphNode("Node41", [])
    const node33 = new GraphNode("Node33", [node44])
    const node32 = new GraphNode("Node32", [node43, node33])
    const node31 = new GraphNode("Node31", [node41, node42])
    const node23 = new GraphNode("Node23", [node32, node33])
    const node22 = new GraphNode("Node22", [node31, node32])
    const node21 = new GraphNode("Node21", [node31])
    const node1 = new GraphNode("Node1", [node21, node22, node23])
    node42.linkedWith.push(node32)

    expect(topologySortBFS(node1).map((current) => current.name)).toEqual(["Node1", "Node21", "Node22", "Node23", "Node31", "Node41", "Node42", "Node32", "Node43", "Node33", "Node44"])
  })

  it("Throws on cycle in very complex graph" , ()=>{
    const node44 = new GraphNode("Node44", [])
    const node43 = new GraphNode("Node43", [node44])
    const node42 = new GraphNode("Node42", [])
    const node41 = new GraphNode("Node41", [])
    const node33 = new GraphNode("Node33", [node44])
    const node32 = new GraphNode("Node32", [node43, node33])
    const node31 = new GraphNode("Node31", [node41, node42])
    const node23 = new GraphNode("Node23", [node32, node33])
    const node22 = new GraphNode("Node22", [node31, node32])
    const node21 = new GraphNode("Node21", [node31])
    const node1 = new GraphNode("Node1", [node21, node22, node23])
    node42.linkedWith.push(node32)
    node43.linkedWith.push(node31)

    expect(() => topologySortBFS(node1)).toThrowError("Graph has cycles")
  })

  it("Throws on cycle in very complex graph 2" , ()=>{
    const node44 = new GraphNode("Node44", [])
    const node43 = new GraphNode("Node43", [node44])
    const node42 = new GraphNode("Node42", [])
    const node41 = new GraphNode("Node41", [])
    const node33 = new GraphNode("Node33", [node44])
    const node32 = new GraphNode("Node32", [node43, node33])
    const node31 = new GraphNode("Node31", [node41, node42])
    const node23 = new GraphNode("Node23", [node32, node33])
    const node22 = new GraphNode("Node22", [node31, node32])
    const node21 = new GraphNode("Node21", [node31])
    const node1 = new GraphNode("Node1", [node21, node22, node23])
    node42.linkedWith.push(node32)
    node44.linkedWith.push(node32)

    expect(() => topologySortBFS(node1)).toThrowError("Graph has cycles")
  })

  it("Sorts simple graph correctly", ()=>{
    const node4 = new GraphNode("Node4", [])
    const node2 = new GraphNode("Node2", [])
    const node3 = new GraphNode("Node3", [node4])
    const node1 = new GraphNode("Node1", [node2, node3])

    expect(topologySortBFS(node1).map((current) => current.name)).toEqual(["Node1", "Node2", "Node3", "Node4"])
  })

  it("Sorts graph correctly", ()=>{
    const node21 = new GraphNode("Node21", [])
    const node22 = new GraphNode("Node22", [])
    const node2 = new GraphNode("Node2", [node21, node22])
    const node31 = new GraphNode("Node31", [])
    const node3 = new GraphNode("Node3", [node31])
    const node4 = new GraphNode("Node4", [])
    const node1 = new GraphNode("Node1", [node2, node3, node4])

    expect(topologySortBFS(node1).map((current) => current.name)).toEqual(["Node1", "Node2", "Node3", "Node4", "Node21", "Node22", "Node31"])
  })

  it("Sorts graph with multiple parents of the element correctly", () => {
    const {startingPoint} = getDestinationGraphNodes(false)

    expect(topologySortBFS(startingPoint).map((current) => current.name)).toEqual(["Me", "Bartek", "Cecylia", "Alicja", "Janusz", "Tamara", "Jarek", "Patrycja", "Piotr"])
  })

  it("Sorts graph with multiple parents of the element in the middle correctly", ()=>{
    const {startingPoint, node31} = getDestinationGraphNodes(false)
    const node311 = new GraphNode("Node311")
    const node312 = new GraphNode("Node312")
    node31.linkedWith.push(node311, node312)

    expect(topologySortBFS(startingPoint).map((current) => current.name)).toEqual(["Me", "Bartek", "Cecylia", "Alicja", "Janusz", "Tamara", "Jarek", "Patrycja", "Piotr", "Node311", "Node312"])
  })
})

describe("Trees", () => { 
  it("Detects a tree correctly - 1", ()=>{
    const node34 = new GraphNode("Node34")
    const node33 = new GraphNode("Node33")
    const node32 = new GraphNode("Node32")
    const node31 = new GraphNode("Node31")
    const node22 = new GraphNode("Node22", [node33, node34])
    const node21 = new GraphNode("Node21", [node31, node32])
    const node1 = new GraphNode("Node1", [node21, node22])

    expect(isTreeBFS(node1)).toBe(true)
  })

  it("Detects a tree correctly - 2", ()=>{
    const node32 = new GraphNode("Node32")
    const node31 = new GraphNode("Node31")
    const node22 = new GraphNode("Node22", [])
    const node21 = new GraphNode("Node21", [node31, node32])
    const node1 = new GraphNode("Node1", [node21, node22])

    expect(isTreeBFS(node1)).toBe(true)
  })

  it("Detects a tree correctly - 3", ()=>{
    const node31 = new GraphNode("Node31")
    const node22 = new GraphNode("Node22", [])
    const node21 = new GraphNode("Node21", [node31])
    const node1 = new GraphNode("Node1", [node21, node22])

    expect(isTreeBFS(node1)).toBe(true)
  })

  it("Detects not a tree correctly - 1", ()=>{
    const node34 = new GraphNode("Node34")
    const node33 = new GraphNode("Node33")
    const node32 = new GraphNode("Node32")
    const node31 = new GraphNode("Node31")
    const node22 = new GraphNode("Node22", [node33, node34])
    const node21 = new GraphNode("Node21", [node31, node32])
    const node1 = new GraphNode("Node1", [node21, node22])
    node31.linkedWith.push(node21)

    expect(isTreeBFS(node1)).toBe(false)
  })

  it("Detects not a tree correctly - 2", ()=>{
    const node32 = new GraphNode("Node32")
    const node31 = new GraphNode("Node31")
    const node22 = new GraphNode("Node22", [node31, node32])
    const node21 = new GraphNode("Node21", [])
    const node1 = new GraphNode("Node1", [node21, node22])
    node31.linkedWith.push(node21)

    expect(isTreeBFS(node1)).toBe(false)
  })

  it("Detects not a tree correctly - 3", ()=>{
    const node32 = new GraphNode("Node32")
    const node31 = new GraphNode("Node31")
    const node22 = new GraphNode("Node22", [node31, node32])
    const node21 = new GraphNode("Node21", [])
    const node1 = new GraphNode("Node1", [node21, node22])
    node32.linkedWith.push(node1)

    expect(isTreeBFS(node1)).toBe(false)
  })

  it("Detects not a tree correctly - 4", ()=>{
    const node32 = new GraphNode("Node32")
    const node31 = new GraphNode("Node31")
    const node22 = new GraphNode("Node22", [node31, node32])
    const node21 = new GraphNode("Node21", [node31])
    const node1 = new GraphNode("Node1", [node21, node22])

    expect(isTreeBFS(node1)).toBe(false)
  })
})