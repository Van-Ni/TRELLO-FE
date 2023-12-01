import { Box, Button } from "@mui/material"
import { BOARD_CONTENT_HEIGHT } from "@utils/dimensions"
import { Column } from "./Column/Column"
import AddIcon from '@mui/icons-material/Add';
export const ListColumns = () => {
    return (
        <Box
            p={2}
            sx={{
                height: BOARD_CONTENT_HEIGHT,
                backgroundColor: 'secondary.light',
                display: 'flex',
                alignItems: 'start',
                overflow: 'auto hidden',
                '&::-webkit-scrollbar': {
                    height: '10px',
                },
                '&::-webkit-scrollbar-track': {
                    mx: 2
                },
            }}>s
            {/* Box card */}
            <Column />
            <Button variant="contained" sx={{ backgroundColor: 'grey.500', m: 2 }} startIcon={<AddIcon />}>
                Add another list
            </Button>
        </Box>
    )
}
