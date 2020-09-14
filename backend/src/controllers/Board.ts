/*
1. flow authorization
2. put method
*/
import { Body, Controller, Ctx, Delete, Get, Params, Post, Put } from 'koa-ts-controllers'
import { Context } from 'koa';
import { Board as BoardModel } from '../models/Board'
import { getAndValidateBoard } from '../validators/Board'

@Controller('/board')
export class BoardController {
    
    @Post('')
    public async addBoard(
        @Ctx() ctx: Context,
        @Body() body: {name: string}
    ){
        let {name} =body

        let board = new BoardModel()

        board.name = name
        board.userId = ctx.userInfo.id;
        await board.save()

        ctx.status = 201
        return board
    }

    @Get('')
    public async getBoards(
        @Ctx() ctx: Context
    ){
        let where = {
            userId: ctx.userInfo.id
        }
        let boards = await BoardModel.findAll({where})

        return boards
    }

    @Get('/:id(\\d+)')
    public async getBoard(
        @Ctx() ctx: Context,
        @Params('id') id: number
    ){
        let board = await getAndValidateBoard(id, ctx.userInfo.id)

        return board
    }

    @Put('/:id(\\d+)')
    public async updateBoard(
        @Ctx() ctx: Context,
        @Params('id') id:number,
        @Body() body: {name:string}
    ){
        let board = await getAndValidateBoard(id, ctx.userInfo.id)
        await board.save()

        ctx.status = 204
    }

    @Delete('/:id(\\d+)')
    public async deleteBoard(
        @Ctx() ctx: Context,
        @Params('id') id:number
    ){
        let board = await getAndValidateBoard(id, ctx.userInfo.id)

        await board.destroy()
        ctx.status = 204
    }
}