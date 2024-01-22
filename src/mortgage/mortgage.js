const { pmt, annualRateToMonthlyRate } = require("./math")
const { truncAsMoney } = require("./money")
const { calculateMaxInstallment } = require("./wage")

const calculateInstallment = (balance, monthlyInterestRate, numberOfMonths) =>
    truncAsMoney(pmt(monthlyInterestRate, numberOfMonths, -balance))

const calculateMonthlyInterest = (balance, monthlyInterestRate) =>
    truncAsMoney(balance * monthlyInterestRate)

class BillCalculator {
    constructor(installment, interestRate, extraExpenses){
        this.installment = installment
        this.interestRate = interestRate
        this.extraExpenses = extraExpenses
    }

    calculate(balance) {
        let interest, amortization, total
        if(balance > 0) {
            interest = calculateMonthlyInterest(balance, this.interestRate)
            amortization = this.installment - interest
            total = interest + amortization + this.extraExpenses
        } else {
            interest = 0
            amortization = 0
            total = 0
        }
        return {interest, amortization, total}
    }
}

const calculateMortgage = ({
    totalValue,
    fgts,
    extraExpenses,
    contribution,
    numberOfMonths,
    annualInterestRate,
    initialDate
}) => {
    const monthlyInterestRate = annualRateToMonthlyRate(annualInterestRate)
    const installment = calculateInstallment(totalValue, monthlyInterestRate, numberOfMonths)
    let balance = totalValue

    const report = new Array(numberOfMonths)
    const billCalculator = new BillCalculator(installment, monthlyInterestRate, extraExpenses)
    for (let i = 0; i < numberOfMonths; i++) {
        let installmentDate = initialDate
        installmentDate.setMonth(initialDate.getMonth() + i)
        fgts.deposit()
        const fgtsWithdrawal = fgts.withdraw(installmentDate, balance)
        const cashPayment = contribution.withdraw(installmentDate, balance)
        const bill = billCalculator.calculate(balance - fgtsWithdrawal - cashPayment)
        balance -= fgtsWithdrawal + cashPayment + bill.amortization
        

        report[i] = {
            installmentDate,
            fgtsWithdrawal,
            cashPayment,
            bill,
            balance
        }

        if(balance <= 0) break
    }
    return report.filter(n=>n!==undefined)
}


module.exports = {
    calculateInstallment,
    calculateMonthlyInterest
}
