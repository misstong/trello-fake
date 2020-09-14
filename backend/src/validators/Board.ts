import {Board as BoardModel} from '../models/Board';
import Boom from '@hapi/boom'

export async function getAndValidateBoard(id:number, userId: number): Promise<BoardModel> {
    let board = await BoardModel.findByPk(id)
    if (!board) {
        throw Boom.notFound('指定看板不存在')
    }

    if (board.userId !== userId) {
        throw Boom.forbidden('禁止访问该面板')
    }

    return board;
}