import axios from "axios";
import { Board, ColumnDataRequest, UpdateBoardRequest, UpdateColumnRequest, movingCardRequest } from "~/interface/Board";
import { API_ROOT } from "~/utils/constants";

// #Trello: Interceptors - clean code
// You can intercept requests or responses before they are handled by then or catch

// Boards
export const fetchBoardDetailsAPI = async (id: string): Promise<Board | null> => {
    const response = await axios.get(`${API_ROOT}/v1/boards/${id}`);
    const board: Board = response.data;
    return board;
};
export const updateBoardDetailsAPI = async (boardId: string, updateData: UpdateBoardRequest): Promise<any> => {
    const response = await axios.put(`${API_ROOT}/v1/boards/${boardId}`, updateData);
    const board: Board = response.data;
    return board;
};

// Columns
export const createNewColumnAPI = async (columnData: ColumnDataRequest): Promise<any | null> => {
    const response = await axios.post(`${API_ROOT}/v1/columns`, columnData);
    console.log(response.data);
    return response.data;
};

export const updateColumnDetailsAPI = async (columnId: string, updateData: UpdateColumnRequest): Promise<any> => {
    const response = await axios.put(`${API_ROOT}/v1/columns/${columnId}`, updateData);
    const board: Board = response.data;
    return board;
};

export const deleteColumnDetailsAPI = async (columnId: string): Promise<any | null> => {
    const response = await axios.delete(`${API_ROOT}/v1/columns/${columnId}`);
    console.log(response.data);
    return response.data;
};

// Cards
export const createNewCardAPI = async (cardData: any): Promise<any | null> => {
    const response = await axios.post(`${API_ROOT}/v1/cards`, cardData);
    console.log(response.data);
    return response.data;
};

export const moveCardToAnotherColumnAPI = async (updateData: movingCardRequest): Promise<any> => {
    const response = await axios.put(`${API_ROOT}/v1/boards/supports/moving_card`, updateData);
    const board: Board = response.data;
    return board;
};