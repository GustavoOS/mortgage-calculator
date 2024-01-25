import { annualRateToMonthlyRate, pmt } from "./math"
import { truncAsMoney } from "./money"

export const calculateInstallment = (
    balance: number,
    monthlyInterestRate: number,
    numberOfMonths: number): number =>
    truncAsMoney(pmt(monthlyInterestRate, numberOfMonths, -balance))

export const calculateMonthlyInterest = (
    balance: number,
    monthlyInterestRate: number): number => truncAsMoney(balance * monthlyInterestRate)

export class Bill {
    public total: number

    constructor(
        public interest: number,
        public amortization: number,
        extraExpenses: number) {
        this.interest = interest
        this.amortization = amortization
        this.total = truncAsMoney(interest + amortization + extraExpenses)
    }
}

export interface MortgageTable {
    calculate(balance: number): Bill
}

export class PriceTable implements MortgageTable {
    interestRate: number
    installment: number
    extraExpenses: number

    constructor(totalValue: number, annualInterestRate:number, numberOfMonths: number, extraExpenses: number){
        this.interestRate = annualRateToMonthlyRate(annualInterestRate)
        this.installment = calculateInstallment(totalValue, this.interestRate, numberOfMonths)
        this.extraExpenses = extraExpenses
    }

    calculate(balance: number) {
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

export class SacTable implements MortgageTable{
    interestRate: number
    monthlyAmortization: number
    extraExpenses: number

    constructor(totalValue: number, annualInterestRate:number, numberOfMonths: number, extraExpenses: number) {
        this.interestRate = annualRateToMonthlyRate(annualInterestRate)
        this.monthlyAmortization = truncAsMoney(totalValue/numberOfMonths)
        this.extraExpenses = extraExpenses
    }

    calculate(balance: number) {
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
