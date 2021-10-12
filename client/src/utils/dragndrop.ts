import { DraggableLocation } from "react-beautiful-dnd";

import { Board, Item, List } from "../interfaces";

export const isPositionChanged = (
  source: DraggableLocation,
  destination: DraggableLocation | undefined
) => {
  if (!destination) return false;
  const isSameList = destination.droppableId === source.droppableId;
  const isSamePosition = destination.index === source.index;
  return !isSameList || !isSamePosition;
};

export const calculateItemPosition = (
  board: Board,
  source: DraggableLocation,
  destination: DraggableLocation | undefined,
  droppedItemId: string
) => {
  const { prevItem, nextItem, afterDropDestinationItems } = getPrevAndNextItem(
    board,
    source,
    destination,
    droppedItemId
  );
  let position;

  if (!prevItem && !nextItem) {
    position = 1;
  } else if (!prevItem) {
    position = nextItem.order - 1;
  } else if (!nextItem) {
    position = prevItem.order + 1;
  } else {
    position = prevItem.order + (nextItem.order - prevItem.order) / 2;
  }
  return { afterDropDestinationItems, position };
};

const moveItemWithinArray = (
  arr: Item[],
  item: Item | undefined,
  newIndex: number
) => {
  const arrClone = [...arr];
  const oldIndex = arrClone.indexOf(item!);
  arrClone.splice(newIndex, 0, arrClone.splice(oldIndex, 1)[0]);
  return arrClone;
};

const insertItemIntoArray = (
  arr: Item[],
  item: Item | undefined,
  index: number
) => {
  const arrClone = [...arr];
  arrClone.splice(index, 0, item!);
  return arrClone;
};

const getPrevAndNextItem = (
  board: Board,
  source: DraggableLocation,
  destination: DraggableLocation | undefined,
  droppedItemId: string
) => {
  const isSameList = destination?.droppableId === source.droppableId;

  const destinationList = board?.lists.find(
    (list) => list._id === destination?.droppableId
  );

  const droppedItem = board?.lists
    .find((list) => list._id === source.droppableId)!
    .items.find((item) => item._id === droppedItemId);

  const destSortedItems = getSortedItems(destinationList?.items);
  const afterDropDestinationItems = isSameList
    ? moveItemWithinArray(destSortedItems, droppedItem, destination!.index)
    : insertItemIntoArray(destSortedItems, droppedItem, destination!.index);

  const prevItem = afterDropDestinationItems[destination!.index - 1];
  const nextItem = afterDropDestinationItems[destination!.index + 1];

  return { prevItem, nextItem, afterDropDestinationItems };
};

function getSortedItems(items: Item[] | undefined) {
  if (!items) return [];
  return [...items].sort((a, b) => a.order - b.order);
}
