import type { Pokemon } from "../entities/pokemon";

export function calcTeamRoleDistribution(team: Pokemon[]): Record<string, Pokemon[]> {
    const result: Record<string, Pokemon[]> = {
        physicalAttacker: [],
        specialAttacker: [],
        physicalDefender: [],
        specialDefender: [],
    };

    for (const pkm of team) {
        if (pkm.stats[1].base_stat >= 110) result["physicalAttacker"].push(pkm);
        if (pkm.stats[3].base_stat >= 110) result["specialAttacker"].push(pkm);
        if (pkm.stats[2].base_stat >= 110) result["physicalDefender"].push(pkm);
        if (pkm.stats[4].base_stat >= 110) result["specialDefender"].push(pkm);
    }
    return result;
}