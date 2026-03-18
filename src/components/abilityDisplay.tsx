import { Box, Typography } from "@mui/material";

import type { Abilities } from "../entities/pokemon";

type Props = {
    ability: Abilities[];
}

const AbilityDisplay: React.FC<Props> = ({ ability }) => {
    let count = 0;
    const display = (ability: Abilities) => {
        count++;
        return (
            <Typography key={count} sx={{ whiteSpace: "normal", wordBreak: "break-word", textTransform: "capitalize" }}>
                {count + ". " + ability.ability.name + (ability.is_hidden ? " (hidden)" : "")}
            </Typography>
        )
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "column" }}>
            {ability.map(a => display(a))}
        </Box>
    )
}

export default AbilityDisplay