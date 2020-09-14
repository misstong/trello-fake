import {BoardList as BoardListModel} from "../models/BoardList";
import Boom from "@hapi/boom";

export async function getAndValidateBoardList(id:number, userId:number): Promise<BoardListModel> {
    let board = await BoardListModel.findByPk(id)

    if (!board) {
        throw Boom.notFound('指定列表不存在');
    }

    if (board.userId !== userId) {
        throw Boom.forbidden('禁止访问该列表');
    }

    return board;
}