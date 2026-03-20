import type { Pokemon } from "../entities/pokemon";

import { capitaliseName } from "./formatter";

/**
 * Normalizes numerical counts relative to team size.
 */
export function normalise(records: Record<string, number>, teamSize: number): Record<string, number> {
    const result: Record<string, number> = {};
    for (const type in records) {
        result[type] = records[type] / teamSize;
    }
    return result;
};

/**
 * Finds the Pokémon with the lowest value for a specific stat.
 */
export function findLowest(arr: Pokemon[], index: number): Pokemon[] {
    let lowest: number = Infinity;
    let pkm: Pokemon[] = [];
    for (let i = 0; i < arr.length; i++) {
        const stat: number = arr[i].stats[index].base_stat;
        if (stat === lowest) {
            pkm.push(arr[i]);
        } else if (stat < lowest) {
            lowest = stat;
            pkm = [arr[i]];
        }
    }
    return pkm;
}

/**
 * Generates a suggestion string for overrepresented roles in a team.
 */
export function suggestion(
    rolesDist: Record<string, Pokemon[]>,
    type: string,
    index: number,
    entity: string
): string {
    const toRemove: Pokemon[] = findLowest(rolesDist[type], index);
    const removeNames: string[] = toRemove.map(p => capitaliseName(p.name));
    return "Too much " + entity + ". Consider removing " + removeNames.join(" or ");
}

/**
 * Generates a list of recommendations for improving a Pokémon team composition.
 *
 * Recommendations include:
 * - Identifying major type weaknesses.
 * - Highlighting underrepresented or overrepresented roles.
 */
export function getRec(
    statBreakdown: Record<string, number>,
    roleBreakdown: Record<string, number>,
    teamSize: number,
    rolesDist: Record<string, Pokemon[]>
): string[] {
    const rec: string[] = [];
    const weak = Object.entries(normalise(statBreakdown, teamSize))
        .filter(([_, count]) => count >= 0.5)
        .map(([type]) => capitaliseName(type));
    if (weak.length > 0) rec.push("Major weakness: " + weak.join(", "));

    const roles = normalise(roleBreakdown, teamSize);
    if ((roles["physicalAttacker"]) < 0.15) {
        rec.push("Too few physical attackers.");
    }
    if ((roles["physicalAttacker"]) >= 0.50) {
        rec.push(suggestion(rolesDist, "physicalAttacker", 1, "physical attackers"));
    }

    if ((roles["specialAttacker"]) < 0.15) {
        rec.push("Too few special attackers.");
    }
    if ((roles["specialAttacker"]) >= 0.50) {
        rec.push(suggestion(rolesDist, "specialAttacker", 3, "special attackers"));
    }

    if ((roles["physicalDefender"]) < 0.15) {
        rec.push("Too few physical defenders.");
    }
    if ((roles["physicalDefender"]) >= 0.50) {
        rec.push(suggestion(rolesDist, "physicalDefender", 2, "physical defenders"));
    }

    if ((roles["specialDefender"]) < 0.15) {
        rec.push("Too few special defenders.");
    }
    if ((roles["specialDefender"]) >= 0.50) {
        rec.push(suggestion(rolesDist, "specialDefender", 4, "special defenders"));
    }

    return rec;
};