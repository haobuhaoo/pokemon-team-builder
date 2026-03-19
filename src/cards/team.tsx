import { Grid } from "@mui/material";

import type { Pokemon, PokemonList } from "../entities/pokemon";

import PokemonDisplay from "../components/pokemonDisplay";

type Props = {
    allPokemon: PokemonList[];
    addPokemon: (index: number, pkm: Pokemon) => void;
    removePokemon: (index: number) => void;
}

const Team: React.FC<Props> = ({ allPokemon, addPokemon, removePokemon }) => {
    return (
        <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
            <Grid container spacing={2}>
                {Array.from({ length: 6 }, (_, index) => index + 1).map(p => (
                    <Grid key={p} size={6}>
                        <PokemonDisplay
                            allPokemon={allPokemon}
                            addPokemon={(pkm: Pokemon) => addPokemon(p - 1, pkm)}
                            removePokemon={() => removePokemon(p - 1)}
                        />
                    </Grid>
                ))}
            </Grid>
        </div>
    )
}

export default Team