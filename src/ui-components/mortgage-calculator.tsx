
import { useState } from "react";
import { MortgageForm } from "./mortgage-form";
import { CalculatePaymentRequest } from "@/service/port/in";


const headerColor = {
    color: "#D8546D"
}

export const MortgageCalculator = () => {
    const [mortgageParams, setMortgageParams] = useState<CalculatePaymentRequest | null>(null)
    return (<>
        <h1 style={headerColor}>Calculadora de Amortização</h1>
        <MortgageForm submitMortgageParams={setMortgageParams} />
        <p>Helllo {mortgageParams?.value}</p>
    </>)
}
