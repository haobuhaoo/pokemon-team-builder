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
        balance: []
    };

    for (const pkm of team) {
        const hp = pkm.stats[0].base_stat;
        const atk = pkm.stats[1].base_stat;
        const def = pkm.stats[2].base_stat;
        const satk = pkm.stats[3].base_stat;
        const sdef = pkm.stats[4].base_stat;
        const spd = pkm.stats[5].base_stat;

        const phyOff = atk * 0.7 + spd * 0.3;
        const speOff = satk * 0.7 + spd * 0.3;
        const phyDef = def * 0.5 + hp * 0.5;
        const speDef = sdef * 0.5 + hp * 0.5;

        const arr = [phyOff, speOff, phyDef, speDef].map(x => Math.exp(x));
        const sum = arr.reduce((s, v) => s + v, 0);
        const probability = arr.map(x => x / sum);

        let max: number = -Infinity;
        let idx: number[] = [];
        for (let i: number = 0; i < probability.length; i++) {
            if (probability[i] > max) {
                max = probability[i];
                idx = [i];
            } else if (probability[i] === max) {
                idx.push(i);
            }
        }

        if (idx.length !== 1) {
            result["balance"].push(pkm);
            continue;
        };

        let role = "";
        switch (idx[0]) {
            case 0: role = "physicalAttacker"; break;
            case 1: role = "specialAttacker"; break;
            case 2: role = "physicalDefender"; break;
            case 3: role = "specialDefender"; break;
        }

        result[role].push(pkm);
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
