const { PaymentDTO } = require("../../service/port/out")
const { Bill } = require("../../core/mortgage")
const { Payment } = require("../../core/payment")

describe("Test PaymentDTO", () => {
    const payments = [
        new Payment(new Date("2023-01-24T00:00:00"), 32, 27, new Bill(1, 2, 3), 7),
        new Payment(new Date("2023-02-24T00:00:00"), 15, 9, new Bill(4, 5, 6), 8)
    ]

    it("Payments should match input", () => {        
        const dto = new PaymentDTO(payments)
        expect(dto.payments.length).toEqual(2)
        const [first, second] = dto.payments
        assertPayment(first, new Date("2023-01-24T00:00:00"), 32, 27, 6, 1, 2, 7)
        assertPayment(second, new Date("2023-02-24T00:00:00"), 15, 9, 15, 4, 5, 8)
    })

    it("Test CSV generation", () => {
        const dto = new PaymentDTO(payments)
        const {body} = dto.asCSV()
        const [first, second] = body.split("\n")
        expect(first).toEqual("24/01/2023,32,27,6,1,2,7")
        expect(second).toEqual("24/02/2023,15,9,15,4,5,8")
    })
})


function assertPayment(payment, date, sw, cp, inst, inter, am, ba) {
    expect(payment.installmentDate).toEqual(date)
    expect(payment.savingsWithdrawal).toEqual(sw)
    expect(payment.cashPayment).toEqual(cp)
    expect(payment.interest).toEqual(inter)
    expect(payment.installment).toEqual(inst)
    expect(payment.amortization).toEqual(am)
    expect(payment.balance).toEqual(ba)
}

