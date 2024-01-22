const { calculateMaxInstallment, calculateFGTS } = require("../mortgage/wage")

describe("Calculate wage functions", () => {
    it("Calculate max installment from gross pay", () => {
        expect(calculateMaxInstallment(3000)).toEqual(900)
    })

    it("Calculate FGTS from gross pay", () => {
        const result = calculateFGTS(1600)
        expect(result).toEqual(128)
    })
})
