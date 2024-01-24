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
        const upperLimit = truncAsMoney(this.funds + (24 * this.monthlyPayments))
        return (amount > this.funds) && (amount < upperLimit)
    }

    withdraw(date, amount) {
        if (this.canWithdraw(date) && !this.shouldHoldForLiquidation(amount)) {
            this.lastWithdrawDate = date
            const decrease = Math.min(this.funds, amount)
            this.funds = truncAsMoney(this.funds - decrease)
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

    withdraw(date, amount) {
        let cash = this.monthlyContribution
        if (date.getMonth() === 11)
            cash += this.annualContribution
        return truncAsMoney(Math.min(amount, cash))
    }
}

module.exports = {
    calculateMaxInstallment,
    calculateFGTS,
    FGTS,
    Wallet,
    Entrepreneur
}
