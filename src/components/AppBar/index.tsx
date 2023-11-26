import { Box } from '@mui/material'
import { HEADER_HEIGHT } from '@utils/dimensions'
import { ModeSelect } from '../ModeSelect'

export const AppBar = () => {
    return (
        <Box sx={{ height: HEADER_HEIGHT }}>
            <ModeSelect />
        </Box>
    )
}
