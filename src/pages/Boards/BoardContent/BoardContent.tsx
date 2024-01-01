import { FC, useEffect, useState } from "react";
import ListColumns from "./ListColumns/ListColumns"
import { Card as ICard, Column as IColumn } from "~/interface/Board";
import { orderArrayBasedOnAnotherArray } from "@utils/sort";
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, DropAnimation, MouseSensor, TouchSensor, defaultDropAnimationSideEffects, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove } from "@utils/arrayMove";
import Card from "./ListColumns/Column/ListCards/Card/Card";
import Column from "./ListColumns/Column/Column";


interface BoardContentProps {
  columns: Column[];
  columnOrderIds: string[]
}

const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: "ACTIVE_DRAG_ITEM_COLUMN" as const,
  CARD: "ACTIVE_DRAG_ITEM_CARD" as const,
};
const BoardContent: FC<BoardContentProps> = ({ columns, columnOrderIds }) => {
  // columns is ordered by order ids
  const [orderedColumns, setOrderedColumns] = useState<Column[]>([]);

  /** #dndkit: Drag Overlay
   *  https://docs.dndkit.com/api-documentation/draggable/drag-overlay
   */

  // set drag item id to overlay column | card by id
  const [activeDragItemId, setActiveDragItemId] = useState<string | number>("");
  // set drag item id to overlay column | card by type
  const [activeDragItemType, setActiveDragItemType] = useState<string>();
  //  data to render overlay 
  const [activeDragItemData, setActiveDragItemData] = useState<IColumn | ICard>();

  const dropAnimation: DropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: {
          opacity: '0.5',
        },
      },
    }),
  };
  // #dndkit: ActiveDragItemType
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
      tolerance: 500,
    },
  });
  const sensors = useSensors(
    mouseSensor,
    touchSensor
  );

  useEffect(() => {
    // sort column order
    setOrderedColumns(orderArrayBasedOnAnotherArray<IColumn>(columns, columnOrderIds, '_id'))
  }, [columns]);


  //==== function handles ==== //
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    console.log("end event", event);

    if (active.id !== over?.id) {
      setOrderedColumns((items: Column[]) => {
        const oldIndex: number = items.findIndex((item) => item._id === active?.id);
        const newIndex: number = items.findIndex((item) => item._id === over?.id);
        console.log("oldIndex", oldIndex, "newIndex", newIndex);
        // #dndkit: dnd-kit/packages/sortable/src/utilities
        return arrayMove(items, oldIndex, newIndex);
      });

      // when drop remove state to make drag overlay
      setActiveDragItemId("");
      setActiveDragItemType("");
      setActiveDragItemData(undefined)
    }
  }

  const handleDragStart = (event: DragStartEvent) => {
    const { data, id } = event.active;
    console.log("start event: ", event);
    setActiveDragItemId(id);
    setActiveDragItemType(data?.current?.columnId ? ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.COLUMN)
    setActiveDragItemData(data?.current as IColumn | ICard)
  }

  console.log(activeDragItemData);

  return (
    /** #dndkit : Context provider
     * https://docs.dndkit.com/introduction/getting-started#context-provider
     */
    <DndContext
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
      sensors={sensors}>
      <ListColumns columns={orderedColumns} />

      {/* #dndkit: Drag Overlay */}
      <DragOverlay dropAnimation={dropAnimation}>
        {activeDragItemId && activeDragItemType && activeDragItemData &&
          (() => {
            switch (activeDragItemType) {
              case ACTIVE_DRAG_ITEM_TYPE.CARD:
                return <Card card={activeDragItemData as ICard} />;
              case ACTIVE_DRAG_ITEM_TYPE.COLUMN:
                return <Column column={activeDragItemData as IColumn} />;
              default:
                return null;
            }
          })()}
      </DragOverlay>

    </DndContext>
  )
}

export default BoardContent;
