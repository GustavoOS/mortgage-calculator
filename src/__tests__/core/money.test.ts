import { formatMoneyString, subtractMoney, truncAsMoney } from "@/core/money"

describe("Test money parse", ()=>{
    it("parse a third", () => {
        const result = truncAsMoney(1/3)
        expect(result).toEqual(0.33)
    })

    it("Test money format", () => {
        const result = formatMoneyString(12.34)
        expect(result).toEqual("R$ 12,34")
    })
})

describe("Test money subtraction", () => {
    it("remove 1/3 from 1", () => {
        expect(subtractMoney(1, 1/3)).toEqual(0.67)
    })

    it("Remove a greater value should result 0", () => {
        expect(subtractMoney(1, 1.01)).toEqual(0)
    })
})
