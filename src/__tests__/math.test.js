const {
    pmt,
    annualRateToMonthlyRate,
    parsePercentage
} = require("../core/math");


describe("Test the math", () => {
    it("PMT test", () => {
        const rate = (4 / 100) / 12; // 4% rate 
        const nper = 30 * 12; //30 years in months
        const pv = -400000 * (1 - (3.5 / 100)); //3.5%
        const result = pmt(rate, nper, pv)
        expect(result).toBeCloseTo(1842.82)
    })

    it("Test annual to month rate", () => {
        const annual = 0.0999
        const result = annualRateToMonthlyRate(annual)
        expect(result).toBeCloseTo(0.00796, 4)
    })

    it("Test percentage", () => {
        const result = parsePercentage(9.99)
        expect(result).toEqual(0.0999)
    })
})
