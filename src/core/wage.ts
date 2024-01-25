import { truncAsMoney } from "./money"

export const calculateMaxInstallment = (grossPay: number) => truncAsMoney(grossPay * 0.3)

export const calculateFGTS = (grossPay: number) => truncAsMoney(grossPay * 0.08)

function monthDiff(dateFrom: Date, dateTo: Date) {
    return dateTo.getMonth() - dateFrom.getMonth() +
        (12 * (dateTo.getFullYear() - dateFrom.getFullYear()))
}

export interface SavingsAccount {
    deposit():void
    withdraw(date: Date, amount: number): number
}

export class FGTS implements SavingsAccount{
    funds: number
    monthlyPayments: number
    lastWithdrawDate: Date | null = null

    constructor(grossPay: number, initialFunds: number) {
        this.funds = initialFunds
        this.monthlyPayments = calculateFGTS(grossPay)
    }

    canWithdraw(date: Date) {
        return this.lastWithdrawDate == undefined
            || monthDiff(this.lastWithdrawDate, date) >= 24
    }

    shouldHoldForLiquidation(amount: number) {
        const upperLimit = truncAsMoney(this.funds + (24 * this.monthlyPayments))
        return (amount > this.funds) && (amount < upperLimit)
    }

    withdraw(date: Date, amount: number): number {
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

export class Entrepreneur implements SavingsAccount {
    deposit() { }
    withdraw(_date: Date, _amount: number):number { return 0 }
}

export class Wallet {
    constructor(private monthlyContribution: number, private annualContribution: number) {}

    withdraw(date: Date, amount: number): number {
        let cash = this.monthlyContribution
        if (date.getMonth() === 11)
            cash += this.annualContribution
        return truncAsMoney(Math.min(amount, cash))
    }
}
