import { Box, Button } from "@mui/material"
import { BOARD_CONTENT_HEIGHT } from "@utils/dimensions"
import AddIcon from '@mui/icons-material/Add';
import { Column as BoardColumn } from "~/interface/Board";
import Column from "./Column/Column"
import { FC } from "react";
import { SortableContext, horizontalListSortingStrategy } from "@dnd-kit/sortable";

interface ListColumnsProps {
    columns: BoardColumn[]
}
const ListColumns: FC<ListColumnsProps> = ({ columns }) => {
    // #dndkit: Animation not working for Array of objects #183
    // https://github.com/clauderic/dnd-kit/issues/183

    return (
        // #dndkit : sortable
        //https://docs.dndkit.com/presets/sortable
        <SortableContext items={columns.map(c => c._id)} strategy={horizontalListSortingStrategy}>
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
        </SortableContext>
    )
}

export default ListColumns