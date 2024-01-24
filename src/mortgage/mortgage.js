const { pmt, annualRateToMonthlyRate } = require("./math")
const { truncAsMoney } = require("./money")

const calculateInstallment = (balance, monthlyInterestRate, numberOfMonths) =>
    truncAsMoney(pmt(monthlyInterestRate, numberOfMonths, -balance))

const calculateMonthlyInterest = (balance, monthlyInterestRate) =>
    truncAsMoney(balance * monthlyInterestRate)

class Bill {
    constructor(interest, amortization, extraExpenses) {
        this.interest = interest
        this.amortization = amortization
        this.total = interest + amortization + extraExpenses
    }
}

class PriceTable {
    constructor(totalValue, annualInterestRate, numberOfMonths, extraExpenses){
        this.interestRate = annualRateToMonthlyRate(annualInterestRate)
        this.installment = calculateInstallment(totalValue, this.interestRate, numberOfMonths)
        this.extraExpenses = extraExpenses
    }

    calculate(balance) {
        if(balance > 0) {
            const interest = calculateMonthlyInterest(balance, this.interestRate)
            return new Bill(
                interest,
                truncAsMoney(this.installment - interest),
                this.extraExpenses
            )
        }
        return new Bill(0,0, 0)
    }
}

class SacTable {
    constructor(totalValue, annualInterestRate, numberOfMonths, extraExpenses) {
        this.interestRate = annualRateToMonthlyRate(annualInterestRate)
        this.monthlyAmortization = truncAsMoney(totalValue/numberOfMonths)
        this.extraExpenses = extraExpenses
    }

    calculate(balance) {
        if(balance > 0) {
            return new Bill(
                calculateMonthlyInterest(balance, this.interestRate),
                Math.min(this.monthlyAmortization, balance),
                this.extraExpenses
            )
        }
        return new Bill(0,0,0)
    }
}


module.exports = {
    calculateInstallment,
    calculateMonthlyInterest,
    PriceTable,
    SacTable
}
