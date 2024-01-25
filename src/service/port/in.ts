export enum MortgageType {
    SAC,
    PRICE
}

export interface CalculatePaymentRequest {
    grossPay: number
    value: number
    hasFGTS: boolean
    monthlyPayments: number
    annualPayments: number
    mortgageType: MortgageType,
    annualInterestRate: number,
    numberOfMonths: number,
    extraExpenses: number,
    initialFunds: number,
    downPayment: number
}
