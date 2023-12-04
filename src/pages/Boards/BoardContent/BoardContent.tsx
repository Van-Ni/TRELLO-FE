import { FC, useEffect, useState } from "react";
import ListColumns from "./ListColumns/ListColumns"
import { Column } from "~/interface/Board";
import { orderArrayBasedOnAnotherArray } from "@utils/sort";
import { DndContext, DragEndEvent, MouseSensor, TouchSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove } from "@utils/arrayMove";


interface BoardContentProps {
  columns: Column[];
  columnOrderIds: string[]
}
const BoardContent: FC<BoardContentProps> = ({ columns, columnOrderIds }) => {
  const [orderedColumns, setOrderedColumns] = useState<Column[]>([]);

  // #dndkit: useSensor
  const mouseSensor = useSensor(MouseSensor, {
    // Require the mouse to move by 10 pixels before activating
    activationConstraint: {
      //the mouse needs to be moved before a drag start event is emitted.
      distance: 10,
      //xác định khoảng cách, tính bằng pixel, mà người dùng có thể di chuyển trước khi thao tác kéo bị hủy bỏ.
      tolerance: 500
    },
  });
  const touchSensor = useSensor(TouchSensor, {
    // Press delay of 250ms, with tolerance of 5px of movement
    activationConstraint: {
      delay: 250,
      //xác định khoảng cách, tính bằng pixel, mà người dùng có thể di chuyển trước khi thao tác kéo bị hủy bỏ.
      tolerance: 5,
    },
  });
  const sensors = useSensors(
    mouseSensor,
    touchSensor
  );

  useEffect(() => {
    // sort column order
    setOrderedColumns(orderArrayBasedOnAnotherArray<Column>(columns, columnOrderIds, '_id'))
  }, [columns]);
  // function handles
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    console.log(event);

    if (active.id !== over?.id) {
      setOrderedColumns((items: Column[]) => {
        const oldIndex: number = items.findIndex((item) => item._id === active?.id);
        const newIndex: number = items.findIndex((item) => item._id === over?.id);
        // #dndkit: dnd-kit/packages/sortable/src/utilities
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }
  return (
    /** #dndkit : Context provider
     * https://docs.dndkit.com/introduction/getting-started#context-provider
     */
    <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
      <ListColumns columns={orderedColumns} />
    </DndContext>
  )
}

export default BoardContent;
