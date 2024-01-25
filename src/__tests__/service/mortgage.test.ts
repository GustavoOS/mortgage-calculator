import { calculateMortgage } from "@/service/mortgage"
import { CalculatePaymentRequest, MortgageType } from "@/service/port/in"

describe("Test service", () => {
    let request: CalculatePaymentRequest

    beforeEach(()=>{
        request = {
            grossPay: 10000,
            annualInterestRate: 0,
            hasFGTS: false,
            monthlyPayments: 0,
            annualPayments: 0,
            mortgageType: MortgageType.PRICE,
            value: 10000,
            downPayment: 2000,
            numberOfMonths: 10,
            extraExpenses: 0,
            initialFunds: 0
        }
    })

    it("Test valid price no interest no fgts no cash", () => {
        const mortgage = calculateMortgage(request)
        expect(mortgage.payments.length).toEqual(10)
        expect(mortgage.payments.every(
            payment => payment.installment === 800)).toBeTruthy()
    })

    it("Test downPayment too low", () => {
        request.downPayment = 0
        expect(()=>calculateMortgage(request)).toThrow()
    })

    it("Gross pay too low", () => {
        request.grossPay = 1000
        expect(()=>calculateMortgage(request)).toThrow()
    })
})
