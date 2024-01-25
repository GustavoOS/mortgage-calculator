enum PaymentType {
    EndOfPeriod,
    BeginningOfPeriod
}

export const pmt = (
    interestRate: number,
    numberOfPeriods: number,
    presentValue: number,
    futureValue: number = 0,
    paymentType:PaymentType = 0) => {

    if (interestRate === 0)
        return -(presentValue + futureValue) / numberOfPeriods;

    const presentValueInFuture = Math.pow(1 + interestRate, numberOfPeriods)
    const payment = - interestRate * (
        presentValue * presentValueInFuture + futureValue) / (
            presentValueInFuture - 1)
    if (paymentType === PaymentType.BeginningOfPeriod)
        return payment / (1 + interestRate)
    return payment
}

export const annualRateToMonthlyRate = (annualRate: number):number => Math.pow(1 + annualRate, 1/12) - 1

export const parsePercentage = (num: number): number => num/100

export const getFirstDayOfNextMonth = (today: Date = new Date()): Date => {
    today.setMonth(today.getMonth() + 1, 1)
    today.setHours(0,0,0,0)
    return today
}
