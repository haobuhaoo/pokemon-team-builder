import axiosInstance from "./axiosInstance"
import type { Pokemon } from "../entities/pokemon";

export function fetchPokemon(setPokemon: React.Dispatch<React.SetStateAction<Pokemon>>): void {
    axiosInstance.get("https://pokeapi.co/api/v2/pokemon/tepig")
        .then(res => {
            if (res.data) {
                setPokemon(res.data)
            }
        })
        .catch(err => {
            console.error(err)
        });
}

export async function fetchList(max: number): Promise<Pokemon[]> {
    const promise: Pokemon[] = [];
    for (let i = 1; i <= max; i++) {
        await axiosInstance.get(`https://pokeapi.co/api/v2/pokemon/${i}`)
            .then(res => {
                if (res.data) {
                    promise.push(res.data)
                }
            })
            .catch(err => {
                console.error(err)
            });
    }
    return await Promise.all(promise);
}