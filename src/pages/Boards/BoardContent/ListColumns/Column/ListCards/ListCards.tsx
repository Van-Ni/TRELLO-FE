import { Box } from '@mui/material';
import { BOARD_CONTENT_HEIGHT, CARD_FOOTER_HEIGHT, CARD_TITLE_HEIGHT } from "@utils/dimensions"
import { Card } from './Card/Card';

export const ListCards = () => {
    return (
        <>
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
                <Card/>
                <Card/>
            </Box>
        </>
    )
}
