import type { Pokemon, PokemonList } from "../entities/pokemon";

import axiosInstance from "./axiosInstance"

/**
 * Fetches a list of all Pokémon names and URLs from the API and sets state.
 */
export function fetchAllPokemon(setAllPokemon: React.Dispatch<React.SetStateAction<PokemonList[]>>): void {
    axiosInstance.get("https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0")
        .then(res => {
            if (res.data) {
                setAllPokemon(res.data.results);
            }
        })
        .catch(err => {
            console.error(err);
        });
}

/**
 * Fetches a single Pokémon from a given URL.
 */
export async function fetchByUrl(url: string): Promise<Pokemon | null> {
    let pkm = null;
    await axiosInstance.get(url)
        .then(res => {
            if (res.data) {
                const p: Pokemon = {
                    id: res.data.id,
                    name: res.data.name,
                    sprites: res.data.sprites,
                    types: res.data.types,
                    abilities: res.data.abilities,
                    stats: res.data.stats,
                };
                pkm = p;
            }
        })
        .catch(err => {
            console.error(err);
        });
    return pkm;
}