import { Box, Button } from "@mui/material"
import { BOARD_CONTENT_HEIGHT } from "@utils/dimensions"
import AddIcon from '@mui/icons-material/Add';
import { Column as BoardColumn } from "~/interface/Board";
import Column from "./Column/Column"
import { FC } from "react";

interface ListColumnsProps {
    columns: BoardColumn[]
}
const ListColumns: FC<ListColumnsProps> = ({ columns }) => {
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
            {columns.map((column) => <Column key={column._id} column={column} />)}

            <Button variant="contained" sx={{ backgroundColor: 'grey.500', m: 2 }} startIcon={<AddIcon />}>
                Add another list
            </Button>
        </Box>
    )
}

export default ListColumns