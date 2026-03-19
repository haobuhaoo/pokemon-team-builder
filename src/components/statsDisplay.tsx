import { Box, Typography } from "@mui/material"
import { RadarChart } from "@mui/x-charts"

import type { Stats } from "../entities/pokemon"

type Props = {
    stats: Stats[];
}

const StatsDisplay: React.FC<Props> = ({ stats }) => {
    let firstThree = [];
    let lastThree = [];
    for (let i = 0; i < 3; i++) {
        firstThree.push(stats[i].base_stat);
        lastThree.push(stats[i + 3].base_stat);
    }
    const combinedStats = firstThree.concat(lastThree.reverse());
    const total = combinedStats.reduce((sum, val) => sum + val, 0);

    const metrics = ["HP", "Attack", "Defense", "Speed", "Sp. Def", "Sp. Atk"];
    const metricsWithValues = metrics.map((label, i) => `${label}\n${combinedStats[i]}`);

    return (
        <Box sx={{ width: "60%" }}>
            <RadarChart
                height={220}
                series={[{ data: combinedStats, fillArea: true, hideMark: true }]}
                radar={{ max: 255, metrics: metricsWithValues }}
            />

            <Typography variant="body1" sx={{ display: "flex", justifyContent: "center" }}>
                Total: {total}
            </Typography>
        </Box>
    )
}

export default StatsDisplay