import { GraphNode } from "../common"

type DijkstraLink = {node: DijkstraGraphNode, cost: number}

export class DijkstraGraphNode extends GraphNode {
  linkedWith: DijkstraLink[]
  processed: boolean
  
  constructor(name: string, linkedWith: DijkstraLink[] = []) {
    super(name)
    this.linkedWith = linkedWith
    this.processed = false
  }
}

export const getPathDijkstra = (start: DijkstraGraphNode, goalId?: string) => {
  const results = new Map(start.linkedWith.map(({node: {id: id}, cost}) => ([id, {parentId: start.id, parentName: start.name, totalCost: cost}])))
  const nodes = start.linkedWith.map(({node}) => {
    return Object.assign({}, node)
  })
  let processedNodesNumber = 0

  const getTheLowestCostNode = () => {
    let lowestCostNode: DijkstraGraphNode
    let lowestCostNodeCost: number

    nodes.forEach((current)=>{
      if(!current.processed){
        const currentTotalCost = results.get(current.id).totalCost
        if(!lowestCostNode || currentTotalCost < lowestCostNodeCost) {
          lowestCostNode = current
          lowestCostNodeCost = currentTotalCost
        }
      }
    })

    return lowestCostNode
  }

  while(nodes.length > processedNodesNumber) {
    const lowestCostNode = getTheLowestCostNode()

    lowestCostNode.linkedWith.forEach(({node, cost}) => {
      const currentLinkedNode = results.get(node.id)
      if(currentLinkedNode){
        const newTotalCost = results.get(lowestCostNode.id).totalCost + cost
        if(newTotalCost < currentLinkedNode.totalCost){
          results.set(node.id, {parentId: lowestCostNode.id, parentName: lowestCostNode.name, totalCost: newTotalCost})
        }
      }
      else{
        nodes.push(Object.assign({}, node))
        results.set(node.id, {parentId: lowestCostNode.id, parentName: lowestCostNode.name, totalCost: results.get(lowestCostNode.id).totalCost + cost})
      }
    })

    lowestCostNode.processed = true
    processedNodesNumber += 1
  }

  return results.get(goalId).totalCost
}