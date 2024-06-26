import React, { FC, useState } from 'react';
import { Box, Menu, MenuItem, TextField, Tooltip } from '@mui/material';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import AddCardIcon from '@mui/icons-material/AddCard';
import ContentCut from '@mui/icons-material/ContentCut';
import ContentCopy from '@mui/icons-material/ContentCopy';
import ContentPaste from '@mui/icons-material/ContentPaste';
import Cloud from '@mui/icons-material/Cloud';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddIcon from '@mui/icons-material/Add';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { BOARD_CONTENT_HEIGHT, CARD_FOOTER_HEIGHT, CARD_TITLE_HEIGHT, LIST_WIDTH } from "@utils/dimensions"
import ListCards from './ListCards/ListCards';
import { CardDataRequest, Column } from '~/interface/Board';
import { useSortable } from '@dnd-kit/sortable';
import CloseIcon from '@mui/icons-material/Close';
import { CSS } from '@dnd-kit/utilities';
import { Sortable } from '~/interface/Sensors';
import { toast } from 'react-toastify';
import { useConfirm } from 'material-ui-confirm';

const flexCenter = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
}

interface ColumnProps {
    column: Column,
    createNewCard?: (cardData: CardDataRequest) => Promise<void>;
    deleteColumnDetails?: (columnId: string) => void;
}
const Column: FC<ColumnProps> = ({
    column,
    createNewCard,
    deleteColumnDetails
}) => {
    // #dndkit: useSortable
    // https://docs.dndkit.com/presets/sortable/usesortable#usage
    const sortable: Sortable = useSortable({
        id: column._id,
        data: { ...column }
    });

    // console.log("sortable", sortable);

    const dndkitColumnStyle = {
        // #dndkit: prevent scrolling on mobile devices. ( ISSUE: can't scroll )
        //https://docs.dndkit.com/api-documentation/sensors/pointer#touch-action
        touchAction: 'none',
        // #dndkit: stretched when dragged
        // https://github.com/clauderic/dnd-kit/issues/117 CSS.Transfrom -> CSS.Translate
        transform: CSS.Translate.toString(sortable.transform),
        transition: sortable.transition,
        opacity: sortable.isDragging ? 0.5 : undefined,
    };

    const { title, cards, cardOrderIds } = column;
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [openNewCardForm, setOpenNewCardForm] = useState<boolean>(false);
    const [newCardTitle, setNewCardTitle] = useState<string>("");
    const confirmDeleteColumn = useConfirm();

    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const toggleOpenNewCardForm = () => setOpenNewCardForm(prev => !prev);
    const addNewCard = () => {
        if (!newCardTitle) {
            toast.warn("Enter the card title to continue");
            return;
        }
        createNewCard?.({ title: newCardTitle, columnId: column._id, boardId: "" })
        toggleOpenNewCardForm();
        setNewCardTitle("");
    }


    const handleDeleteColumn = () => {
        confirmDeleteColumn({
            //Locally
            title: "Delete Column?",
            content: `Type 'Delete ${column.title} column' to delete it permanently. Are you sure?`,
            confirmationKeyword: `Delete ${column.title} column`,
        })
            .then(() => {
                /* ... */
                deleteColumnDetails?.(column._id);
            })
            .catch(() => {
                /* ... */
            });
    };
    return (
        // #dndkit : lỗi chiều cao -> không thể kéo từ trái sang
        // fix: wrap div
        <div
            style={{ ...dndkitColumnStyle, height: '100%' }}
            ref={sortable.setNodeRef}
            {...sortable.attributes}

        >
            {/* Box card */}
            <Box
                // #dndkit: lắng nghe sự kiện trên Box
                {...sortable.listeners}
                m={2}
                sx={{
                    width: LIST_WIDTH,
                    maxHeight: (theme) => `calc(${BOARD_CONTENT_HEIGHT} - ${theme.spacing(5)})`,
                    backgroundColor: 'primary.main',
                    borderRadius: '10px',
                }}>

                {/* Box header */}
                <Box sx={{
                    padding: '8px 8px 0',
                    ...flexCenter,
                    color: 'primary.light',
                    maxHeight: CARD_TITLE_HEIGHT
                }}>
                    <Typography variant="h6" sx={{ fontSize: '1rem' }}>
                        {title}
                    </Typography>
                    <div>
                        <Tooltip title="More options">
                            <Button variant="text"
                                id="basic-button-card"
                                aria-controls={open ? 'basic-menu-card' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleClick}
                                sx={{
                                    color: 'primary.light',
                                    minWidth: '20px',
                                    minHeight: '20px',
                                }}
                            >
                                <ExpandMoreIcon />
                            </Button>
                        </Tooltip>
                        <Menu
                            id="basic-menu-card"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            onClick={handleClose}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button-card',
                            }}
                        >
                            <MenuItem
                                sx={{
                                    "&:hover": {
                                        color: "#48a948",
                                        "& .add-card-icon": {
                                            color: "#48a948",
                                        }
                                    }
                                }}
                                onClick={toggleOpenNewCardForm}>
                                <ListItemIcon>
                                    <AddCardIcon className='add-card-icon' fontSize="small" />
                                </ListItemIcon>
                                <ListItemText>Add new card</ListItemText>
                            </MenuItem>
                            <MenuItem>
                                <ListItemIcon>
                                    <ContentCut fontSize="small" />
                                </ListItemIcon>
                                <ListItemText>Cut</ListItemText>
                            </MenuItem>
                            <MenuItem>
                                <ListItemIcon>
                                    <ContentCopy fontSize="small" />
                                </ListItemIcon>
                                <ListItemText>Copy</ListItemText>
                            </MenuItem>
                            <MenuItem>
                                <ListItemIcon>
                                    <ContentPaste fontSize="small" />
                                </ListItemIcon>
                                <ListItemText>Paste</ListItemText>
                            </MenuItem>
                            <Divider />
                            <MenuItem
                                sx={{
                                    "&:hover": {
                                        color: "warning.dark",
                                        "& .delete-forever-icon": {
                                            color: "warning.dark",
                                        }
                                    }
                                }}
                                onClick={handleDeleteColumn}>
                                <ListItemIcon>
                                    <DeleteOutlineIcon className='delete-forever-icon' fontSize="small" />
                                </ListItemIcon>
                                <ListItemText>Remove this list</ListItemText>
                            </MenuItem>
                            <MenuItem>
                                <ListItemIcon>
                                    <Cloud fontSize="small" />
                                </ListItemIcon>
                                <ListItemText>Archive this list</ListItemText>
                            </MenuItem>
                        </Menu>
                    </div>
                </Box>
                {/* Box content */}
                <ListCards cards={cards} cardOrderIds={cardOrderIds} />
                {/* Box footer */}

                {!openNewCardForm ? (
                    <Box sx={{
                        padding: '8px 8px 0',
                        ...flexCenter,
                        color: 'primary.light',
                        maxHeight: CARD_FOOTER_HEIGHT
                    }}>
                        <Button
                            sx={{ color: "primary.light" }}
                            onClick={toggleOpenNewCardForm}
                            variant="text" startIcon={<AddIcon />}>
                            Add a card
                        </Button>
                        <Tooltip title="Move card">
                            <Button sx={{
                                color: 'primary.light',
                                minWidth: '20px',
                                minHeight: '20px',
                            }}>
                                <DragHandleIcon />
                            </Button>
                        </Tooltip>
                    </Box>
                ) : (
                    <Box sx={{
                        padding: '8px 5px 5px',
                        color: 'primary.light',
                        margin: '0 5px',
                        // height: CARD_FOOTER_HEIGHT   
                    }}>
                        <TextField
                            id="outlined-search" size="small" placeholder="Enter a title for this card..." type="text" autoFocus
                            value={newCardTitle}
                            multiline={true}
                            rows={4}
                            onChange={(e) => setNewCardTitle(e.target.value)}
                            sx={{ width: '100%' }}
                            data-no-dnd="true"
                        />
                        <Box sx={{
                            mt: 2,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 2
                        }}>
                            <Button className="btn-add"
                                variant="contained"
                                onClick={addNewCard}
                            >
                                Add card
                            </Button>
                            <CloseIcon
                                onClick={toggleOpenNewCardForm}
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
        </div>
    )
}

export default Column