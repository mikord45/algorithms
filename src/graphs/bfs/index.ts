import { randomUUID } from "crypto"

export class GraphNode {
  id: string
  name: string
  linkedWith: GraphNode[]
  isDestination: boolean
  depth?: number

  constructor(name: string, linkedWith: GraphNode[] = [], isDestination = false){
    this.id = randomUUID()
    this.name = name
    this.linkedWith = linkedWith
    this.isDestination = isDestination
  }
}

export const getPathBFS = (startingPoint: GraphNode) => {
  const nodesToVisit: GraphNode[] = startingPoint.linkedWith.map((current) => {
    return Object.assign({depth: 1}, current)
  })
  const visitedNodesIds: Set<string> = new Set([])

  while (nodesToVisit.length > 0){
    const currentElement = nodesToVisit.shift()

    if(visitedNodesIds.has(currentElement.id)){
      continue
    }
    visitedNodesIds.add(currentElement.id)

    if(currentElement.isDestination){
      return {
        exists: true,
        pathLength: currentElement.depth
      }
    }
    nodesToVisit.push(...currentElement.linkedWith.map((current) => {
      return Object.assign({depth: currentElement.depth + 1}, current)
    }))
  }

  return {
    exists: false,
  }
}