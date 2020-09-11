import { Controller, Post, Body, Ctx} from 'koa-ts-controllers'
import {User as UserModel} from '../models/User'
import Boom from '@hapi/Boom'
import { Context } from 'vm';

@Controller('/user')
export class UserController {
    @Post('/register')
    async register(
        @Ctx() ctx:Context,
        @Body() body: {name: string,password:string}
    ){
        let {name, password} = body;

        let user = await UserModel.findOne({
            where: {
                name
            }
        })

        if (user) {
            throw Boom.conflict('注册失败','用户名已经被注册了')
        }

        let newUser = new UserModel();
        newUser.name = name;
        newUser.password = password;

        await newUser.save();
        ctx.status = 201
        return {
            id: newUser.id,
            name: newUser.name,
            createdAt: newUser.createdAt
        }
    }
}