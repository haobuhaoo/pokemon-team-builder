import { useCallback, useEffect, useMemo, useState } from "react"
import { Box, Typography } from "@mui/material";

import type { Pokemon, PokemonList } from "./entities/pokemon"

import Coverage from "./cards/coverage";
import Team from "./cards/team";

import { fetchAllPokemon } from "./services/fetchPokemon"

const App: React.FC = () => {
    const [allPokemon, setAllPokemon] = useState<PokemonList[]>([]);
    const [team, setTeam] = useState<(Pokemon | null)[]>(Array(6).fill(null));
    const teamSize = useMemo(() => team.filter(p => p !== null).length, [team]);
    const pkmOnlyTeam = useMemo(() => team.filter(p => p !== null) as Pokemon[], [team]);

    const handleAddPokemon = useCallback((index: number, pkm: Pokemon): void => {
        const newTeam = [...team];
        newTeam[index] = pkm;
        setTeam(newTeam);
    }, [team]);

    const handleRemovePokemon = useCallback((index: number): void => {
        const newTeam = [...team];
        newTeam[index] = null;
        setTeam(newTeam);
    }, [team]);

    useEffect(() => {
        fetchAllPokemon(setAllPokemon);
    }, []);

    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                marginBottom: "32px",
                padding: "0 32px"
            }}>
            <Typography variant="h3" sx={{ fontWeight: "bold", marginTop: "16px" }}>
                Pokemon Team Builder
            </Typography>

            <Typography
                gutterBottom
                sx={{
                    fontSize: "28px",
                    fontWeight: "bold",
                    paddingTop: "8px",
                    mx: "16px",
                    justifyContent: "center",
                    display: "flex",
                }}>
                My Team ({teamSize}/6)
            </Typography>

            <div style={{ display: "flex", justifyContent: "center", gap: "28px", width: "100%" }}>
                <Box sx={{ width: "70%" }}>
                    <Team
                        allPokemon={allPokemon}
                        addPokemon={handleAddPokemon}
                        removePokemon={handleRemovePokemon}
                    />
                </Box>

                <Box sx={{ width: "30%" }}>
                    <Coverage team={pkmOnlyTeam} />
                </Box>
            </div>
        </div>
    )
}

export default App
