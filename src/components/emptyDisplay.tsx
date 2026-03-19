import { Box, Skeleton } from "@mui/material"

const EmptyDisplay: React.FC = () => {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                marginTop: "8px",
                paddingX: "16px",
                paddingBottom: "12px",
                gap: 2
            }}>
            <Box sx={{ display: "flex", width: "95%", gap: 2 }}>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        width: "45%",
                        gap: 1,
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                    <Skeleton variant="rounded" width="100%" height={150} />
                    <Skeleton variant="rounded" width="80%" height={40} />
                    <Skeleton variant="rounded" width="80%" height={40} />
                </Box>

                <Box sx={{ width: "45%" }}>
                    <Skeleton variant="rounded" width="100%" height={250} />
                </Box>

            </Box>

            <Box sx={{ width: "100%" }}>
                <Skeleton variant="rounded" width="93%" height={70} />
            </Box>
        </Box>
    )
}

export default EmptyDisplay