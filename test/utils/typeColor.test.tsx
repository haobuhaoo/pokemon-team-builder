import { setColor, typeColor } from "../../src/utils/typeColor";

import { emptyTypeAnalysis } from "../mockups/typeAnalysis";

describe("typeColor", () => {
    it("returns correct color of the type", () => {
        expect(typeColor("fire")).toMatch("#f42");
        expect(typeColor("unknown")).toMatch("#eee");
    })
})

describe("setColor", () => {
    const red = "#ff2020";
    const green = "#00d03b";
    const black = "#000";

    describe("returns correct color of the value", () => {
        it("for strong", () => {
            expect(setColor(6, true, emptyTypeAnalysis)).toMatch(red);

            let changeValue = { ...emptyTypeAnalysis, coverageCount: 2 };
            expect(setColor(6, true, changeValue)).toMatch(black);

            changeValue = { ...emptyTypeAnalysis, coverageCount: 3 };
            expect(setColor(6, true, changeValue)).toMatch(green);

            expect(setColor(3, true, emptyTypeAnalysis)).toMatch(red);

            changeValue = { ...emptyTypeAnalysis, coverageCount: 1 };
            expect(setColor(3, true, changeValue)).toMatch(black);

            changeValue = { ...emptyTypeAnalysis, coverageCount: 2 };
            expect(setColor(3, true, changeValue)).toMatch(green);
        })

        it("for weak", () => {
            expect(setColor(6, false, emptyTypeAnalysis)).toMatch(black);

            let changeValue = { ...emptyTypeAnalysis, defenceScore: 1.5 };
            expect(setColor(6, false, changeValue)).toMatch(red);

            changeValue = { ...emptyTypeAnalysis, defenceScore: -1.5 };
            expect(setColor(6, false, changeValue)).toMatch(green);

            expect(setColor(3, false, emptyTypeAnalysis)).toMatch(black);

            changeValue = { ...emptyTypeAnalysis, defenceScore: 1 };
            expect(setColor(3, false, changeValue)).toMatch(red);

            changeValue = { ...emptyTypeAnalysis, defenceScore: -1 };
            expect(setColor(3, false, changeValue)).toMatch(green);
        })
    })
})