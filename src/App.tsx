import { useEffect, useState } from "react"
import type { Pokemon } from "./entities/pokemon"
import { fetchList } from "./services/fetchPokemon"

function App() {
    const [pokemon, setPokemon] = useState<Pokemon[]>([]);

    useEffect(() => {
        const loadPokemon = async () => {
            const data = await fetchList(2);
            setPokemon(data);
        };
        loadPokemon();
    }, []);

    return (
        <div style={{ position: "relative", display: "flex" }}>
            {pokemon ?
                pokemon?.map(pokemon => (
                    <div key={pokemon.id}>
                        {pokemon.name}
                        {pokemon.abilities[0].ability.name}
                        <img src={pokemon.sprites.front_default} alt={pokemon.name} height="200px" width="200px" />
                        {pokemon.types[0].type.name}
                        {pokemon.stats[0].stat.name}
                        {pokemon.stats[0].base_stat}
                    </div>
                ))
                : <div style={{ position: "relative", display: "flex" }}>loading...</div>}

        </div>
    )
}

export default App
