import type { Pokemon } from "../entities/pokemon";

import { TypeChart } from "../entities/types";

export interface TypeAnalysis {
    defenseScore: number;
    coverageCount: number;
    weakPokemon: string[];
    resistPokemon: string[];
    immunePokemon: string[];
    coveragePokemon: string[];
}

export function calcTeamTypeSplit(team: Pokemon[]) {
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
        const defenseScore = weak * W_factor + resist * R_factor + immune * I_factor;

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
            defenseScore,
            coverageCount,
            weakPokemon,
            resistPokemon,
            immunePokemon,
            coveragePokemon };
    }

    return scores;
}
