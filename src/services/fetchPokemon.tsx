import type { Pokemon, PokemonList } from "../entities/pokemon";

import axiosInstance from "./axiosInstance"

export async function fetchList(max: number): Promise<Pokemon[]> {
    const promise: Pokemon[] = [];
    for (let i = 1; i <= max; i++) {
        await axiosInstance.get(`https://pokeapi.co/api/v2/pokemon/${i}`)
            .then(res => {
                if (res.data) {
                    const pkm = {
                        id: res.data.id,
                        name: res.data.name,
                        sprites: res.data.sprites,
                        types: res.data.types,
                        abilities: res.data.abilities,
                        stats: res.data.stats,
                    };
                    promise.push(pkm);
                }
            })
            .catch(err => {
                console.error(err);
            });
    }
    return await Promise.all(promise);
}

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