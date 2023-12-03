import { Container } from '@mui/material';
import { AppBar } from '@components/AppBar/AppBar';
import BoardBar from './BoardBar/BoardBar';
import BoardContent from './BoardContent/BoardContent';
import { mockData } from '~/api/mock-data';

export const Board = () => {
  return (
    <Container maxWidth={false} sx={{
      backgroundColor: 'primary.main',
      p: "0rem !important",
    }}>
      <AppBar />
      <BoardBar
        title={mockData.board?.title}
        label={mockData.board?.type}
      />
      <BoardContent columns={mockData?.board.columns} columnOrderIds={mockData?.board.columnOrderIds} />
    </Container>
  )
}
