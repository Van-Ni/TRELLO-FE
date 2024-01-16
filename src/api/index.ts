import axios from "axios";
import { Board } from "~/interface/Board";
import { API_ROOT } from "~/utils/constants";

// #Trello: Interceptors - clean code
// You can intercept requests or responses before they are handled by then or catch
export const fetchBoardDetailsAPI = async (id: string): Promise<Board | null> => {
    const response = await axios.get(`${API_ROOT}/v1/boards/${id}`);
    const board: Board = response.data;
    return board;
};
