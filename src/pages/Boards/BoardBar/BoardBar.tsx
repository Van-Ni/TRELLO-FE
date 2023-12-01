import { Box, Button, Chip, Tooltip } from "@mui/material"
import { BAR_HEIGHT } from "@utils/dimensions"
import DashboardIcon from '@mui/icons-material/Dashboard';
import VpnLockIcon from '@mui/icons-material/VpnLock';
import AddToDriveIcon from '@mui/icons-material/AddToDrive';
import BoltIcon from '@mui/icons-material/Bolt';
import FilterListIcon from '@mui/icons-material/FilterList';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
const MENU_STYLE = {
  color: 'primary.light',
  backgroundColor: 'transparent',
  borderRadius: '4px',
  fontSize: "14px",
  '& .MuiSvgIcon-root': {
    color: 'primary.light',
  }
}
export const BoardBar = () => {
  return (
    <Box px={2} sx={{
      height: BAR_HEIGHT,
      display: 'flex',
      alignItems: 'center',
      justifyContent: "space-between",
      backgroundColor: 'secondary.main',
    }}>
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
      }}>
        <Chip
          sx={MENU_STYLE}
          icon={<DashboardIcon />}
          label='NiDev Board' />
        <Chip
          sx={MENU_STYLE}
          icon={<VpnLockIcon />}
          label='Public/Private Workspace' />
        <Chip
          sx={MENU_STYLE}
          icon={<AddToDriveIcon />}
          label='Add to Google Drive' />
        <Chip
          sx={MENU_STYLE}
          icon={<BoltIcon />}
          label='Automation' />
        <Chip
          sx={MENU_STYLE}
          icon={<FilterListIcon />}
          label='Filter' />
      </Box>
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
      }}>
        <Button variant="outlined" sx={{ border: '1px solid #ffffff29' }} startIcon={<PersonAddIcon />}>
          Invite
          </Button>
        <AvatarGroup max={4} sx={{
          '& .css-4mccq1-MuiAvatar-root-MuiAvatarGroup-avatar': {
            width: "24px",
            height: "24px"
          },
          '& .MuiAvatarGroup-avatar:first-of-type': {
            bgcolor: 'secondary.main'
          }
        }}>
          <Tooltip title="Remy Sharp">
            <Avatar sx={{ width: 24, height: 24 }} alt="Remy Sharp" src="https://afamilycdn.com/150157425591193600/2023/4/11/photo-6-1681207470592182410370-1681216160797-1681216161679744306614.jpg" />
          </Tooltip>
          <Tooltip title="Travis Howard">
            <Avatar sx={{ width: 24, height: 24 }} alt="Travis Howard" src="/static/images/avatar/2.jpg" />
          </Tooltip>
          <Tooltip title="Cindy Baker">
            <Avatar sx={{ width: 24, height: 24 }} alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
          </Tooltip>
          <Tooltip title="Agnes Walker">
            <Avatar sx={{ width: 24, height: 24 }} alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
          </Tooltip>
          <Tooltip title="Trevor Henderson">
            <Avatar sx={{ width: 24, height: 24 }} alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
          </Tooltip>
        </AvatarGroup>
      </Box>
    </Box>
  )
}
