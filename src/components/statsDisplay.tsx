import { Box, Typography } from "@mui/material"
import { RadarChart } from "@mui/x-charts"

import type { Stats } from "../entities/pokemon"

type Props = {
    stats: Stats[];
}

const Metrics = ["HP", "Attack", "Defence", "Speed", "Sp. Def", "Sp. Atk"];

/**
 * Renders a radar chart of the Pokémon's base stats.
 */
const StatsDisplay: React.FC<Props> = ({ stats }) => {
    const firstThree = stats.slice(0, 3).map(s => s.base_stat);
    const lastThree = stats.slice(3, 6).map(s => s.base_stat).reverse();
    const combinedStats = firstThree.concat(lastThree);
    const total = combinedStats.reduce((sum, val) => sum + val, 0);
    const metricsWithValues = Metrics.map((label, i) => `${label}\n${combinedStats[i]}`);

    return (
        <Box sx={{ width: "90%" }}>
            <RadarChart
                height={320}
                series={[{ data: combinedStats, fillArea: true, hideMark: true }]}
                radar={{ max: 255, metrics: metricsWithValues }}
            />

            <Typography variant="body1" sx={{ display: "flex", justifyContent: "center" }}>
                Base Stats Total: {total}
            </Typography>
        </Box>
    )
}

export default StatsDisplay