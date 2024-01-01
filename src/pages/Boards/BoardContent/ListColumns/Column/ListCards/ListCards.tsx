import { Box } from '@mui/material';
import { BOARD_CONTENT_HEIGHT, CARD_FOOTER_HEIGHT, CARD_TITLE_HEIGHT } from "@utils/dimensions"
import Card from './Card/Card';
import { Card as ICard } from '~/interface/Board';
import { FC } from 'react';
import { orderArrayBasedOnAnotherArray } from '@utils/sort';
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";

interface ListCardsProps {
    cards: ICard[];
    cardOrderIds: string[]
}
const ListCards: FC<ListCardsProps> = ({ cards, cardOrderIds }) => {
    const orderedCards = orderArrayBasedOnAnotherArray(cards, cardOrderIds, '_id');
    return (
        <SortableContext items={cards.map(c => c._id)} strategy={verticalListSortingStrategy}>
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
                {orderedCards.map(card => <Card key={card._id} card={card} />)}
            </Box>
        </SortableContext>
    )
}

export default ListCards