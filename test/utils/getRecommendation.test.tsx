import type { Pokemon } from "../../src/entities/pokemon";

import { findLowest, getRec, normalise, suggestion } from "../../src/utils/getRecommendation";

import { Blissey, Cloyster, Dragonite, Gardevoir, Mew, Squirtle } from "../mockups/pokemon";

describe("normalise", () => {
    it("returns correctly normalised counts", () => {
        const sampleStats: Record<string, number> = { fire: 1, water: 0, grass: 5 };
        const expected: Record<string, number> = { fire: 1 / 6, water: 0 / 6, grass: 5 / 6 };
        expect(normalise(sampleStats, 6)).toEqual(expected);
    })
})

describe("findLowest", () => {
    it("returns all lowest stat Pokemon", () => {
        let sampleTeam: Pokemon[] = [Blissey, Cloyster, Squirtle, Gardevoir, Dragonite];
        let expected: Pokemon[] = [Blissey];
        expect(findLowest(sampleTeam, 1)).toEqual(expected);

        sampleTeam = [Cloyster, Squirtle, Gardevoir, Dragonite];
        expected = [Squirtle, Gardevoir];
        expect(findLowest(sampleTeam, 2)).toEqual(expected);
    })
})

describe("suggestion", () => {
    it("returns correct suggestion", () => {
        let sampleRoles: Record<string, Pokemon[]> = { physicalAttacker: [Dragonite] };
        let expected: string = "Too much physical attackers. Consider removing Dragonite";
        expect(suggestion(sampleRoles, "physicalAttacker", 1, "physical attackers")).toEqual(expected);

        sampleRoles = { physicalDefender: [Gardevoir, Squirtle] };
        expected = "Too much physical defenders. Consider removing Gardevoir or Squirtle";
        expect(suggestion(sampleRoles, "physicalDefender", 2, "physical defenders")).toEqual(expected);
    })
})

describe("getRec", () => {
    describe("returns correct recommendations for", () => {
        it("balanced team", () => {
            const sampleStats: Record<string, number> = { fire: 1, water: 0, grass: 5 };
            const sampleRoles: Record<string, number> = {
                physicalAttacker: 1,
                specialAttacker: 1,
                physicalDefender: 1,
                specialDefender: 1,
                balance: 1
            };
            const sampleRoleDist: Record<string, Pokemon[]> = {
                physicalAttacker: [Dragonite],
                specialAttacker: [Gardevoir],
                physicalDefender: [Cloyster],
                specialDefender: [Blissey],
                balance: [Mew]
            };
            const expected: string[] = ["Major weakness: Grass"];
            expect(getRec(sampleStats, sampleRoles, 6, sampleRoleDist)).toEqual(expected);
        })

        it("missing roles", () => {
            const sampleStats: Record<string, number> = { psychic: 1, fairy: 0 };
            const sampleRoles: Record<string, number> = {
                physicalAttacker: 1,
                specialAttacker: 1,
                physicalDefender: 0,
                specialDefender: 0,
                balance: 0
            };
            const sampleRoleDist: Record<string, Pokemon[]> = {
                physicalAttacker: [Dragonite],
                specialAttacker: [Gardevoir],
                physicalDefender: [],
                specialDefender: [],
                balance: []
            };
            const expected: string[] = [
                "Major weakness: Psychic",
                "Too much physical attackers. Consider removing Dragonite",
                "Too much special attackers. Consider removing Gardevoir",
                "Too few physical defenders.",
                "Too few special defenders."
            ];
            expect(getRec(sampleStats, sampleRoles, 2, sampleRoleDist)).toEqual(expected);
        })

        it("missing roles but with balance Pokemon", () => {
            const sampleStats: Record<string, number> = { fire: 1, water: 0 };
            const sampleRoles: Record<string, number> = {
                physicalAttacker: 0,
                specialAttacker: 0,
                physicalDefender: 0,
                specialDefender: 0,
                balance: 1
            };
            const sampleRoleDist: Record<string, Pokemon[]> = {
                physicalAttacker: [],
                specialAttacker: [],
                physicalDefender: [],
                specialDefender: [],
                balance: [Mew]
            };
            const expected: string[] = [
                "Major weakness: Fire",
            ];
            expect(getRec(sampleStats, sampleRoles, 1, sampleRoleDist)).toEqual(expected);
        })
    })
})