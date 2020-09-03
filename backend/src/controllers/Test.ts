import { Context } from "koa"

const {Controller, Get, Params, Query, Post, Body, Header, Ctx} = require('koa-ts-controllers')
const {IsNumberString, IsNotEmpty} = require('class-validator')
const Boom = require('@hapi/Boom')



class GetUsersQuery{
    @IsNumberString()
    from: number

    @IsNumberString()
    to: number

}

class PostUserBody {
    @IsNotEmpty({
        message: 'name不能为空' 
    })
    name: string

    @IsNotEmpty({
        message: 'password不能为空'
    })
    password: string
}

@Controller('/test')
class TestController {

    @Get('/hello')
    async sayWorld() {
        return 'hi'
    }

    // @Get('/user/:id')
    // public async index(
    //     @Params() params: {id: number}
    // ){
    //     console.log(params.id)
    // }

    @Get('/user/:id')
  	public async index2(
  			@Params('id') id: number
  	) {
          console.log('hh')
                console.log(id);
                return 'hh'
        }
        

        //http://localhost:8080/api/v1/test/users?to=1&from=2
    @Get('/users')
    public async getUsers(
        @Query() query: GetUsersQuery
    ){
        console.log(query)
        throw Boom.notFound('用户不存在','这是错误的详细描述')
        return '...'
    }

    // @Post('/user')
    // public async getUser(
    //     @Body() user: {
    //         name:string,
    //         password: string
    //     }
    // ) {
    //     console.log(user)
    //     return 'IIII'

    // }

    @Post('/user')
    public async createUser(
        @Ctx() ctx: Context,
        @Body() user: PostUserBody,
        @Header() h: any
    ) {

        ctx.status = 201
        return {
            id:1,
            name:user.name,
            createdAt: Date.now()
        }

    }
}

