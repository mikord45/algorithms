import { randomUUID } from "crypto"

export class GraphNode {
  id: string
  name: string
  linkedWith: GraphNode[]
  isDestination: boolean

  constructor(name: string, linkedWith: GraphNode[] = [], isDestination = false){
    this.id = randomUUID()
    this.name = name
    this.linkedWith = linkedWith
    this.isDestination = isDestination
  }
}