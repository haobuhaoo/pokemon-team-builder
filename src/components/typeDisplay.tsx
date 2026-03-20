import { Box, Typography } from "@mui/material";

import { typeColor } from "../utils/typeColor";

type Props = {
    type: string;
}

/**
 * Renders a single type as a styled badge.
 */
const TypeDisplay: React.FC<Props> = ({ type }) => {
    return (
        <Box
            sx={{
                backgroundColor: typeColor(type),
                borderRadius: "8px",
                padding: "5px 15px",
                width: "40%",
                display: "flex",
                justifyContent: "center"
            }}>
            <Typography
                variant="body2"
                sx={{
                    color: "#fff",
                    textShadow: "1px 1px 2px rgba(0, 0, 0, .7)"
                }}>
                {type.toUpperCase()}
            </Typography>
        </Box>
    )
}

export default TypeDisplay