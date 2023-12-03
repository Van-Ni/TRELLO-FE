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
}

export interface Column {
    _id: string;
    boardId: string;
    title: string;
    cardOrderIds: string[];
    cards: Card[];
}