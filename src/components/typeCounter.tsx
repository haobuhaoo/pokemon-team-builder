import { Box, Card, CardContent, Grid, Tooltip, Typography } from "@mui/material";

import type { Pokemon } from "../entities/pokemon";
import type { TypeAnalysis } from "../entities/types";

import TooltipType from "./tooltipType";
import TypeDisplay from "./typeDisplay";

import { setColor } from "../utils/typeColor";

type Props = {
    purpose: "strong" | "weak";
    team: Pokemon[];
    statistics: Record<string, TypeAnalysis>;
}

/**
 * Renders a card visualizing type based statistics for a team.
 */
const TypeCounter: React.FC<Props> = ({ purpose, team, statistics }) => {
    const isStrong = purpose === "strong";

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
                    {isStrong ? "Coverage" : "Weakness"}
                </Typography>

                <Grid container spacing={2}>
                    {(Object.entries(statistics) as [string, TypeAnalysis][]).map(([type, value]) => (
                        <Grid key={type} size={4}>
                            <Tooltip
                                title={
                                    <TooltipType
                                        isStrong={isStrong}
                                        type={type}
                                        value={value}
                                    />
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
                                            color: setColor(team.length, isStrong, value)
                                        }}>
                                        {isStrong ? value.coverageCount : value.defenceScore}
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