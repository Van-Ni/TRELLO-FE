export interface Board {
    _id: string;
    title: string;
    description: string;
    type: 'public' | 'private';
    ownerIds: string[]; // Users who are Admins of the board
    memberIds: string[]; // Users who are normal members of the board
    columnOrderIds: string[]; // Order of Columns in the board
    columns: Column[];
}
export interface Card {
    _id: string;
    boardId: string;
    columnId: string;
    title: string;
    description: string | null;
    cover: string | null;
    memberIds: string[];
    comments: string[];
    attachments: string[];
    FE_Placeholder?: boolean
}

export interface Column {
    _id: string;
    boardId: string;
    title: string;
    cardOrderIds: string[];
    cards: Card[];
}
export interface ColumnDataRequest {
    boardId: string;
    title: string;
}
export interface CardDataRequest {
    boardId: string;
    columnId: string;
    title: string;
}