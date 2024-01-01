import React, { FC } from 'react';
import { Box, Menu, MenuItem, Tooltip } from '@mui/material';
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
import { Column } from '~/interface/Board';
import { useSortable } from '@dnd-kit/sortable';

import { CSS } from '@dnd-kit/utilities';
import { Sortable } from '~/interface/Sensors';

const flexCenter = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
}

interface ColumnProps {
    column: Column
}
const Column: FC<ColumnProps> = ({ column }) => {
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
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
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
                            MenuListProps={{
                                'aria-labelledby': 'basic-button-card',
                            }}
                        >
                            <MenuItem>
                                <ListItemIcon>
                                    <AddCardIcon fontSize="small" />
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
                            <MenuItem>
                                <ListItemIcon>
                                    <DeleteOutlineIcon fontSize="small" />
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
                <Box sx={{
                    padding: '8px 8px 0',
                    ...flexCenter,
                    color: 'primary.light',
                    maxHeight: CARD_FOOTER_HEIGHT
                }}>
                    <Button variant="text" startIcon={<AddIcon />}>Add a card</Button>
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
            </Box>
        </div>
    )
}

export default Column