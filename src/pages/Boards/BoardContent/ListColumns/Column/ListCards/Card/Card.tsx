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
import { Sortable } from '~/interface/Sensors';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface CardProps {
    card: Card
}
const Card: FC<CardProps> = ({ card }) => {

    // #dndkit: useSortable
    // https://docs.dndkit.com/presets/sortable/usesortable#usage
    const sortable: Sortable = useSortable({
        id: card._id,
        data: { ...card }
    });

    const dndkitCardStyle = {
        // #dndkit: prevent scrolling on mobile devices. 
        //https://docs.dndkit.com/api-documentation/sensors/pointer#touch-action
        touchAction: 'none',
        // #dndkit: stretched when dragged
        // https://github.com/clauderic/dnd-kit/issues/117 CSS.Transfrom -> CSS.Translate
        transform: CSS.Translate.toString(sortable.transform),
        transition: sortable.transition,
        opacity: sortable.isDragging ? 0.5 : undefined,
        border: sortable.isDragging ? "1px solid #00fff1" : ""
    };

    const { cover, memberIds, comments, attachments } = card;

    const hasCardActions = (): boolean => {
        return Array.isArray(memberIds) && memberIds.length > 0
            || Array.isArray(comments) && comments.length > 0
            || Array.isArray(attachments) && attachments.length > 0;
    };
    return (
        <MuiCard
            sx={{
                marginBottom: '8px',
                boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
                visibility: card?.FE_Placeholder ? 'hidden' : 'unset',
                height: card?.FE_Placeholder ? 0 : 'auto',
                // pointerEvents: card?.FE_Placeholder ? 'none' : 'unset',
            }}
            style={dndkitCardStyle}
            ref={sortable.setNodeRef}
            {...sortable.attributes}
            {...sortable.listeners}
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