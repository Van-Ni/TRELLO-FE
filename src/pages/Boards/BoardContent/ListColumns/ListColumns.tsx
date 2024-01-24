import { Box, Button, TextField } from "@mui/material"
import { BOARD_CONTENT_HEIGHT, LIST_WIDTH } from "@utils/dimensions"
import AddIcon from '@mui/icons-material/Add';
import { Column as BoardColumn, CardDataRequest, ColumnDataRequest } from "~/interface/Board";
import Column from "./Column/Column"
import { FC, useState } from "react";
import { SortableContext, horizontalListSortingStrategy } from "@dnd-kit/sortable";
import CloseIcon from '@mui/icons-material/Close';
import { toast } from "react-toastify";
interface ListColumnsProps {
    columns: BoardColumn[],
    createNewColumn: (columnData: ColumnDataRequest) => Promise<void>;
    createNewCard: (cardData: CardDataRequest) => Promise<void>;

}
const ListColumns: FC<ListColumnsProps> = ({ columns, createNewColumn, createNewCard }) => {
    const [openNewColumnForm, setOpenNewColumnForm] = useState<boolean>(false);
    const [newColumnTitle, setNewColumnTitle] = useState<string>("");

    const toggleOpenNewColumnForm = () => setOpenNewColumnForm(prev => !prev);

    const addNewColumn = () => {
        if (!newColumnTitle) {
            toast.warn('Enter the column title to continue');
            return;
        }
        createNewColumn({ boardId: "", title: newColumnTitle });
        toggleOpenNewColumnForm();
        setNewColumnTitle("");
    }

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
                }}>
                {/* Box card */}
                {columns.map((column) => <Column key={column._id} column={column} createNewCard={createNewCard} />)}

                {/* Box add new column */}
                {!openNewColumnForm ? (
                    <Button variant="contained" onClick={toggleOpenNewColumnForm}
                        sx={{ backgroundColor: 'grey.500', m: 2, minWidth: LIST_WIDTH }}
                        startIcon={<AddIcon />}>
                        Add another list
                    </Button>
                ) : (
                    <Box
                        m={2}
                        sx={{
                            minWidth: LIST_WIDTH,
                            backgroundColor: 'primary.main',
                            borderRadius: '10px',
                            padding: '8px',
                        }}>
                        <TextField
                            id="outlined-search" size="small" placeholder="Enter list title..." type="text" autoFocus
                            value={newColumnTitle}
                            onChange={(e) => setNewColumnTitle(e.target.value)}
                            sx={{ width: '100%' }}
                        />
                        <Box sx={{
                            mt: 2,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 2
                        }}>
                            <Button className="btn-add"
                                variant="contained"
                                onClick={addNewColumn}
                            >
                                Add list
                            </Button>
                            <CloseIcon
                                onClick={toggleOpenNewColumnForm}
                                sx={{
                                    color: "primary.light",
                                    '&:hover': {
                                        backgroundColor: "#a6c5e229"
                                    }
                                }} />
                        </Box>
                    </Box>
                )}


            </Box>
        </SortableContext>
    )
}

export default ListColumns