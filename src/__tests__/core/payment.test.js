const { SacTable, PriceTable } = require("../../core/mortgage")
const { Entrepreneur, Wallet, FGTS } = require("../../core/wage")
const { calculatePayments, validateCompatiblePayment } = require("../../core/payment")

describe("Test payment calculations", () => {
    const ent = new Entrepreneur()
    const sac = new SacTable(300, 4095, 3, 10)
    const price = new PriceTable(300, 4095, 3, 10)
    const date = new Date("2023-12-02")

    it("Test no amortization payment enterprise no contribution sac", () => {
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

describe("Test payment validation", () => {
    const sac = new SacTable(3000, 4095, 3, 10)
    const price = new PriceTable(300, 4095, 3, 10)


    it("Invalid gross pay should throw for sac", () => {
        expect(() => validateCompatiblePayment(3000, 100, sac)).toThrow(
            "Parcela supera o valor de 30.")
    })

    it("Invalid gross pay should throw for price", () => {
        expect(() => validateCompatiblePayment(300, 10, price)).toThrow(
            "Parcela supera o valor de 3."
        )
    })

    it("Valid gross pay should not throw for sac", () => {
        expect(() => validateCompatiblePayment(3000, 1000000, sac))
    })

    it("Valid gross pay should not throw for price", () => {
        expect(() => validateCompatiblePayment(300, 1000000, price))
    })
})
