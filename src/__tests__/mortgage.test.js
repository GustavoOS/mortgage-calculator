const { calculateInstallment, calculateMonthlyInterest } = require("../mortgage/mortgage")
const { annualRateToMonthlyRate } = require("../mortgage/math")

describe("Test mortgage", () => {
    it("Calculate installment", () => {
        const value = 180000
        const interest = annualRateToMonthlyRate(0.0999)
        const numberOfMonths = 360
        const result = calculateInstallment(value, interest, numberOfMonths)
        expect(result).toEqual(1521.4)
    })

    it("Calculate monthly interest", () => {
        const result = calculateMonthlyInterest(180000, annualRateToMonthlyRate(0.0999))
        expect(result).toEqual(1433.97)
    })
})
