import { Box, Skeleton } from "@mui/material";

/**
 * Provides a visual placeholder.
 */
const EmptyDisplay: React.FC = () => {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                marginTop: "8px",
                paddingX: "16px",
                paddingBottom: "12px",
                gap: 2.5
            }}>

            <Skeleton variant="rounded" width="100%" height={70} style={{ marginTop: "8px" }} />

            <Box sx={{ display: "flex", width: "100%", gap: 2, justifyContent: "center" }}>
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

                <Skeleton variant="rounded" width="45%" height={250} />
            </Box>

            <Skeleton variant="rounded" width="100%" height={70} />
        </Box>
    )
}

export default EmptyDisplay