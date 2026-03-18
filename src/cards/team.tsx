import { useState } from "react";
import { Grid, Typography } from "@mui/material";

import type { PokemonList } from "../entities/pokemon";

import PokemonDisplay from "../components/pokemonDisplay";

type Props = {
    allPokemon: PokemonList[];
}

const Team: React.FC<Props> = ({ allPokemon }) => {
    const [teamSize, setTeamSize] = useState<number>(0);

    const increment = () => {
        setTeamSize(prev => prev + 1);
    }

    const decrement = () => {
        setTeamSize(prev => prev - 1);
    }

    return (
        <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
            <Typography sx={{
                fontSize: "24px",
                fontWeight: "bold",
                paddingTop: "8px",
                mx: "16px",
                justifyContent: "center",
                display: "flex",
            }}>
                My Team ({teamSize}/6)
            </Typography>

            <Grid container spacing={2}>
                {Array.from({ length: 6 }, (_, index) => index + 1).map(p => (
                    <Grid key={p} size={6}>
                        <PokemonDisplay allPokemon={allPokemon} increment={increment} decrement={decrement} />
                    </Grid>
                ))}
            </Grid>
        </div>
    )
}

export default Team