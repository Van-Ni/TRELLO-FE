import { Container } from '@mui/material';
import { AppBar } from '@components/AppBar/AppBar';
import BoardBar from './BoardBar/BoardBar';
import BoardContent from './BoardContent/BoardContent';
import { mockData } from '~/api/mock-data';
import { useEffect, useState } from 'react';
import { fetchBoardDetailsAPI } from '~/api';
import { Board as IBoard } from '~/interface/Board';

export const Board = () => {

  const [board, setBoardDetails] = useState<IBoard | null>(null);

  useEffect(() => {
    fetchBoardDetailsAPI("65a536385a0aaa9ce290a65a")
      .then((board: any) => {
        console.log(board);
        setBoardDetails(board?.data);
      })
      .catch(err => console.error(err));
  }, [])
  return (
    <Container maxWidth={false} sx={{
      backgroundColor: 'primary.main',
      p: "0rem !important",
    }}>
      <AppBar />
      <BoardBar
        title={board?.title}
        label={board?.type}
      />
      <BoardContent columns={mockData?.board.columns} columnOrderIds={mockData?.board.columnOrderIds} />
    </Container>
  )
}
