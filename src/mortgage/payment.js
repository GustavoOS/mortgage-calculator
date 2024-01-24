const { truncAsMoney, subtractMoney } = require("./money")

class Payment {
    constructor(installmentDate, savingsWithdrawal, cashPayment, bill, balance) {
        this.installmentDate = installmentDate
        this.savingsWithdrawal = savingsWithdrawal
        this.cashPayment = cashPayment
        this.bill = bill
        this.balance = balance
    }
}

const calculatePayments = ({
    totalValue,
    savingsAccount,
    mortgageTable,
    numberOfMonths,
    contribution,
    initialDate
}) => {
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

module.exports = {
    Payment,
    calculatePayments
}
