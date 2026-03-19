import { useState } from "react";
import { Box, Divider, Typography } from "@mui/material";

import type { Pokemon, PokemonList } from "../entities/pokemon";

import AbilityDisplay from "./abilityDisplay";
import EmptyDisplay from "./emptyDisplay";
import SearchPokemon from "./searchPokemon";
import StatsDisplay from "./statsDisplay";
import TypeDisplay from "./typeDisplay";

type Props = {
    allPokemon: PokemonList[];
    increment: () => void;
    decrement: () => void;
}

const PokemonDisplay: React.FC<Props> = ({ allPokemon, increment, decrement }) => {
    const [pokemon, setPokemon] = useState<Pokemon | null>(null);

    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            border: "2px solid",
            borderColor: "divider",
            borderRadius: 3,
            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.12), 0 2px 4px rgba(0, 0, 0, 0.08)"
        }}>
            <SearchPokemon allPokemon={allPokemon} setPokemon={setPokemon} increment={increment} decrement={decrement} />

            {pokemon ?
                <div style={{ width: "100%", height: "100%", marginTop: "8px" }}>
                    <Typography
                        variant="h5"
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            fontWeight: "bold",
                            whiteSpace: "normal",
                            wordBreak: "break-word",
                            textTransform: "capitalize"
                        }}>
                        {pokemon.name}
                    </Typography>

                    <Box sx={{ display: "flex", justifyContent: "center", width: "100%", height: "100%" }}>
                        <Box sx={{ display: "flex", flexDirection: "column", width: "40%" }}>
                            <img
                                src={pokemon.sprites.front_default}
                                alt={pokemon.name}
                                loading="lazy"
                                height="auto"
                                width="100%"
                            />

                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 1,
                                    justifyContent: "center",
                                    alignItems: "center"
                                }}>
                                {pokemon.types.map(t => (
                                    <TypeDisplay key={t.type.name} type={t.type.name} />
                                ))}
                            </Box>
                        </Box>

                        <StatsDisplay stats={pokemon.stats} />
                    </Box>

                    <Divider sx={{ my: "8px", mx: 1 }} />

                    <Box sx={{ display: "flex", gap: 1.5, justifyContent: "left", mb: 1 }}>
                        <Typography sx={{ display: "flex", pl: 2, fontWeight: "bold" }}>
                            Abilities:
                        </Typography>

                        <AbilityDisplay ability={pokemon.abilities} />
                    </Box>
                </div>
                : <EmptyDisplay />}
        </Box>
    )
}

export default PokemonDisplay