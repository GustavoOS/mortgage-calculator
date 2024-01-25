import { PriceTable, SacTable } from "@/core/mortgage"

const mortageCalculatorService = (calculateMortgageRequest) => {
    const MortgageTable = calculateMortgageRequest.mortgageType === "sac"? SacTable : PriceTable
    
}
