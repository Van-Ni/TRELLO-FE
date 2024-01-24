import { Container } from '@mui/material';
import { AppBar } from '@components/AppBar/AppBar';
import BoardBar from './BoardBar/BoardBar';
import BoardContent from './BoardContent/BoardContent';
import { mockData } from '~/api/mock-data';
import { useEffect, useState } from 'react';
import { createNewCardAPI, createNewColumnAPI, fetchBoardDetailsAPI, updateBoardDetailsAPI } from '~/api';
import { CardDataRequest, Column, ColumnDataRequest, Board as IBoard } from '~/interface/Board';
import { generateCardPlaceholder } from '~/utils/formatters';
import { isEmpty } from 'lodash';

export const Board = () => {

  const [board, setBoardDetails] = useState<IBoard | null>(null);

  useEffect(() => {
    fetchBoardDetailsAPI("65a536385a0aaa9ce290a65a")
      .then((board: any) => {
        console.log("board", board);
        const updatedColumns = board?.data?.columns || [];

        // Generate placeholder cards for columns with empty cards array
        updatedColumns.forEach((column: any) => {
          if (isEmpty(column.cards)) {
            const placeholderCard = generateCardPlaceholder(column);
            column.cards = [placeholderCard];
            column.cardOrderIds = [placeholderCard._id];
          }
        });
        console.log('updatedColumns', updatedColumns);

        setBoardDetails((prevBoard) => ({
          ...board.data,
          columns: updatedColumns,
        }))
      })
      .catch(err => console.error(err));
  }, [])

  // Column
  const createNewColumn = async (columnData: ColumnDataRequest) => {
    const createdColumn = await createNewColumnAPI({ ...columnData, boardId: board?._id as string });
    // create generateCardPlaceholder
    const placeholderCard = generateCardPlaceholder(createdColumn.data);
    createdColumn.data.cards = [placeholderCard];
    createdColumn.data.cardOrderIds = [placeholderCard._id];

    // check to set state
    if (createdColumn && createdColumn.status === 201) {
      const updatedColumns = [...board!.columns, createdColumn.data];
      const updatedColumnOrderIds = [...board!.columnOrderIds, createdColumn.data._id];

      setBoardDetails((prevBoard) => ({
        ...prevBoard!,
        columns: updatedColumns,
        columnOrderIds: updatedColumnOrderIds,
      }));
    }
  }
  // Move column 
  const moveColumns = async (columnsData: Column[]) => {
    const columnIds: string[] = columnsData.map(column => column._id);
    // Update state board
    setBoardDetails((prevBoard) => ({
      ...prevBoard!,
      columnOrderIds: columnIds,
      columns: columnsData,
    }));
    // update column order ids of board
    await updateBoardDetailsAPI(board?._id as string, { columnOrderIds: columnIds });
  }
  // Card
  const createNewCard = async (cardData: CardDataRequest) => {
    const createdCard = await createNewCardAPI({ ...cardData, boardId: board?._id as string });

    if (createdCard && createdCard.status === 201 && createdCard.data) {
      const { columnId } = createdCard.data;

      const updatedColumns = board!.columns.map((column) => {
        if (column._id === columnId) {
          return {
            ...column,
            cards: [...column.cards, createdCard.data],
          };
        }
        return column;
      });

      setBoardDetails((prevBoard) => ({
        ...prevBoard!,
        columns: updatedColumns,
      }));
    }
  }


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
      <BoardContent
        columns={board?.columns || []}
        columnOrderIds={board?.columnOrderIds || []}
        createNewColumn={createNewColumn}
        createNewCard={createNewCard}
        moveColumns={moveColumns}
      />
    </Container>
  )
}
