const { truncAsMoney } = require("../core/money")
const { calculateMaxInstallment, calculateFGTS, FGTS, Entrepreneur, Wallet } = require("../core/wage")

describe("Calculate wage functions", () => {
    it("Calculate max installment from gross pay", () => {
        expect(calculateMaxInstallment(3000)).toEqual(900)
    })

    it("Calculate FGTS from gross pay", () => {
        const result = calculateFGTS(1600)
        expect(result).toEqual(128)
    })
})

describe("Test FGTS savings account", () => {
    it("Deposit with 0 funds should add right value", () => {
        const fgts = new FGTS(125, 0)
        fgts.deposit()
        expect(fgts.funds).toEqual(10)
    })

    it("Deposit with funds should add right value", () => {
        const fgts = new FGTS(125, 50)
        fgts.deposit()
        expect(fgts.funds).toEqual(60)
    })

    it("First withdrawal", () => {
        const initialDate = new Date("2022-01-25")
        const fgts = new FGTS(125, 0)
        fgts.deposit()
        const value = fgts.withdraw(initialDate, 3000)
        expect(value).toEqual(10)
        expect(fgts.funds).toEqual(0)
        expect(fgts.lastWithdrawDate).toEqual(initialDate)
    })

    it("One month after first withdrawal, then second withdrawal should not be allowed", () => {
        const initialDate = new Date("2022-01-01")
        const fgts = new FGTS(125, 0)
        fgts.deposit()
        fgts.withdraw(initialDate, 3000)
        const secondDate = new Date("2022-02-01")
        const value = fgts.withdraw(secondDate, 3000)
        expect(value).toEqual(0)
    })

    it("After two years, withdrawal is alllowed", () => {
        const initialDate = new Date("2022-01-01")
        const fgts = new FGTS(1250, 100)
        fgts.withdraw(initialDate, 3000)
        fgts.deposit()
        const result = fgts.withdraw(new Date("2024-01-01"), 3000)
        expect(result).toEqual(100)
    })

    it("When mortgages are ending then withdrawals should be hold for liquidation", () => {
        const initialDate = new Date("2022-01-01")
        const fgts = new FGTS(125, 100)
        expect(fgts.withdraw(initialDate, 3000)).toEqual(100)
        fgts.deposit()
        expect(truncAsMoney(fgts.funds + (24 * fgts.monthlyPayments))).toEqual(250)
        const result = fgts.withdraw(new Date("2024-01-01"), 100)
        expect(result).toEqual(0)
    })

    it("After holding for liquidation, liquidate", () => {
        const initialDate = new Date("2022-01-01")
        const fgts = new FGTS(125, 100)
        expect(fgts.withdraw(initialDate, 110)).toEqual(0)
        fgts.deposit()
        expect(fgts.withdraw(initialDate, 110)).toEqual(110)
    })
})

describe("Test Entrepreneur savings account", () => {
    it("deposit should not throw", ()=>{
        const ent = new Entrepreneur()
        expect(ent.deposit).not.toThrow()
    })

    it("withdraw should always return 0", ()=>{
        const ent = new Entrepreneur()
        expect(ent.withdraw(new Date(), 10)).toEqual(0)
    })
})

describe("Test Wallet contributions", () => {
    it("Contribute with a monthly fee", ()=>{
        const wallet = new Wallet(2,3)
        expect(wallet.withdraw(new Date("2023-01-22"), 15)).toEqual(2)
    })

    it("Contribute both fees", ()=>{
        const wallet = new Wallet(2,3)
        expect(wallet.withdraw(new Date("2023-12-22"), 15)).toEqual(5)
    })

    it("Contribute less then monthly", () => {
        const wallet = new Wallet(2, 3)
        expect(wallet.withdraw(new Date("2023-01-22"), 1.5)).toEqual(1.5)
    })

    it("Contribute less then sum", () => {
        const wallet = new Wallet(2, 3)
        expect(wallet.withdraw(new Date("2023-12-22"), 4.5)).toEqual(4.5)
    })
})
