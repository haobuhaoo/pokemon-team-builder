import { type JSX } from "react";
import { Box, Card, CardContent, Divider, Tooltip, Typography } from "@mui/material";

import type { Pokemon } from "../entities/pokemon";

type Props = {
    rolesDist: Record<string, Pokemon[]>;
}

const Role = {
    "Physical Attacker": "physicalAttacker",
    "Special Attacker": "specialAttacker",
    "Physical Defender": "physicalDefender",
    "Special Defender": "specialDefender",
    "Balanced": "balance"
}

/**
 * Renders a card showing Pokémon role distribution.
 */
const RoleCounter: React.FC<Props> = ({ rolesDist }) => {
    const displayRoles = (title: string, role: string): JSX.Element => {
        return (
            <Box key={title} sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <Divider sx={{ mx: "2px", mt: "4px" }} />
                <Box sx={{ display: "flex" }}>
                    <Typography
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "left",
                            width: "30%",
                            textTransform: "capitalize"
                        }}>
                        {title}:
                    </Typography>
                    <Box
                        sx={{
                            display: "flex",
                            gap: 1,
                            justifyContent: "left",
                            flexWrap: "wrap",
                            width: "70%"
                        }}>
                        {rolesDist[role].map(p => (
                            <Tooltip
                                key={p.id}
                                title={
                                    <Typography
                                        sx={{
                                            fontSize: "16px",
                                            color: "white",
                                            textTransform: "capitalize"
                                        }}>
                                        {p.name}
                                    </Typography>
                                }
                                arrow
                                placement="top">
                                <img
                                    src={p.sprites.front_default}
                                    alt={p.name}
                                    width={"30%"}
                                />
                            </Tooltip>
                        ))}
                    </Box>
                </Box>
            </Box>
        )
    };

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
                }}>
                <Typography
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        fontWeight: "bold",
                        fontSize: "20px"
                    }}>
                    Distribution
                </Typography>

                {Object.entries(Role).map(([t, r]) => (
                    displayRoles(t, r)
                ))}
            </CardContent>
        </Card>
    )
}

export default RoleCounter