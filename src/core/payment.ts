import { subtractMoney } from "./money"
import { Bill, MortgageTable } from "./mortgage"
import { calculateMaxInstallment, SavingsAccount, Wallet } from "./wage"


export class Payment {
    constructor(public installmentDate: Date,
        public savingsWithdrawal: number,
        public cashPayment: number,
        public bill: Bill,
        public balance: number) { }
}

interface PaymentCalculusOptions {
    totalValue: number,
    savingsAccount: SavingsAccount,
    mortgageTable: MortgageTable,
    numberOfMonths: number,
    contribution: Wallet,
    initialDate: Date
}

export const calculatePayments = ({
    totalValue,
    savingsAccount,
    mortgageTable,
    numberOfMonths,
    contribution,
    initialDate
}: PaymentCalculusOptions) => {
    let balance = totalValue

    const report = new Array(numberOfMonths)
    for (let i = 0; i < numberOfMonths; i++) {
        const installmentDate = new Date(initialDate.getTime());
        installmentDate.setMonth(initialDate.getMonth() + i)
        savingsAccount.deposit()
        const bill = mortgageTable.calculate(balance)
        balance = subtractMoney(balance, bill.amortization)
        const savingsWithdrawal = savingsAccount.withdraw(installmentDate, balance)
        const cashPayment = contribution.withdraw(installmentDate,
            subtractMoney(balance, savingsWithdrawal))
        const decrease = savingsWithdrawal + cashPayment
        balance = subtractMoney(balance, decrease)

        report[i] = new Payment(
            installmentDate,
            savingsWithdrawal,
            cashPayment,
            bill,
            balance
        )

        if (balance <= 0) break
    }
    return report.filter(n => n !== undefined)
}

export const validateCompatiblePayment = (balance: number, grossPay: number, mortgageTable: MortgageTable) => {
    const { total: installment } = mortgageTable.calculate(balance)
    const maxInstallment = calculateMaxInstallment(grossPay)
    if (installment > maxInstallment) {
        throw new Error(
            `Parcela supera o valor de ${maxInstallment.toLocaleString('pt-BR')}.`
        )
    }
}
