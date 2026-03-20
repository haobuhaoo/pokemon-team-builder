import { Box, Typography } from "@mui/material";

import type { Abilities } from "../entities/pokemon";

type Props = {
    ability: Abilities[];
}

const AbilityDisplay: React.FC<Props> = ({ ability }) => {
    return (
        <Box sx={{ display: "flex", flexDirection: "column" }}>
            {ability?.map((ability, index) => (
                <Typography
                    key={index + 1}
                    sx={{
                        whiteSpace: "normal",
                        wordBreak: "break-word",
                        textTransform: "capitalize"
                    }}>
                    {(index + 1) + ". " + ability.ability.name + (ability.is_hidden ? " (hidden)" : "")}
                </Typography>
            ))}
        </Box>
    )
}

export default AbilityDisplay