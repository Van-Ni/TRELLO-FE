import { FC } from "react";
import ListColumns from "./ListColumns/ListColumns"
import { Column } from "~/interface/Board";
import { orderArrayBasedOnAnotherArray } from "@utils/sort";


interface BoardContentProps {
  columns: Column[];
  columnOrderIds: string[]
}
const BoardContent: FC<BoardContentProps> = ({ columns, columnOrderIds }) => {

  // sort column order
  const orderedColumns = orderArrayBasedOnAnotherArray(columns, columnOrderIds, '_id');

  return (
    <ListColumns columns={orderedColumns} />
  )
}

export default BoardContent;
