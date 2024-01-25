export const truncAsMoney = (value: number): number => parseFloat(value.toFixed(2))

export const subtractMoney = (value: number, toBeSubtracted: number): number =>
    Math.max(0, truncAsMoney(value - toBeSubtracted))
