import { PriceTable, SacTable } from "@/core/mortgage"
import { CalculatePaymentRequest, MortgageType } from "./port/in"
import { calculatePayments, validateCompatiblePayment, calculateDebt } from "@/core/payment"
import { Entrepreneur, FGTS, Wallet } from "@/core/wage"
import { getFirstDayOfNextMonth } from "@/core/math"
import { PaymentDTO } from "./port/out"

const mortageCalculatorService = ({
    value,
    mortgageType,
    annualInterestRate,
    numberOfMonths,
    extraExpenses,
    grossPay,
    hasFGTS,
    initialFunds,
    monthlyPayments,
    annualPayments,
    downPayment
}: CalculatePaymentRequest) => {
    const debt = calculateDebt(value, downPayment)
    const MortgageTable = mortgageType === MortgageType.SAC ? SacTable : PriceTable
    const mortgageTable = new MortgageTable(debt, annualInterestRate, numberOfMonths, extraExpenses)
    validateCompatiblePayment(debt, grossPay, mortgageTable)
    const savingsAccount = hasFGTS? new FGTS(grossPay, initialFunds) : new Entrepreneur()
    const wallet = new Wallet(monthlyPayments, annualPayments)
    const initialDate = getFirstDayOfNextMonth()
    const payments = calculatePayments(
        {
            totalValue: debt,
            savingsAccount,
            mortgageTable,
            numberOfMonths,
            contribution: wallet,
            initialDate
        }
    )
    return new PaymentDTO(payments)
}
