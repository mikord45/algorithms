import { GraphNode } from "../common"

export class BFSGraphNode extends GraphNode {
  isDestination: boolean
  linkedWith: BFSGraphNode[]
  depth?: number
  
  constructor(name: string, linkedWith: BFSGraphNode[] = [], isDestination = false) {
    super(name)
    this.linkedWith = linkedWith
    this.isDestination = isDestination

  }

}

export const getPathBFS = (startingPoint: BFSGraphNode, lookingForName?: string) => {
  const nodesToVisit: BFSGraphNode[] = startingPoint.linkedWith.map((current) => {
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

export const isTreeBFS = (startingPoint: BFSGraphNode) => {
  const nodesToVisit: BFSGraphNode[] = startingPoint.linkedWith.map((current) => {
    return Object.assign({}, current)
  })
  const visitedNodesIds: Set<string> = new Set([startingPoint.id])

  while (nodesToVisit.length > 0){
    const currentElement = nodesToVisit.shift()

    if(visitedNodesIds.has(currentElement.id)){
      return false
    }
    visitedNodesIds.add(currentElement.id)

    nodesToVisit.push(...currentElement.linkedWith.map((current) => {
      return Object.assign({}, current)
    }))
  }

  return true
}

export const topologySortBFS = (startingPoint: BFSGraphNode) => {
  const nodesToVisit: BFSGraphNode[] = startingPoint.linkedWith.map((current) => {
    return Object.assign({}, current)
  })
  const visitedNodesIds: Set<string> = new Set([startingPoint.id])
  let sortedNodes: BFSGraphNode[] = [Object.assign({}, startingPoint)]

  while (nodesToVisit.length > 0){
    const currentElement = nodesToVisit.shift()

    if(visitedNodesIds.has(currentElement.id)){
      const {exists: cycleExists} = getPathBFS(new BFSGraphNode("Helper", [...currentElement.linkedWith]), currentElement.name)

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
