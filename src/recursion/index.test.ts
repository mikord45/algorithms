import { getSumOfNaturalNumbersBelow } from "."

describe("Returns correct value", ()=>{
	it("n <= 1 work correctly", ()=>{
		expect(getSumOfNaturalNumbersBelow(1)).toBe(0)
		expect(getSumOfNaturalNumbersBelow(0)).toBe(0)
		expect(getSumOfNaturalNumbersBelow(-2)).toBe(0)
	})

	it("fractions work correctly", ()=>{
		expect(getSumOfNaturalNumbersBelow(1.5)).toBe(1)
		expect(getSumOfNaturalNumbersBelow(5.5)).toBe(15)
		expect(getSumOfNaturalNumbersBelow(5.05)).toBe(15)
		expect(getSumOfNaturalNumbersBelow(5.9)).toBe(15)
		expect(getSumOfNaturalNumbersBelow(5.95)).toBe(15)
	})

	it("standard cases work correctly", ()=>{
		expect(getSumOfNaturalNumbersBelow(6)).toBe(15)
		expect(getSumOfNaturalNumbersBelow(9)).toBe(36)
	})
})