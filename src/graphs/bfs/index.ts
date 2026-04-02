import { randomUUID } from "crypto"

// name as ids should be unique (for now)
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

export const getPathBFS = (startingPoint: GraphNode, lookingForName?: string) => {
  const nodesToVisit: GraphNode[] = startingPoint.linkedWith.map((current) => {
    return Object.assign({depth: 1}, current)
  })
  const visitedNodesIds: Set<string> = new Set([startingPoint.id])

  while (nodesToVisit.length > 0){
    const currentElement = nodesToVisit.shift()

    if(visitedNodesIds.has(currentElement.id)){
      continue
    }
    visitedNodesIds.add(currentElement.id)

    if((!lookingForName && currentElement.isDestination) || (currentElement.name === lookingForName)){
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

export const topologySortBFS = (startingPoint: GraphNode) => {
  const nodesToVisit: GraphNode[] = startingPoint.linkedWith.map((current) => {
    return Object.assign({}, current)
  })
  const visitedNodesIds: Set<string> = new Set([startingPoint.id])
  let sortedNodes: GraphNode[] = [Object.assign({}, startingPoint)]

  while (nodesToVisit.length > 0){
    const currentElement = nodesToVisit.shift()

    if(visitedNodesIds.has(currentElement.id)){
      const {exists: cycleExists} = getPathBFS(new GraphNode("Helper", [...currentElement.linkedWith]), currentElement.name)

      if(cycleExists){
        throw new Error("Graph has cycles")
      }
      const newSortedNodes = topologySortBFS(currentElement)
      const newSortedNodesIds = newSortedNodes.map((current) => current.id)
      newSortedNodesIds.forEach((id) => visitedNodesIds.delete(id))
      sortedNodes = sortedNodes.filter((current) => !newSortedNodesIds.includes(current.id))
    }

    visitedNodesIds.add(currentElement.id)
    sortedNodes.push(Object.assign({}, currentElement) )

    nodesToVisit.push(...currentElement.linkedWith.map((current) => {
      return Object.assign({}, current)
    }))
  }

  return sortedNodes
}
