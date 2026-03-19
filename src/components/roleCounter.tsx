import { useEffect, useState, type JSX } from "react";
import { Box, Card, CardContent, Divider, Tooltip, Typography } from "@mui/material";

import type { Pokemon } from "../entities/pokemon";

import { calcTeamRoleDistribution } from "../utils/roleDistribution";

type Props = {
    team: Pokemon[];
}

const RoleCounter: React.FC<Props> = ({ team }) => {
    const [roles, setRoles] = useState<Record<string, Pokemon[]>>({
        physicalAttacker: [],
        specialAttacker: [],
        physicalDefender: [],
        specialDefender: [],
    });

    const role = {
        "Physical Attacker": "physicalAttacker",
        "Special Attacker": "specialAttacker",
        "Physical Defender": "physicalDefender",
        "Special Defender": "specialDefender",
    }

    const displayRoles = (title: string, role: string): JSX.Element => {
        return (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <Divider sx={{ mx: "2px", mt: "4px" }} />
                <Box sx={{ display: "flex" }}>
                    <Typography
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
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
                        {roles[role].map(p => (
                            <Tooltip
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
                                    key={p.id}
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

    useEffect(() => {
        setRoles(calcTeamRoleDistribution(team));
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

                {Object.entries(role).map(([t, r]) => (
                    displayRoles(t, r)
                ))}
            </CardContent>
        </Card>
    )
}

export default RoleCounter