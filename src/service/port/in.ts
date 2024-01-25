export enum MortgageType {
    SAC,
    PRICE
}

export interface CalculatePaymentRequest {
    grossPay: number
    value: number
    hasFGTS: string
    monthlyPayments: number
    annualPayments: number
    mortgageType: MortgageType
}
