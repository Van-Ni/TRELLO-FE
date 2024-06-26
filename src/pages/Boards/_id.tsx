import { Container } from '@mui/material';
import { AppBar } from '@components/AppBar/AppBar';
import BoardBar from './BoardBar/BoardBar';
import BoardContent from './BoardContent/BoardContent';
import { mockData } from '~/api/mock-data';
import { useEffect, useState } from 'react';
import { createNewCardAPI, createNewColumnAPI, deleteColumnDetailsAPI, fetchBoardDetailsAPI, moveCardToAnotherColumnAPI, updateBoardDetailsAPI, updateColumnDetailsAPI } from '~/api';
import { Card, CardDataRequest, Column, ColumnDataRequest, Board as IBoard } from '~/interface/Board';
import { generateCardPlaceholder } from '~/utils/formatters';
import { isEmpty } from 'lodash';
import { toast } from 'react-toastify';

export const Board = () => {

  const [board, setBoardDetails] = useState<IBoard | null>(null);

  // ========== HOOKS ============ //
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
          ...prevBoard,
          ...board.data,
          columns: updatedColumns,
        }))
      })
      .catch(err => console.error(err));
  }, [])

  // ========== FUNCTION HANDLE ============ //

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
  const moveColumns = (columnsData: Column[]) => {
    const columnIds: string[] = columnsData.map(column => column._id);
    // Update state board
    setBoardDetails((prevBoard) => ({
      ...prevBoard!,
      columnOrderIds: columnIds,
      columns: columnsData,
    }));
    // #trello: If you just need to call without receiving any data -> no need for async
    // update column order ids of board
    updateBoardDetailsAPI(board?._id as string, { columnOrderIds: columnIds });
  }

  // Delete column
  const deleteColumnDetails = (columnId: string) => {
    setBoardDetails((prevBoard) => {
      const updatedColumns = prevBoard!.columns.filter((column: Column) => column._id !== columnId);
      return {
        ...prevBoard!,
        columns: updatedColumns,
      };
    });
    deleteColumnDetailsAPI(columnId).then(res => {
      const {deleteResult} = res.data;
      toast.success(deleteResult)
    });
  }

  // Card
  const createNewCard = async (cardData: CardDataRequest) => {
    const createdCard = await createNewCardAPI({ ...cardData, boardId: board?._id as string });

    if (createdCard && createdCard.status === 201 && createdCard.data) {
      const { columnId, _id } = createdCard.data;

      const updatedColumns = board!.columns.map((column) => {
        if (column._id === columnId) {
          //check if is exist FE_Placeholder
          if (!isEmpty(column.cards) && column.cards[0].FE_Placeholder)
            column.cards.shift();
          return {
            ...column,
            cardOrderIds: [...column.cards.map((card) => card._id), _id],
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

  // Move card
  const moveCardInTheSameColumn = (cardData: Card[], cardOrderIds: string[], columnId: string) => {
    // Find the column in the board's columns array
    const updatedColumns = board!.columns.map((column) => {
      if (column._id === columnId) {
        // Update the cardOrderIds and cards array of the column
        return {
          ...column,
          cardOrderIds,
          cards: cardData,
        };
      }
      return column;
    });

    // Update the state with the updated columns
    setBoardDetails((prevBoard) => ({
      ...prevBoard!,
      columns: updatedColumns,
    }));

    // update Columns by columnId 
    updateColumnDetailsAPI(columnId, { cardOrderIds });
  };

  const moveCardToAnotherColumn = (
    currentCardId: string, prevColumnId: string, nextColumnId: string, dndOrderedColumns: Column[]) => {
    setBoardDetails((prevBoard) => ({
      ...prevBoard!,
      columns: dndOrderedColumns,
    }));

    /**
     * Update column_id of card
     * Update card_order_id of both columns
     */
    const prevColumn = dndOrderedColumns.find(c => c._id === prevColumnId);
    const nextColumn = dndOrderedColumns.find(c => c._id === nextColumnId);

    // Check if cardOrderIds of prevColumn is still exist _placeholder
    if (!isEmpty(prevColumn) && prevColumn.cardOrderIds[0].includes("_placeholder"))
      prevColumn.cardOrderIds = [];

    moveCardToAnotherColumnAPI(
      {
        currentCardId,
        prevColumnId,
        prevCardOrderIds: prevColumn ? prevColumn.cardOrderIds : [],
        nextColumnId,
        nextCardOrderIds: nextColumn ? nextColumn.cardOrderIds : []
      }
    );
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
        deleteColumnDetails={deleteColumnDetails}
        moveCardInTheSameColumn={moveCardInTheSameColumn}
        moveCardToAnotherColumn={moveCardToAnotherColumn}
      />
    </Container>
  )
}
