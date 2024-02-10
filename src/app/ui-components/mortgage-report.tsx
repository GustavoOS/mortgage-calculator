import { BrazilianReal } from "@/core/money"
import { PaymentDTO } from "@/service/port/out"
import React from "react"

interface MortgageReportI {
    report: PaymentDTO | null
}

const asMoney = (a: number) => BrazilianReal.format(a)

export const MortgageReport: React.FC<MortgageReportI> = ({ report }) => {
    const payments = report?.payments
    const rows = payments?.map((payment, index) => (
        <tr key={index}>
            <td>{payment.installmentDate.toLocaleDateString('pt-BR')}</td>
            <td>{asMoney(payment.savingsWithdrawal)}</td>
            <td>{asMoney(payment.cashPayment)}</td>
            <td>{asMoney(payment.installment)}</td>
            <td>{asMoney(payment.interest)}</td>
            <td>{asMoney(payment.amortization)}</td>
            <td>{asMoney(payment.balance)}</td>
        </tr>
    ))

    const completionTime = (
        <>
        <h1 hidden={report === null} className="text-center">
            É possível pagar o financiamento em <mark>{payments?.length} meses</mark>
        </h1>
        <br />
        </>
    )

    return (
        <>
            {completionTime}
            <div className="table-responsive">
            <table className="table table-striped table-bordered ">
                <thead className="text-center">
                    <tr>
                        <th scope="col">Data</th>
                        <th scope="col">Saque FGTS</th>
                        <th scope="col">Pagamento adicional</th>
                        <th scope="col">Prestação</th>
                        <th scope="col">Juros</th>
                        <th scope="col">Amortização</th>
                        <th scope="col">Saldo devedor</th>
                    </tr>
                </thead>
                <tbody className="text-center">
                    {rows}
                </tbody>
            </table>
            </div>
        </>
    )
}