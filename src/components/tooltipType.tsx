import { Box, Typography } from "@mui/material";

import type { TypeAnalysis } from "../entities/types";

type Props = {
    isStrong: boolean;
    type: string;
    value: TypeAnalysis;
}

const TooltipType: React.FC<Props> = ({ isStrong, type, value }) => {
    return (
        <Box sx={{ display: "flex", flexDirection: "column" }}>
            {isStrong
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
    )
}

export default TooltipType