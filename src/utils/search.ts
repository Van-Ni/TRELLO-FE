import { Column } from "~/interface/Board";

// export const findColumnByCardId = (columns: Column[], cardId: string): Column | undefined => {
//     return columns.find(column => column.cards.map(card => card._id).includes(cardId))
//     }
export const findColumnByCardId = (columns: Column[], cardId: string): Column | undefined => {
    // accumulator, currentValue
    return columns.reduce((foundColumn: Column | undefined, column: Column) => {
        if (foundColumn) {
            return foundColumn; // Nếu đã tìm thấy cột, không cần duyệt qua các cột khác
        }
        const foundCard = column.cards.find(card => card._id === cardId);
        if (foundCard) {
            return column; // Trả về cột nếu tìm thấy card
        }
        return undefined;
    }, undefined);
};