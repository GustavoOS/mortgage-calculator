const pmt = (
    interestRate,
    numberOfPeriods,
    presentValue,
    futureValue = 0,
    paymentType = 0) => {
    /*
    * type - when the payments are due:
    *      0: end of the period, e.g. end of month (default)
    *      1: beginning of period
    */

    if (interestRate === 0)
        return -(presentValue + futureValue) / numberOfPeriods;

    const presentValueInFuture = Math.pow(1 + interestRate, numberOfPeriods)
    const payment = - interestRate * (
        presentValue * presentValueInFuture + futureValue) / (
            presentValueInFuture - 1)
    if (paymentType === 1)
        return payment / (1 + interestRate)
    return payment
}

const annualRateToMonthlyRate = (annualRate) => Math.pow(1 + annualRate, 1/12) - 1

const parsePercentage = (num) => num/100

module.exports = {
    pmt,
    annualRateToMonthlyRate,
    parsePercentage
}