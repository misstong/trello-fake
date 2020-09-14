import { Controller, Post, Body, Ctx} from 'koa-ts-controllers'
import {User as UserModel} from '../models/User'
import Boom from '@hapi/Boom'
import { Context } from 'koa';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import configs from '../configs'

@Controller('/user')
export class UserController {
    @Post('/register')
    async register(
        @Ctx() ctx:Context,
        @Body() body: {name: string,password:string}
    ){
        let {name, password} = body;
        console.log(name,password)
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

    @Post('/login')
    async login(
        @Ctx() ctx: Context,
        @Body() body: {name: string,password:string}
    ){
        let {name, password} = body

        let user = await UserModel.findOne({
            where: {name}
        })

        if (!user) {
            throw Boom.notFound('登录失败','用户名不存在')
        }

        let md5 = crypto.createHash('md5')
        password = md5.update(password).digest('hex')
        if(password!==user.password) {
            throw Boom.forbidden('登录失败','密码错误')
        }

        let userInfo ={
            id: user.id,
            name: user.name
        }

        let token = jwt.sign(userInfo, configs.jwt.privateKey)
        ctx.set('authorization', token)
        return userInfo
    }


}