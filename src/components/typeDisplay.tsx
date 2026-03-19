import { Box, Typography } from "@mui/material";

import { typeColor } from "../utils/typeColor";

type Props = {
    type: string;
}

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
                {type.toLocaleUpperCase()}
            </Typography>
        </Box>
    )
}

export default TypeDisplay