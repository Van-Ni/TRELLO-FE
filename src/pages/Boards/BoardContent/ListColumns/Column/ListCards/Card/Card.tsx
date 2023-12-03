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
import { Card } from '~/interface/Board';
import { FC } from 'react';


interface CardProps {
    card: Card
}
const Card: FC<CardProps> = ({ card }) => {
    const { cover, memberIds, comments, attachments } = card;

    const hasCardActions = (): boolean => {
        return Array.isArray(memberIds) && memberIds.length > 0
            || Array.isArray(comments) && comments.length > 0
            || Array.isArray(attachments) && attachments.length > 0;
    };
    return (
        <MuiCard sx={{ marginBottom: '8px' }}
        >
            {cover && <CardMedia
                sx={{ height: 140 }}
                image={cover}
                title="green iguana"
            />}
            <CardContent sx={{
                padding: '8px 12px 4px',
                '&:last-child': {
                    paddingBottom: '0'
                }
            }}>
                <Typography variant="subtitle1" sx={{ marginBottom: '4px' }} >
                    {card.title}
                </Typography>
            </CardContent>
            {hasCardActions() && <CardActions sx={{ padding: '0' }}>
                {!!memberIds.length && <Button size="small" startIcon={<PeopleIcon />} sx={{ color: 'primary.main' }}>{memberIds.length}</Button>}
                {!!comments.length && <Button size="small" startIcon={<MessageIcon />} sx={{ color: 'primary.main' }}>{comments.length}</Button>}
                {!!attachments.length && <Button size="small" startIcon={<AttachmentIcon />} sx={{ color: 'primary.main' }}>{attachments.length}</Button>}
            </CardActions>}
        </MuiCard>
    )
}

export default Card