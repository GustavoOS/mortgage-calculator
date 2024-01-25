export const truncAsMoney = (value: number): number => parseFloat(value.toFixed(2))

export const subtractMoney = (value: number, toBeSubtracted: number): number =>
    Math.max(0, truncAsMoney(value - toBeSubtracted))

const BrazilianReal = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
})

export const formatMoneyString = (value: number): string => {
    const formated = BrazilianReal.format(value)
    return formated.replace(/\s/g,' ')
}
