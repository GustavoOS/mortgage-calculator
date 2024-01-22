const { truncAsMoney } = require("../mortgage/money")

describe("Test money parse", ()=>{
    it("parse a third", () => {
        const result = truncAsMoney(1/3)
        expect(result).toEqual(0.33)
    })
})