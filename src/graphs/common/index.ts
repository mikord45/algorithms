import { randomUUID } from "crypto"

export class GraphNode {
  id: string
  name: string
  
  constructor(name: string){
    this.id = randomUUID()
    this.name = name
  }
}