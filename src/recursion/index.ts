type GetSumOfNaturalNumbersBelowFn = (n: number) => number

export const getSumOfNaturalNumbersBelow: GetSumOfNaturalNumbersBelowFn = (n) => {
	if (n <= 1) {
		return 0
	}

	const currentAddition = n % 1 === 0 ? 0 : Math.floor(n)
	const currentChange = currentAddition === 0 ? 0.1 : 1

	return currentAddition + getSumOfNaturalNumbersBelow(n - currentChange)
}