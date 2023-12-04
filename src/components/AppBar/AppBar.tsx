import { Badge, Box, Button, InputAdornment, SvgIcon, TextField, Tooltip, Typography } from '@mui/material'
import { HEADER_HEIGHT } from '@utils/dimensions'
import { ModeSelect } from '../ModeSelect/ModeSelect'
import AppsIcon from '@mui/icons-material/Apps';
import { ReactComponent as TrelloLogo } from '@assets/trello.svg';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import SearchIcon from '@mui/icons-material/Search';
import { Profiles, Workspace, Recent, Starred, Template } from './Menus';
// #Trello5 : https://dev.to/cassidoo/importing-svg-files-as-react-components-with-vite-l3n
export const AppBar = () => {
    return (
        <Box sx={{
            height: HEADER_HEIGHT,
            display: 'flex',
            alignItems: 'center',
            justifyContent: "space-between",
            px: 2,
            overflowX: 'auto',
            overflowY: 'hidden',
            gap: { xs: 4, md: 0 },
            borderStyle: 'solid',
            borderWidth: '1px 0',
            borderColor: '#ffffff29',
        }}>
            {/* #Trello4: svg icon  https://icon-sets.iconify.design/ */}
            <Box className="c-pointer" sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 4,
            }}>
                <AppsIcon fontSize='small' sx={{ color: 'primary.light' }} />
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                }}>
                    <SvgIcon fontSize='small' sx={{ color: 'primary.light' }} component={TrelloLogo} inheritViewBox></SvgIcon>
                    <Typography variant="h6" sx={{ color: 'primary.light', fontWeight: "500" }}>
                        Trello
                    </Typography>
                </Box>
                <Box sx={{ display: { xs: 'none', md: "flex" } }}>
                    <Workspace />
                    <Recent />
                    <Starred />
                    <Template />
                    <Button variant="contained" sx={{ backgroundColor: 'grey.500' }} startIcon={<LibraryAddIcon />}>
                        Create
                    </Button>
                </Box>
            </Box>


            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 3,
            }}>
                <TextField
                    id="outlined-search" size="small" placeholder="Search..." type="search"
                    sx={{ minWidth: '120px' }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon fontSize="small" sx={{ color: 'primary.light' }} />
                            </InputAdornment>
                        ),
                    }}
                />
                <ModeSelect />
                <Tooltip title="Notifications">
                    <Badge color="secondary" variant="dot" className='c-pointer'>
                        <NotificationsNoneIcon sx={{ color: 'primary.light' }} />
                    </Badge>
                </Tooltip>
                <Tooltip title="Information">
                    <HelpOutlineIcon sx={{ color: 'primary.light' }} />
                </Tooltip>
                <Profiles />
            </Box>
        </Box >
    )
}
