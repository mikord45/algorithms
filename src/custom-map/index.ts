import { createHash } from "crypto"

type TableElement = {
    key: string
    value: unknown
}

export class CustomMap {
  table: Array<TableElement | Array<TableElement>>
  numberOfElementsInTable: number

  constructor(customArraySize = 100) {
    this.table = new Array(customArraySize)
    this.numberOfElementsInTable = 0
  }

  getHash(text: string) {
    return createHash("sha256").update(text).digest("hex")
  }

  getIndex(hash: string){
    const bigIntNumber = BigInt("0x" + hash)
    return Number(bigIntNumber % BigInt(this.table.length))
  }

  get(key: string) {
    const hash = this.getHash(key)
    const index = this.getIndex(hash)

    if(!this.table[index]){
      return
    }

    if(!Array.isArray(this.table[index])){
      return (this.table[index] as TableElement).key === key ? this.table[index] : undefined
    }

    return (this.table[index] as TableElement[]).find((element) => element.key === key)
  }

  add(key: string, value: unknown) {
    if(this.get(key) !== undefined){
      return
    }

    const hash = this.getHash(key)
    const index = this.getIndex(hash)

    if(this.table[index] !== undefined) {
      if(Array.isArray(this.table[index])){
        (this.table[index] as TableElement[]).push({key, value})
      }
      else{
        const previousElement: TableElement = {...this.table[index] as TableElement}
        this.table[index] = [previousElement, {key, value}]
      }
    } else {
      this.table[index] = { key, value}
    }

    this.numberOfElementsInTable += 1
    
    if(this.isTooCrowded()){
      this.reshape()
    }
  }

  delete(key: string) {
    const hash = this.getHash(key)
    const index = this.getIndex(hash)

    if(!Array.isArray(this.table[index])){
      this.table[index] = undefined
    }
    else if((this.table[index] as TableElement[]).length === 2) {
      this.table[index] = (this.table[index] as TableElement[]).find((element) => element.key !== key)
    }
    else{
      this.table[index] = (this.table[index] as TableElement[]).filter((element) => element.key !== key)
    }

    this.numberOfElementsInTable -= 1
  }

  isTooCrowded() {
    return 0.7 * this.table.length < this.numberOfElementsInTable
  }

  reshape() {
    this.numberOfElementsInTable = 0
    const elements = [...this.table]
    this.table = new Array(2 * this.table.length)

    elements.forEach((currentElement)=>{
      if(currentElement){
        if(!Array.isArray(currentElement)){
          this.add(currentElement.key, currentElement.value)
        }
        else{
          const allCurrentElements = [...currentElement]
          allCurrentElements.forEach((elem) => {
            this.add(elem.key, elem.value)
          })
        }
      }

    })
  }
}