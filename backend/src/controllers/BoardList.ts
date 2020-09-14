import { Body, Controller, Ctx, Get, Params, Post, Put, Query } from 'koa-ts-controllers';
import { Context } from 'vm';
import { getAndValidateBoard } from '../validators/Board';
import { BoardList as BoardListModel } from '../models/BoardList'
import { getAndValidateBoardList } from '../validators/BoardList'

@Controller('/list')
export class BoardListController{
    @Post('')
    public async addList(
        @Ctx() ctx: Context,
        @Body() body: {boardId: number, name:string }
    ) {
        let {boardId, name} = body;

        await getAndValidateBoard(boardId, ctx.userInfo.id)

        let maxOrderBoardList = await BoardListModel.findOne({
            where:{
                boardId
            },
            order: [['order','desc']]
        })

        let boardList = new BoardListModel()
        boardList.userId = ctx.userInfo.id
        boardList.boardId = boardId
        boardList.name = name
        boardList.order = maxOrderBoardList ? maxOrderBoardList.order + 65535 : 65535;

        await boardList.save();
        ctx.status = 201

        return boardList
    }

    @Get('')
    public async getLists(
        @Ctx() ctx: Context,
        @Query() query: {boardId: number}
    ){
        let {boardId} = query

        await getAndValidateBoard(boardId, ctx.userInfo.id)

        let boardList = await BoardListModel.findAll({
            where: {
                boardId
            },
            order:[['order','desc']]
        })
        return boardList
    }

    @Get('/:id(\\d+)')
    public async getList(
        @Ctx() ctx: Context,
        @Params('id') id: number
    ) {
        let boardList = await getAndValidateBoardList(id, ctx.userInfo.id)
        return boardList
    }


    @Put('/:id(\\d+)')
    public async updateList(
        @Ctx() ctx:Context,
        @Params('id') id:number,
        @Body() body: {boardId:number,name:string,order:number}
    ){
        let {}
    }
}