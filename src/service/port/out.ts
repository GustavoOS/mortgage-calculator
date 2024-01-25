import { Payment } from "@/core/payment"

export interface PaymentReportDTO {
    installmentDate: Date
    savingsWithdrawal: number
    cashPayment: number
    installment: number
    interest: number
    amortization: number
    balance: number
}

export class PaymentDTO {
    payments: PaymentReportDTO[]

    constructor(payments: Payment[]) {
        this.payments = payments.map((payment) => {
            const {
                installmentDate,
                savingsWithdrawal,
                cashPayment,
                bill,
                balance
            } = payment
            return {
                installmentDate,
                savingsWithdrawal,
                cashPayment,
                installment: bill.total,
                interest: bill.interest,
                amortization: bill.amortization,
                balance
            }
        })
    }

    asCSV() {
        return {
            header: "Data,Saque FGTS,Pagamento em dinheiro,Prestação,Juros,Amortização,Saldo devedor\n",
            body: this.payments.reduce((a, p) => {
                const date = p.installmentDate.toLocaleDateString('pt-BR')
                return `${a}${date},${p.savingsWithdrawal},${p.cashPayment},${p.installment},` +
                    `${p.interest},${p.amortization},${p.balance}\n`
            }, "")
        }
    }
}


module.exports = {
    PaymentDTO
}
