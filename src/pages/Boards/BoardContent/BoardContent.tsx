import { FC, useEffect, useState } from "react";
import ListColumns from "./ListColumns/ListColumns"
import { Card as ICard, Column as IColumn } from "~/interface/Board";
import { orderArrayBasedOnAnotherArray } from "@utils/sort";
import {
  DndContext, DragEndEvent, DragOverlay, DragStartEvent, DragOverEvent,
  DropAnimation, MouseSensor, TouchSensor, defaultDropAnimationSideEffects,
  useSensor, useSensors, closestCorners
} from "@dnd-kit/core";
import { arrayMove } from "@utils/arrayMove";
import Card from "./ListColumns/Column/ListCards/Card/Card";
import Column from "./ListColumns/Column/Column";
import { findColumnByCardId } from "@utils/search";
//#package : lodash
// fix : install @types/lodash
import { cloneDeep } from "lodash";

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

    // Tạm thời chưa làm gì
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return;

    const { active, over } = event;
    // console.log("end event", event);

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
    const { data: { current }, id } = event.active;
    // console.log("start event: ", event);
    setActiveDragItemId(id);
    setActiveDragItemType(current?.columnId ? ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.COLUMN)
    setActiveDragItemData(current as IColumn | ICard)
  }

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    // fix case: when drag out container
    if (!active || !over) return;
    console.log("over event: ", event);

    const { id: activeDraggingCardId, data: { current: activeDraggingCardData } } = active;
    const { id: overCardId } = over;

    const activeColumn = findColumnByCardId(orderedColumns, activeDraggingCardId as string);
    const overColumn = findColumnByCardId(orderedColumns, overCardId as string);

    if (!activeColumn || !overColumn) return;

    if (activeColumn._id !== overColumn._id) {
      setOrderedColumns(preColumns => {
        const overCardIndex = overColumn?.cards.findIndex(c => c?._id === overCardId.toString());

        //logic tính toán "cardIndex mới" (trên hoặc dưới của overCard)
        let newCardIndex: number;
        const isBelowOverItem =
          active.rect.current.translated &&
          active.rect.current.translated.top >
          over.rect.top + over.rect.height;
        const modifier = isBelowOverItem ? 1 : 0;

        newCardIndex =
          overCardIndex >= 0 ? overCardIndex + modifier : overColumn?.cards.length + 1;

        // shallow copy preColumns and re setState
        const nextColumns: IColumn[] = cloneDeep(preColumns);
        const nextActiveColumn = nextColumns.find(column => column._id === activeColumn._id)
        const nextOverColumn = nextColumns.find(column => column._id === overColumn._id)

        // old column
        if (nextActiveColumn) {
          nextActiveColumn.cards = nextActiveColumn.cards.filter(card => card._id !== activeDraggingCardId);
          nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map(card => card._id);
        }
        // new column
        if (nextOverColumn) {
          console.log("newCardIndex",newCardIndex);//
          // remove card if it exists
          nextOverColumn.cards = nextOverColumn.cards.filter(card => card._id !== activeDraggingCardId);
          nextOverColumn.cards.splice(newCardIndex, 0, activeDraggingCardData as ICard);
          nextOverColumn.cardOrderIds = nextOverColumn.cards.map(c => c._id);
        }
        // set state
        return nextColumns;
      })
    }
  }
  console.log("orderedColumns", orderedColumns);
  
  return (
    /** #dndkit : Context provider
     * https://docs.dndkit.com/introduction/getting-started#context-provider
     */
    <DndContext
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      sensors={sensors}
      /** #dndkit: Collision detection algorithms
       *  When should I use the closest corners algorithm instead of closest center?
       */
      collisionDetection={closestCorners}
      >
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
