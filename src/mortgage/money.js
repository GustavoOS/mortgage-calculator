const truncAsMoney = (value) => parseFloat(value.toFixed(2))

const subtractMoney = (value, toBeSubtracted) => Math.max(0, truncAsMoney(value - toBeSubtracted))

module.exports = {
    truncAsMoney,
    subtractMoney
}
