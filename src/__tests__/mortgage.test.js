const { calculateInstallment, calculateMonthlyInterest,
    SacTable, PriceTable, Bill } = require("../mortgage/mortgage")
const { annualRateToMonthlyRate } = require("../mortgage/math")

describe("Test mortgage math", () => {
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

describe("Test SAC Table in 3 payments", () => {
    it("Test first payment", () => {
        const sac = new SacTable(300, 4095, 3, 10)
        const result = sac.calculate(300)
        expect(result.amortization).toEqual(100)
        expect(result.interest).toEqual(300)
        expect(result.total).toEqual(410)
    })

    it("Test second payment", () => {
        const sac = new SacTable(300, 4095, 3, 10)
        const result = sac.calculate(200)
        expect(result.amortization).toEqual(100)
        expect(result.interest).toEqual(200)
        expect(result.total).toEqual(310)
    })

    it("Test third payment", () => {
        const sac = new SacTable(300, 4095, 3, 10)
        const result = sac.calculate(100)
        expect(result.amortization).toEqual(100)
        expect(result.interest).toEqual(100)
        expect(result.total).toEqual(210)
    })

    it("Test fourth payment", () => {
        const sac = new SacTable(300, 4095, 3, 10)
        const result = sac.calculate(0)
        expect(result.amortization).toEqual(0)
        expect(result.interest).toEqual(0)
        expect(result.total).toEqual(0)
    })
})

describe("Test Price Table in 3 payments", () => {
    it("Test installment calculus", () => {
        const price = new PriceTable(300, 4095, 3, 10)
        expect(price.interestRate).toBeCloseTo(1)
        expect(price.installment).toBeCloseTo(342.86)
    })

    it("Test first payment", () => {
        const price = new PriceTable(300, 4095, 3, 10)
        const result = price.calculate(300)
        expect(result.amortization).toEqual(42.86)
        expect(result.interest).toEqual(300)
        expect(result.total).toEqual(352.86)
    })

    it("Test second payment", () => {
        const price = new PriceTable(300, 4095, 3, 10)
        const result = price.calculate(257.14)
        expect(result.amortization).toEqual(85.72)
        expect(result.interest).toEqual(257.14)
        expect(result.total).toEqual(352.86)
    })

    it("Test third payment", () => {
        const price = new PriceTable(300, 4095, 3, 10)
        const result = price.calculate(171.43)
        expect(result.amortization).toEqual(171.43)
        expect(result.interest).toEqual(171.43)
        expect(result.total).toEqual(352.86)
    })

    it("Test fourth payment", () => {
        const price = new PriceTable(300, 4095, 3, 10)
        const result = price.calculate(0)
        expect(result.amortization).toEqual(0)
        expect(result.interest).toEqual(0)
        expect(result.total).toEqual(0)
    })
})


describe("Test Bill", () => {
    it("Test total value should be a money value", () => {
        const bill = new Bill(11.32, 1.18, 1 / 3)
        expect(bill.total).toEqual(12.83)
    })
    it("0 amortization interest and expenses equals 0 total", () => {
        const bill = new Bill(0,0,0)
        expect(bill.total).toEqual(0)
    })

    it("Test components", () => {
        const bill = new Bill(10, 20, 30)
        expect(bill.interest).toEqual(10)
        expect(bill.amortization).toEqual(20)
        expect(bill.total).toEqual(60)
    })
})
