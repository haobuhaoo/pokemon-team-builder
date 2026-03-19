import { useEffect, useState } from "react";
import { Box, Card, CardContent, Grid, Tooltip, Typography } from "@mui/material";

import type { Pokemon } from "../entities/pokemon";

import TypeDisplay from "./typeDisplay";
import { AllTypes } from "../entities/types";
import { calcTeamTypeSplit, type TypeAnalysis } from "../utils/typeCoverage";

type Props = {
    purpose: "strong" | "weak";
    team: Pokemon[];
}

const TypeCounter: React.FC<Props> = ({ purpose, team }) => {
    const [analysis, setAnalysis] = useState({});

    const emptyTeamCounter = () => {
        const allTypes: Record<string, TypeAnalysis> = {};
        AllTypes.forEach(t => allTypes[t] = {
            defenseScore: 0,
            coverageCount: 0,
            weakPokemon: [],
            resistPokemon: [],
            immunePokemon: [],
            coveragePokemon: [],
        });
        return allTypes;
    };

    const setColor = (value: number): string => {
        const red = "#ff2020";
        const green = "#00d03b";
        const black = "#000";
        const normalised = value / team.length;
        if (purpose === "strong") {
            if (normalised >= 0.5) return green;
            else if (normalised > 0) return black;
            else return red;
        } else {
            if (normalised >= 0.2) return red;
            else if (normalised > -0.2) return black;
            else return green;
        }
    };

    useEffect(() => {
        if (team.length === 0) setAnalysis(emptyTeamCounter())
        else setAnalysis(calcTeamTypeSplit(team));
    }, [team]);

    return (
        <Card
            sx={{
                width: "100%",
                border: "2px solid",
                borderColor: "divider",
                borderRadius: 3,
                boxShadow: "0 1px 3px rgba(0, 0, 0, 0.12), 0 2px 4px rgba(0, 0, 0, 0.08)"
            }}>
            <CardContent
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                <Typography
                    gutterBottom
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        fontWeight: "bold",
                        fontSize: "20px"
                    }}>
                    {purpose == "strong" ? "Coverage" : "Weakness"}
                </Typography>

                <Grid container spacing={2}>
                    {(Object.entries(analysis) as [string, TypeAnalysis][]).map(([type, value]) => (
                        <Grid key={type} size={4}>
                            <Tooltip
                                title={
                                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                                        {purpose === "strong"
                                            ? <Typography
                                                gutterBottom
                                                variant="body2"
                                                sx={{ textTransform: "capitalize" }}>
                                                Super Effective: {value.coveragePokemon.join(", ") || "None"}
                                            </Typography>
                                            : <>
                                                <Typography
                                                    gutterBottom
                                                    sx={{
                                                        fontSize: "16px",
                                                        fontWeight: "bold",
                                                        color: "white"
                                                    }}>
                                                    {type}
                                                </Typography>
                                                <Typography
                                                    gutterBottom
                                                    variant="body2"
                                                    sx={{ textTransform: "capitalize" }}>
                                                    Weak: {value.weakPokemon.join(", ") || "None"}
                                                </Typography>
                                                <Typography
                                                    gutterBottom
                                                    variant="body2"
                                                    sx={{ textTransform: "capitalize" }}>
                                                    Resist: {value.resistPokemon.join(", ") || "None"}
                                                </Typography>
                                                <Typography
                                                    gutterBottom
                                                    variant="body2"
                                                    sx={{ textTransform: "capitalize" }}>
                                                    Immune: {value.immunePokemon.join(", ") || "None"}
                                                </Typography>
                                            </>
                                        }
                                    </Box>
                                }
                                arrow
                                placement="top">
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "center",
                                        flexDirection: "column",
                                        gap: 1
                                    }}>
                                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                                        <TypeDisplay type={type} />
                                    </Box>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            display: "flex",
                                            justifyContent: "center",
                                            fontSize: "16px",
                                            fontWeight: "bold",
                                            color: setColor(purpose === "strong"
                                                ? value.coverageCount
                                                : value.defenseScore)
                                        }}>
                                        {purpose === "strong" ? value.coverageCount : value.defenseScore}
                                    </Typography>
                                </Box>
                            </Tooltip>
                        </Grid>
                    ))}
                </Grid>
            </CardContent>
        </Card>
    )
}

export default TypeCounter