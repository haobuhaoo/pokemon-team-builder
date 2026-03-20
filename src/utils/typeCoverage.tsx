import type { Pokemon } from "../entities/pokemon";

import { TypeChart, type TypeAnalysis } from "../entities/types";

/**
 * Calculates type based defensive and offensive analysis for a `team`.
 *
 * For each attack type, it determines:
 * - How many Pokemon are weak, resistant, or immune to that type.
 * - Which Pokemon fall into each category.
 * - A weighted defence score that combines weakness, resistant and immunity.
 * - How many Pokemon has coverage of that type.
 *
 * @returns {Record<string, TypeAnalysis>}
 * An object keyed by attack type, each containing:
 *   - defenceScore: Weighted score of team vulnerability to this type.
 *   - coverageCount: Number of Pokémon that can hit this type super effectively.
 *   - weakPokemon: Pokémon weak to this type.
 *   - resistPokemon: Pokémon resistant to this type.
 *   - immunePokemon: Pokémon immune to this type.
 *   - coveragePokemon: Pokémon that hit this type super effectively.
 */
export function calcTeamTypeSplit(team: Pokemon[]): Record<string, TypeAnalysis> {
    const scores: Record<string, TypeAnalysis> = {};

    for (const attackType in TypeChart) {
        let weak = 0, resist = 0, immune = 0;
        const weakPokemon: string[] = [];
        const resistPokemon: string[] = [];
        const immunePokemon: string[] = [];
        const coveragePokemon: string[] = [];

        for (const pokemon of team) {
            let multiplier = 1;

            for (const type of pokemon.types) {
                multiplier *= TypeChart[type.type.name.toLowerCase()]?.[attackType.toLowerCase()] ?? 1;
            }

            if (multiplier === 0) {
                immune++;
                immunePokemon.push(pokemon.name);
            } else if (multiplier > 1) {
                weak++;
                weakPokemon.push(pokemon.name);
            } else if (multiplier < 1) {
                resist++;
                resistPokemon.push(pokemon.name);
            }
        }

        const W_factor = 1, R_factor = -0.5, I_factor = -1;
        const defenceScore = weak * W_factor + resist * R_factor + immune * I_factor;

        let coverageCount = 0;
        for (const pokemon of team) {
            let pokemonHits = false;
            for (const atk of pokemon.types) {
                const eff = TypeChart[attackType.toLowerCase()]?.[atk.type.name.toLowerCase()] ?? 1;
                if (eff > 1) {
                    pokemonHits = true;
                    break;
                }
            }
            if (pokemonHits) {
                coverageCount++;
                coveragePokemon.push(pokemon.name);
            }
        }

        scores[attackType.toLowerCase()] = {
            defenceScore,
            coverageCount,
            weakPokemon,
            resistPokemon,
            immunePokemon,
            coveragePokemon
        };
    }

    return scores;
}

/**
 * Converts type analysis into a simple numeric summary.
 */
export function unpackStats(statistics: Record<string, TypeAnalysis>): Record<string, number> {
    const result: Record<string, number> = {};
    Object.entries(statistics).forEach(([type, value]) => result[type] = value.weakPokemon.length);
    return result;
}
