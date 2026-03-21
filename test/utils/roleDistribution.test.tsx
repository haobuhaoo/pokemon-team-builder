import type { Pokemon } from "../../src/entities/pokemon";

import { calcTeamRoleDistribution, unpackRoles } from "../../src/utils/roleDistribution";

import { Blissey, Cloyster, Dragonite, Gardevoir, Mew } from "../mockups/pokemon";

const sampleTeam: Pokemon[] = [Cloyster, Dragonite, Blissey, Gardevoir, Mew];

describe("calcTeamRoleDistribution", () => {
    it("categorizes Pokémon into roles", () => {
        const roles = calcTeamRoleDistribution(sampleTeam);
        expect(roles).toHaveProperty("physicalAttacker");
        expect(roles.physicalAttacker.length).toEqual(1);

        expect(roles).toHaveProperty("specialAttacker");
        expect(roles.specialAttacker.length).toEqual(1);

        expect(roles).toHaveProperty("physicalDefender");
        expect(roles.physicalDefender.length).toEqual(1);

        expect(roles).toHaveProperty("specialDefender");
        expect(roles.specialDefender.length).toEqual(1);

        expect(roles).toHaveProperty("balance");
        expect(roles.specialDefender.length).toEqual(1);
    })
})

describe("unpackRoles", () => {
    it("returns correct summary of roles", () => {
        const nonEmpty: Record<string, Pokemon[]> = { physicalAttacker: [Dragonite], specialDefender: [Blissey] };
        let expected: Record<string, number> = { physicalAttacker: 1, specialDefender: 1 };
        expect(unpackRoles(nonEmpty)).toEqual(expected);

        const oneEmpty: Record<string, Pokemon[]> = { physicalAttacker: [], specialAttacker: [Gardevoir] };
        expected = { physicalAttacker: 0, specialAttacker: 1 };
        expect(unpackRoles(oneEmpty)).toEqual(expected);

        const empty: Record<string, Pokemon[]> = { physicalAttacker: [], physicalDefender: [] };
        expected = { physicalAttacker: 0, physicalDefender: 0 };
        expect(unpackRoles(empty)).toEqual(expected);
    })
})