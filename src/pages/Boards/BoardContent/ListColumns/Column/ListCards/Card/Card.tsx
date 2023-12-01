// #Trello: How to import MUI component in different name?
import { Card as MuiCard } from '@mui/material';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import PeopleIcon from '@mui/icons-material/People';
import MessageIcon from '@mui/icons-material/Message';
import AttachmentIcon from '@mui/icons-material/Attachment';
export const Card = () => {
    return (
        <MuiCard sx={{ marginBottom: '8px' }}
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
        </MuiCard>
    )
}
