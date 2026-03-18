import { useEffect, useState } from "react"
import { Box, Typography } from "@mui/material";

import type { PokemonList } from "./entities/pokemon"

import Team from "./cards/team";

import { fetchAllPokemon } from "./services/fetchPokemon"

function App() {
    const [allPokemon, setAllPokemon] = useState<PokemonList[]>([]);

    useEffect(() => {
        fetchAllPokemon(setAllPokemon);
    }, []);

    return (
        <div style={{ display: "flex", alignItems: "center", flexDirection: "column", marginBottom: "32px" }}>
            <Typography variant="h3" gutterBottom sx={{ fontWeight: "bold", marginTop: "16px" }}>
                Pokemon Team Builder
            </Typography>
            <div style={{ display: "flex", flexDirection: "row" }}>
                <Box sx={{ width: "70%" }}>
                    <Team allPokemon={allPokemon} />
                </Box>
            </div>
        </div>
    )
}

export default App
