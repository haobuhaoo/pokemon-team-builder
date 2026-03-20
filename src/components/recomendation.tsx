import { Box, Card, CardContent, Typography } from "@mui/material";

import type { Pokemon } from "../entities/pokemon";
import type { TypeAnalysis } from "../entities/types";

import { getRec } from "../utils/getRecommendation";
import { unpackRoles } from "../utils/roleDistribution";
import { unpackStats } from "../utils/typeCoverage";

type Props = {
    team: Pokemon[];
    statistics: Record<string, TypeAnalysis>;
    rolesDist: Record<string, Pokemon[]>;
}

/**
 * Renders a card listing recommendations for the team.
 */
const Recommendation: React.FC<Props> = ({ team, statistics, rolesDist }) => {
    const stats: Record<string, number> = unpackStats(statistics);
    const roles: Record<string, number> = unpackRoles(rolesDist);
    const rec: string[] = getRec(stats, roles, team.length, rolesDist);

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
                    gutterBottom
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        fontWeight: "bold",
                        fontSize: "20px"
                    }}>
                    Recommendation
                </Typography>

                {rec.map((text, index) => (
                    <Box key={index}>
                        <Typography gutterBottom variant="body2" sx={{ fontSize: "16px" }}>
                            - {text}
                        </Typography>
                    </Box>
                ))}
            </CardContent>
        </Card>
    )
}

export default Recommendation