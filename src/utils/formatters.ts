import { Card, Column } from "~/interface/Board";

export function capitalizeFirstLetter(str?: string): string {
    if (!str) return '';
    const [firstLetter, ...rest] = str;
    return `${firstLetter.toUpperCase()}${rest.join("")}`;
}

export const generateCardPlaceholder = (column: Column) : Card => {
    return {
        _id: `${column._id}_placeholder`,
        boardId: column.boardId,
        columnId: column._id,
        FE_Placeholder: true,
        title: '',
        description: '',
        cover: '',
        memberIds: [],
        comments: [],
        attachments: []
        // Add any other required properties here
    };
}