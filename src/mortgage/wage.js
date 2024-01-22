const { truncAsMoney } = require("./money")

const calculateMaxInstallment = (grossPay) => truncAsMoney(grossPay * 0.3)

const calculateFGTS = (grossPay) => truncAsMoney(grossPay * 0.08)

function monthDiff(dateFrom, dateTo) {
    return dateTo.getMonth() - dateFrom.getMonth() +
        (12 * (dateTo.getFullYear() - dateFrom.getFullYear()))
}

class FGTS {
    constructor(grossPay, initialFunds) {
        this.funds = initialFunds
        this.monthlyPayments = calculateFGTS(grossPay)
    }

    canWithdraw(date) {
        return this.lastWithdrawDate == undefined
            || monthDiff(this.lastWithdrawDate, date) >= 24
    }

    shouldHoldForLiquidation(amount) {
        return (amount > this.funds) &&
            amount < this.funds + (24 * this.monthlyPayments)
    }

    withdraw(date, amount) {
        if (this.canWithdraw(date) && !this.shouldHoldForLiquidation(amount)) {
            this.lastWithdrawDate = date
            const decrease = Math.min(this.funds, amount)
            this.funds -= decrease
            return decrease
        }
        return 0
    }

    deposit() {
        this.funds += this.monthlyPayments
    }
}

class Entrepreneur {
    deposit() { }
    withdraw(date, amount) { return 0 }
}

class Wallet {
    constructor(monthlyContribution, annualContribution) {
        this.monthlyContribution = monthlyContribution
        this.annualContribution = annualContribution
    }

    withDrawal(date, amount) {
        let cash = this.monthlyContribution
        if (date.getMonth() === 11)
            cash += this.annualContribution
        return Math.min(amount, cash)
    }
}

module.exports = {
    calculateMaxInstallment,
    calculateFGTS,
    FGTS,
    Wallet,
    Entrepreneur
}
