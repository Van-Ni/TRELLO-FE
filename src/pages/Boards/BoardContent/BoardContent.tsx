import { FC, useCallback, useEffect, useState } from "react";
import ListColumns from "./ListColumns/ListColumns"
import { Card as ICard, Column as IColumn } from "~/interface/Board";
import { orderArrayBasedOnAnotherArray } from "@utils/sort";
import {
  DndContext, DragEndEvent, DragOverlay, DragStartEvent, DragOverEvent,
  DropAnimation, defaultDropAnimationSideEffects,
  useSensor, useSensors, closestCorners, Active, Over,  pointerWithin, CollisionDetection, rectIntersection
} from "@dnd-kit/core";
import { arrayMove } from "@utils/arrayMove";
import Card from "./ListColumns/Column/ListCards/Card/Card";
import Column from "./ListColumns/Column/Column";
import { findColumnByCardId } from "@utils/search";
//#package : lodash
// fix : install @types/lodash
import { cloneDeep, isEmpty } from "lodash";
import { genertateCardPlaceholder } from "@utils/formatters";
import { MouseSensor, TouchSensor } from "~/customLibrary/DndkitSensors";

interface BoardContentProps {
  columns: IColumn[];
  columnOrderIds: string[]
}

const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: "ACTIVE_DRAG_ITEM_COLUMN" as const,
  CARD: "ACTIVE_DRAG_ITEM_CARD" as const,
};
const BoardContent: FC<BoardContentProps> = ({ columns, columnOrderIds }) => {
  // columns is ordered by order ids
  const [orderedColumns, setOrderedColumns] = useState<IColumn[]>([]);

  /** #dndkit: Drag Overlay
   *  https://docs.dndkit.com/api-documentation/draggable/drag-overlay
   */

  // set drag item id to overlay column | card by id
  const [activeDragItemId, setActiveDragItemId] = useState<string | number>("");
  // set drag item id to overlay column | card by type
  const [activeDragItemType, setActiveDragItemType] = useState<string>();
  //  data to render overlay 
  const [activeDragItemData, setActiveDragItemData] = useState<IColumn | ICard>();
  //  set state when dragging card -> event DragStart
  const [oldColumnWhenDraggingCard, setOldColumnWhenDraggingCard] = useState<IColumn>();

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

  // # ORDER 1
  const handleDragStart = (event: DragStartEvent) => {
    const { data, id } = event.active;
    const current = data.current;

    console.log(" ### 🏝🏝🏝 start event ### ", event);
    setActiveDragItemId(id);

    if (current) {
      // dragging card
      if (current.columnId) {
        // set state CARD
        setActiveDragItemType(ACTIVE_DRAG_ITEM_TYPE.CARD);
        setActiveDragItemData(current as ICard);
        // set old column when dragging card 
        const oldColumn = findColumnByCardId(orderedColumns, id as string);
        setOldColumnWhenDraggingCard(oldColumn);
      }
      // dragging column
      else {
        // set state COLUMN 
        setActiveDragItemType(ACTIVE_DRAG_ITEM_TYPE.COLUMN);
        setActiveDragItemData(current as IColumn);
      }
    }
  };

  // # ORDER 2
  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    // fix case: when drag out container
    if (!active || !over) return;
    console.log(" ### 🧠🧠🧠 over event ### ", event);

    const { id: activeDraggingCardId, data: { current: activeDraggingCardData } } = active;
    const { id: overCardId } = over;

    const activeColumn = findColumnByCardId(orderedColumns, activeDraggingCardId as string);
    const overColumn = findColumnByCardId(orderedColumns, overCardId as string);

    if (!activeColumn || !overColumn) return;

    if (activeColumn._id !== overColumn._id) {
      moveCardBetweenDifferentColumns(
        activeColumn,
        overColumn,
        overCardId.toString(),
        active,
        over,
        activeDraggingCardId,
        activeDraggingCardData as ICard
      )
    }
  }

  // # ORDER 3
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!active || !over) return;
    console.log(" ### 🚥🚥🚥 end event ###", event);

    // # DROP COLUMN 
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
      if (active.id !== over?.id) {
        console.log("setOrderedColumns");
        setOrderedColumns((items: Column[]) => {
          const oldIndex: number = items.findIndex((item) => item._id === active?.id);
          const newIndex: number = items.findIndex((item) => item._id === over?.id);
          console.log("oldIndex", oldIndex, "newIndex", newIndex);
          // #dndkit: dnd-kit/packages/sortable/src/utilities
          return arrayMove(items, oldIndex, newIndex);
        });
      }
    }
    // # DROP CARD 
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
      const { id: activeDraggingCardId, data: { current: activeDraggingCardData } } = active;
      const { id: overCardId } = over;

      const activeColumn = findColumnByCardId(orderedColumns, activeDraggingCardId as string);
      const overColumn = findColumnByCardId(orderedColumns, overCardId as string);

      if (!activeColumn || !overColumn) return;

      /**
       * oldColumnWhenDraggingCard: vì lúc dragOver nó đã set state 1 lần
       * nên cần set state khi drag start để lấy đúng active column
       */
      // another column
      if (oldColumnWhenDraggingCard?._id !== overColumn._id) {
        console.log("another column");
        moveCardBetweenDifferentColumns(
          oldColumnWhenDraggingCard,
          overColumn,
          overCardId.toString(),
          active,
          over,
          activeDraggingCardId,
          activeDraggingCardData as ICard
        )
      }
      // same column
      else {
        console.log("same column");
        setOrderedColumns(() => {
          const oldIndex: number = oldColumnWhenDraggingCard?.cards.findIndex((item) => item._id === activeDraggingCardId);
          const newIndex: number = oldColumnWhenDraggingCard?.cards.findIndex((item) => item._id === overCardId);
          // console.log("oldIndex", oldIndex, "newIndex", newIndex);
          //#dndkit: dnd-kit/packages/sortable/src/utilities
          const orderedCard: ICard[] = arrayMove(oldColumnWhenDraggingCard?.cards, oldIndex, newIndex);
          // shallow copy preColumns and re setState
          const nextColumns: IColumn[] = cloneDeep(orderedColumns);
          const targetColumn = nextColumns.find(column => column._id === overColumn._id);
          if (targetColumn) {
            targetColumn.cards = orderedCard;
            targetColumn.cardOrderIds = targetColumn.cards.map(card => card._id);
          }
          return nextColumns;
        });

      }
    };

    // when drag end remove state to make drag overlay
    setActiveDragItemId("")
    setActiveDragItemType("")
    setActiveDragItemData(undefined)
    setOldColumnWhenDraggingCard(undefined)
  }


  function moveCardBetweenDifferentColumns(
    activeColumns: IColumn | undefined,
    overColumn: IColumn,
    overCardId: string,
    active: Active,
    over: Over,
    activeDraggingCardId: string | number,
    activeDraggingCardData: ICard
  ) {
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
      const nextActiveColumn = nextColumns.find(column => column._id === activeColumns?._id)
      const nextOverColumn = nextColumns.find(column => column._id === overColumn._id)

      // console.log("nextActiveColumn", nextActiveColumn);
      // console.log("nextOverColumn", nextOverColumn);

      //  update old column
      if (nextActiveColumn) {
        nextActiveColumn.cards = nextActiveColumn.cards.filter(card => card._id !== activeDraggingCardId);
        //#dndkit: fix bug drag into empty card in column
        if (isEmpty(nextActiveColumn.cards)) {
          nextActiveColumn.cards = [genertateCardPlaceholder(nextActiveColumn)];
        }
        nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map(card => card._id);


      }
      // update new column
      if (nextOverColumn) {
        // remove card if it exists
        nextOverColumn.cards = nextOverColumn.cards.filter(card => card._id !== activeDraggingCardId);
        // update new column for card
        const reColumnId_activeDraggingCardData = {
          ...activeDraggingCardData,
          columnId: nextOverColumn._id
        }
        // console.log("reColumnId_activeDraggingCardData", reColumnId_activeDraggingCardData);
        nextOverColumn.cards.splice(newCardIndex, 0, reColumnId_activeDraggingCardData as ICard);
        //#dndkit: fix bug drag into empty card in column
        nextOverColumn.cards = nextOverColumn.cards.filter(card => !card.FE_Placeholder);
        nextOverColumn.cardOrderIds = nextOverColumn.cards.map(c => c._id);
      }
      // set state
      return nextColumns;
    })
  }
  console.log("orderedColumns", orderedColumns);

  const collisionDetectionStrategy: CollisionDetection = useCallback((args: any) => {
    // First, let's see if there are any collisions with the pointer
    const pointerCollisions = pointerWithin(args);

    // Collision detection algorithms return an array of collisions
    if (pointerCollisions.length > 0) {
      return pointerCollisions;
    }

    // If there are no collisions with the pointer, return rectangle intersections
    return rectIntersection(args);
  }, [activeDragItemType]);
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
    // collisionDetection={collisionDetectionStrategy}
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
