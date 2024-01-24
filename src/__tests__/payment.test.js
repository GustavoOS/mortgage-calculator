const { SacTable, PriceTable } = require("../mortgage/mortgage")
const { Entrepreneur, Wallet, FGTS } = require("../mortgage/wage")
const { calculatePayments } = require("../mortgage/payment")

describe("Test payment calculations", () => {
    const ent = new Entrepreneur()
    const sac = new SacTable(300, 4095, 3, 10)
    const price = new PriceTable(300, 4095, 3, 10)
    const date = new Date("2023-12-02")

    it("Test no amortization payment enterprise no contribution sac", ()=> {
        const wallet = new Wallet(0, 0)
        const payments = calculatePayments({
            totalValue: 300,
            savingsAccount: ent,
            numberOfMonths: 3,
            contribution: wallet,
            initialDate: date,
            mortgageTable: sac
        })
        expect(payments.length).toEqual(3)
        payments.forEach(payment => {
            expect(payment.savingsWithdrawal).toEqual(0)
            expect(payment.cashPayment).toEqual(0)
        })
        const [first, second, third] = payments
        expect(first.balance).toEqual(200)
        expect(second.balance).toEqual(100)
        expect(third.balance).toEqual(0)
        expect(first.bill.total).toEqual(410)
        expect(second.bill.total).toEqual(310)
        expect(third.bill.total).toEqual(210)
    })

    it("Test amortized payment with fgts contribution price", () => {
        const fgts = new FGTS(125, 0)
        const wallet = new Wallet(31.42, 28.58)
        const payments = calculatePayments({
            totalValue: 300,
            savingsAccount: fgts,
            numberOfMonths: 3,
            contribution: wallet,
            initialDate: date,
            mortgageTable: price
        })
        const [first, second] = payments
        expect(payments.length).toEqual(2)
        expect(first.cashPayment).toEqual(60)
        expect(second.cashPayment).toEqual(31.42)
        expect(second.savingsWithdrawal).toEqual(0)
        expect(first.savingsWithdrawal).toEqual(10)
        expect(first.bill.amortization).toEqual(42.86)
        expect(first.balance).toEqual(187.14)
        expect(second.balance).toEqual(0)
        expect(first.bill.total).toEqual(352.86)
        expect(second.bill.total).toEqual(352.86)
    })
})
