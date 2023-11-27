import { Badge, Box, Button, SvgIcon, TextField, Tooltip, Typography } from '@mui/material'
import { HEADER_HEIGHT } from '@utils/dimensions'
import { ModeSelect } from '../ModeSelect'
import AppsIcon from '@mui/icons-material/Apps';
import { ReactComponent as TrelloLogo } from '@assets/trello.svg';
import { Workspace } from './Menus/Workspace';
import { Recent } from './Menus/Recent';
import { Starred } from './Menus/Starred';
import { Template } from './Menus/Template';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { Profile } from './Menus/Profiles';
// #Trello5 : https://dev.to/cassidoo/importing-svg-files-as-react-components-with-vite-l3n
export const AppBar = () => {
    return (
        <Box sx={{
            height: HEADER_HEIGHT,
            display: 'flex',
            alignItems: 'center',
            justifyContent: "space-between",
            px: 2
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
                <Workspace />
                <Recent />
                <Starred />
                <Template />
                <Button variant="contained" sx={{ backgroundColor: 'grey.500' }}>
                    Create
                </Button>
            </Box>


            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 3,
            }}>
                <TextField id="outlined-search" size="small" label="Search..." type="search" />
                <ModeSelect />
                <Tooltip title="Notifications">
                    <Badge color="secondary" variant="dot" className='c-pointer'>
                        <NotificationsNoneIcon />
                    </Badge>
                </Tooltip>
                <Tooltip title="Information">
                    <HelpOutlineIcon />
                </Tooltip>
                <Profile/>
            </Box>
        </Box>
    )
}
