import type { Pokemon } from "../entities/pokemon";

/**
 * Determines the role distribution of a Pokémon team.
 */
export function calcTeamRoleDistribution(team: Pokemon[]): Record<string, Pokemon[]> {
    const result: Record<string, Pokemon[]> = {
        physicalAttacker: [],
        specialAttacker: [],
        physicalDefender: [],
        specialDefender: [],
    };

    for (const pkm of team) {
        const atk = pkm.stats[1].base_stat;
        const def = pkm.stats[2].base_stat;
        const satk = pkm.stats[3].base_stat;
        const sdef = pkm.stats[4].base_stat;

        if (atk >= 110 && atk > satk) result["physicalAttacker"].push(pkm);
        if (satk >= 110 && satk > atk) result["specialAttacker"].push(pkm);
        if (def >= 130 && atk < 100 && satk < 100) result["physicalDefender"].push(pkm);
        if (sdef >= 130 && atk < 100 && satk < 100) result["specialDefender"].push(pkm);
    }
    return result;
}

/**
 * Converts a role distribution into a simple numeric summary.
 */
export function unpackRoles(rolesDist: Record<string, Pokemon[]>): Record<string, number> {
    const result: Record<string, number> = {};
    Object.entries(rolesDist).forEach(([role, array]) => result[role] = array.length);
    return result;
}
