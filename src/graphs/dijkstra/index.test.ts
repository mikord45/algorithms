import { DijkstraGraphNode, getPathDijkstra } from "."

describe("Detects path correctly", () => {
  it("example 1", () =>{
    const nodeEnd = new DijkstraGraphNode("End", [])
    const node22 = new DijkstraGraphNode("22", [{node: nodeEnd, cost: 1}])
    const node21 = new DijkstraGraphNode("21", [{node: node22, cost: 6}, {node: nodeEnd, cost: 3}])
    const node11 = new DijkstraGraphNode("11", [{node: node21, cost: 4}, {node: node22, cost: 2}])
    const node12 = new DijkstraGraphNode("12", [{node: node11, cost: 8}, {node: node22, cost: 7}])
    const nodeStart = new DijkstraGraphNode("Start", [{node: node11, cost: 5}, {node: node12, cost: 2}])

    expect(getPathDijkstra(nodeStart, nodeEnd.id)).toBe(8)
  })

  it("example 2", () => {
    const nodeEnd = new DijkstraGraphNode("End", [])
    const node21 = new DijkstraGraphNode("21", [])
    const node31 = new DijkstraGraphNode("31", [{node: nodeEnd, cost: 30}, {node: node21, cost: 1}])
    const node11 = new DijkstraGraphNode("11", [{node: node31, cost: 20}])
    const nodeStart = new DijkstraGraphNode("Start", [{node: node11, cost: 10}])
    node21.linkedWith.push({node: node11, cost: 1})

    expect(getPathDijkstra(nodeStart, nodeEnd.id)).toBe(60)
  })

  it("example 3", () => {
    const nodeEnd = new DijkstraGraphNode("End", [])
    const node31 = new DijkstraGraphNode("31", [{node: nodeEnd, cost: 4}])
    const node32 = new DijkstraGraphNode("32", [{node: node31, cost: 12}])
    const node21 = new DijkstraGraphNode("21", [{node: node31, cost: 5}])
    const node12 = new DijkstraGraphNode("12", [{node: node21, cost: 5}, {node: node32, cost: 8}])
    const node11 = new DijkstraGraphNode("11", [{node: node31, cost: 21}])
    const nodeStart = new DijkstraGraphNode("Start", [{node: node11, cost: 4}, {node: node12, cost: 10}])

    expect(getPathDijkstra(nodeStart, nodeEnd.id)).toBe(24)
  })

  it("example 4", () => {
    const nodeEnd = new DijkstraGraphNode("End", [])
    const node11 = new DijkstraGraphNode("11", [{node: nodeEnd, cost: 1}])
    const node12 = new DijkstraGraphNode("12", [{node: node11, cost: 3}, {node: nodeEnd, cost: 5}])
    const nodeStart = new DijkstraGraphNode("Start", [{node: node11, cost: 6}, {node: node12, cost: 2}])

    expect(getPathDijkstra(nodeStart, nodeEnd.id)).toBe(6)
  })

  it("example 5", () => {
    const nodeEnd = new DijkstraGraphNode("End", [])
    const node11 = new DijkstraGraphNode("11", [])
    const node12 = new DijkstraGraphNode("12", [{node: node11, cost: 4}, {node: nodeEnd, cost: 3}])
    const nodeStart = new DijkstraGraphNode("Start", [{node: node12, cost: 2}])
    node11.linkedWith.push({node: node12, cost: 4})

    expect(getPathDijkstra(nodeStart, nodeEnd.id)).toBe(5)
  })

  it("example 6", () => {
    const nodeEnd = new DijkstraGraphNode("End", [])
    const node22 = new DijkstraGraphNode("22", [{node: nodeEnd, cost: 10}])
    const node21 = new DijkstraGraphNode("21", [{node: nodeEnd, cost: 20}])
    const node12 = new DijkstraGraphNode("12", [{node: node21, cost: 30}, {node: node22, cost : 35}])
    const node11 = new DijkstraGraphNode("11", [{node: node21, cost: 15}, {node: node22, cost: 20}])
    const nodeStart = new DijkstraGraphNode("Start", [{node: node11, cost: 5}, {node: node12, cost: 0}])

    expect(getPathDijkstra(nodeStart, nodeEnd.id)).toBe(35)
  })

  it("example 7", () => {
    const nodeEnd = new DijkstraGraphNode("End", [])
    const node12 = new DijkstraGraphNode("12", [{node: nodeEnd, cost: 3}])
    const node11 = new DijkstraGraphNode("11", [{node: nodeEnd, cost: 3}, {node: node12, cost: 1}])
    const nodeStart = new DijkstraGraphNode("Start", [{node: node11, cost: 6}, {node: node12, cost: 2}])
    node12.linkedWith.push({node: node11, cost: 1})

    expect(getPathDijkstra(nodeStart, nodeEnd.id)).toBe(5)
  })
})