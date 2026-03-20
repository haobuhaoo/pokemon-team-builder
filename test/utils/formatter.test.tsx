import { capitaliseName } from "../../src/utils/formatter"

describe("capitaliseNames", () => {
    it("returns names correctly capitalised", () => {
        expect(capitaliseName("dragonite-mega")).toMatch("Dragonite-Mega");
        expect(capitaliseName("dragonite")).toMatch("Dragonite");

        expect(capitaliseName("")).toMatch("");
        expect(capitaliseName("mEW")).toMatch("Mew");
    });
})