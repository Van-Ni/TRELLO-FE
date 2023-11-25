import { Box } from "@mui/material"
import { BAR_HEIGHT, HEADER_HEIGHT } from "../../../utils/dimensions"

export const BoardContent = () => {
  return (
    <Box sx={{ height: `calc(100vh - ${HEADER_HEIGHT}px - ${BAR_HEIGHT}px)` }}>
      Content
    </Box>
  )
}
