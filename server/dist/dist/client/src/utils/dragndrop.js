"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateItemPosition = exports.isPositionChanged = void 0;
const isPositionChanged = (source, destination) => {
    if (!destination)
        return false;
    const isSameList = destination.droppableId === source.droppableId;
    const isSamePosition = destination.index === source.index;
    return !isSameList || !isSamePosition;
};
exports.isPositionChanged = isPositionChanged;
const calculateItemPosition = (items, source, destination, droppedItemId) => {
    const { prevItem, nextItem } = getPrevAndNextItem(items, source, destination, droppedItemId);
    let position;
    if (!prevItem && !nextItem) {
        position = 1;
    }
    else if (!prevItem) {
        position = nextItem.order - 1;
    }
    else if (!nextItem) {
        position = prevItem.order + 1;
    }
    else {
        position = prevItem.order + (nextItem.order - prevItem.order) / 2;
    }
    return position;
};
exports.calculateItemPosition = calculateItemPosition;
const moveItemWithinArray = (arr, item, newIndex) => {
    const arrClone = [...arr];
    const oldIndex = arrClone.indexOf(item);
    arrClone.splice(newIndex, 0, arrClone.splice(oldIndex, 1)[0]);
    return arrClone;
};
const insertItemIntoArray = (arr, item, index) => {
    const arrClone = [...arr];
    arrClone.splice(index, 0, item);
    return arrClone;
};
const getPrevAndNextItem = (items, source, destination, droppedItemId) => {
    const isSameList = (destination === null || destination === void 0 ? void 0 : destination.droppableId) === source.droppableId;
    const destItems = items.filter((i) => i.list === (destination === null || destination === void 0 ? void 0 : destination.droppableId));
    const droppedItem = items.find((i) => i._id === droppedItemId);
    const destSortedItems = getSortedItems(destItems);
    const afterDropDestinationItems = isSameList
        ? moveItemWithinArray(destSortedItems, droppedItem, destination.index)
        : insertItemIntoArray(destSortedItems, droppedItem, destination.index);
    const prevItem = afterDropDestinationItems[destination.index - 1];
    const nextItem = afterDropDestinationItems[destination.index + 1];
    return { prevItem, nextItem };
};
function getSortedItems(items) {
    if (!items)
        return [];
    return [...items].sort((a, b) => a.order - b.order);
}
//# sourceMappingURL=dragndrop.js.map