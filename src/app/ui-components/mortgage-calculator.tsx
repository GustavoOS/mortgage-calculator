
import { useEffect, useState } from "react";
import { MortgageForm } from "./mortgage-form";
import { CalculatePaymentRequest } from "@/service/port/in";
import { MortgageReport } from "./mortgage-report";
import { calculateMortgage } from "@/service/mortgage";
import { PaymentDTO } from "@/service/port/out";


const headerColor = {
    color: "#D8546D"
}

const asNumber = (no: any) => parseFloat(`${no}`)
const asInt = (no: any) => parseInt(`${no}`)
const asBoolean = (no: any) => `${no}` === "true"

export const MortgageCalculator = () => {
    const [mortgageParams, setMortgageParams] = useState<CalculatePaymentRequest | null>(null)
    const [mortgageReport, setMortgageReport] = useState<PaymentDTO | null>(null)
    
    useEffect(()=>{
        if(mortgageParams == null) return
        try {
            const request: CalculatePaymentRequest = {
                grossPay: asNumber(mortgageParams.grossPay),
                value: asNumber(mortgageParams.value),
                hasFGTS: asBoolean(mortgageParams.hasFGTS),
                monthlyPayments: asNumber(mortgageParams.monthlyPayments),
                annualPayments: asNumber(mortgageParams.annualPayments),
                mortgageType: asInt(mortgageParams.mortgageType),
                annualInterestRate: asNumber(mortgageParams.annualInterestRate),
                numberOfMonths: asInt(mortgageParams.numberOfMonths),
                extraExpenses: asNumber(mortgageParams.extraExpenses),
                initialFunds: asNumber(mortgageParams.initialFunds),
                downPayment: asNumber(mortgageParams.downPayment)
            }
            console.debug(request)
            setMortgageReport(calculateMortgage(request))
        } catch (error) {
            console.error(error)
        }
    }, [mortgageParams])

    return (<>
        <h1 style={headerColor}>Calculadora de Amortização</h1>
        <MortgageForm submitMortgageParams={setMortgageParams} />
        <MortgageReport report={mortgageReport}/>
    </>)
}
