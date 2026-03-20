import type { Pokemon } from "../../src/entities/pokemon";
import type { TypeAnalysis } from "../../src/entities/types";

import { calcTeamTypeSplit, unpackStats } from "../../src/utils/typeCoverage";

import { Bulbasaur, Charmander, Squirtle } from "../mockups/pokemon";
import { emptyTypeAnalysis, fairyTypeAnalysis, fireTypeAnalysis, psychicTypeAnalysis } from "../mockups/typeAnalysis";

const sampleTeam: Pokemon[] = [Bulbasaur, Charmander, Squirtle];

describe("calcTeamTypeSplit", () => {
    it("returns type analysis for each type", () => {
        const stats = calcTeamTypeSplit(sampleTeam);
        expect(stats).toHaveProperty("fire");
        expect(stats).toHaveProperty("psychic");
        expect(stats).toHaveProperty("fairy");

        expect(stats["fire"]).toEqual(fireTypeAnalysis);
        expect(stats["psychic"]).toEqual(psychicTypeAnalysis);
        expect(stats["fairy"]).toEqual(fairyTypeAnalysis);
    })
})

describe("unpackStats", () => {
    it("returns correct summary of analysis", () => {
        const nonEmpty: Record<string, TypeAnalysis> = { fire: fireTypeAnalysis, psychic: psychicTypeAnalysis };
        let expected: Record<string, number> = { fire: 1, psychic: 1 };
        expect(unpackStats(nonEmpty)).toEqual(expected);

        const oneEmpty: Record<string, TypeAnalysis> = { psychic: psychicTypeAnalysis, fairy: fairyTypeAnalysis };
        expected = { psychic: 1, fairy: 0 };
        expect(unpackStats(oneEmpty)).toEqual(expected);

        const empty: Record<string, TypeAnalysis> = { water: emptyTypeAnalysis, grass: emptyTypeAnalysis };
        expected = { water: 0, grass: 0 };
        expect(unpackStats(empty)).toEqual(expected);
    })
})