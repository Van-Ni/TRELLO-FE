import React from "react";
import { Box, Tooltip } from "@mui/material"
import { BAR_HEIGHT, HEADER_HEIGHT } from "../../../utils/dimensions"
import { Menu, MenuItem } from '@mui/material';
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
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import PeopleIcon from '@mui/icons-material/People';
import MessageIcon from '@mui/icons-material/Message';
import AttachmentIcon from '@mui/icons-material/Attachment';
const LIST_WIDTH = '272px'
const CARD_TITLE_HEIGHT = '44px'
const CARD_FOOTER_HEIGHT = '40px'
const BOARD_CONTENT_HEIGHT = `calc(100vh - ${HEADER_HEIGHT}px - ${BAR_HEIGHT}px)`
const flexCenter = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
}
export const BoardContent = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
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
      }}>
      {/* Box card */}
      <Box
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
            Hello
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
                <ExpandMoreIcon
                /></Button>
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
        <Box
          sx={{
            // #Trello : How do I add a margin to a CSS webkit scrollbar?
            padding: '0 5px',
            margin: '0 5px',
            overflowY: 'auto',
            maxHeight: (theme) => `calc(
              ${BOARD_CONTENT_HEIGHT} - 
              ${theme.spacing(5)} -
              ${CARD_TITLE_HEIGHT} -
              ${CARD_FOOTER_HEIGHT}
              )`,
            '& .MuiPaper-root:last-child': {
              marginBottom: '0'
            }
          }}
        >
          <Card sx={{ marginBottom: '8px' }}
          >
            <CardMedia
              sx={{ height: 140 }}
              image="https://nghenghiep.vieclam24h.vn/wp-content/uploads/2022/08/dev-la-gi-1.jpg"
              title="green iguana"
            />
            <CardContent sx={{
              padding: '8px 12px 4px',
              '&:last-child': {
                paddingBottom: '0'
              }
            }}>
              <Typography variant="subtitle1" sx={{ marginBottom: '4px' }} >
                NiDev
              </Typography>
            </CardContent>
            <CardActions sx={{ padding: '0' }}>
              <Button size="small" startIcon={<PeopleIcon />} sx={{ color: 'primary.main' }}>10</Button>
              <Button size="small" startIcon={<MessageIcon />} sx={{ color: 'primary.main' }}>20</Button>
              <Button size="small" startIcon={<AttachmentIcon />} sx={{ color: 'primary.main' }}>30</Button>
            </CardActions>
          </Card>
          <Card sx={{ marginBottom: '8px' }}>
            <CardContent sx={{
              padding: '8px 12px 4px', '&:last-child': {
                paddingBottom: '0'
              }
            }}>
              <Typography variant="subtitle1" sx={{ marginBottom: '4px' }} >
                NiDev
              </Typography>
            </CardContent>
          </Card>
          <Card sx={{ marginBottom: '8px' }}>
            <CardContent sx={{
              padding: '8px 12px 4px', '&:last-child': {
                paddingBottom: '0'
              }
            }}>
              <Typography variant="subtitle1" sx={{ marginBottom: '4px' }} >
                NiDev
              </Typography>
            </CardContent>
          </Card>
          <Card sx={{ marginBottom: '8px' }}>
            <CardContent sx={{
              padding: '8px 12px 4px', '&:last-child': {
                paddingBottom: '0'
              }
            }}>
              <Typography variant="subtitle1" sx={{ marginBottom: '4px' }} >
                NiDev
              </Typography>
            </CardContent>
          </Card>
        </Box>
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
    </Box>
  )
}
