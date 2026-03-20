import type { TypeAnalysis } from "../../src/entities/types";

import { Bulbasaur, Charmander, Squirtle } from "./pokemon";

export const emptyTypeAnalysis: TypeAnalysis = {
    defenceScore: 0,
    coverageCount: 0,
    weakPokemon: [],
    resistPokemon: [],
    immunePokemon: [],
    coveragePokemon: []
};

export const fireTypeAnalysis: TypeAnalysis = {
    ...emptyTypeAnalysis,
    coverageCount: 1,
    weakPokemon: [Bulbasaur.name],
    resistPokemon: [Charmander.name, Squirtle.name],
    coveragePokemon: [Squirtle.name]
};

export const psychicTypeAnalysis: TypeAnalysis = {
    ...emptyTypeAnalysis,
    defenceScore: 1,
    weakPokemon: [Bulbasaur.name]
};

export const fairyTypeAnalysis: TypeAnalysis = {
    ...emptyTypeAnalysis,
    defenceScore: -1,
    coverageCount: 1,
    resistPokemon: [Bulbasaur.name, Charmander.name],
    coveragePokemon: [Bulbasaur.name]
};