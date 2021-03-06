import configs from './configs';
import Koa from 'koa';
import { Context } from 'vm';
const KoaRouter = require('koa-router')
const { bootstrapControllers } = require('koa-ts-controllers')
const Boom = require('@hapi/Boom')
// const KoaBodyParser = require('koa-bodyparser')
const KoaBody = require('koa-body')
const {Sequelize} = require('sequelize-typescript')

const app = new Koa();
const router = new KoaRouter();

(async() => {

    const db = new Sequelize({
        ...configs.database,
        models: [__dirname+'/models/**/*']
    })
    
    await bootstrapControllers(app,
        {
            router: router,
            basePath: '/api',
            versions: [1],
            controllers: [
                __dirname + '/controllers/**/*'
            ],
            errorHandler: async (err: any, ctx: Context) => {
                let status = 500;
                let body: any = {
                    "statusCode": 500,
                    "error": "Internal Server error",
                    "message":"An internal server error occured"
                }

                if (err.output) {
                    status = err.output.statusCode;
                    body = {...err.output.payload};
                    if (err.data) {
                        body.errorDetails = err.data;
                    }
                }

                ctx.status = status;
                ctx.body = body;
            }
        });
        // app.use(KoaBodyParser());
        app.use(KoaBody({
            multipart: true,
            formidable: {
                uploadDir: configs.storage.dir,
                keepExtensions: true
            }
        }))
        app.use(router.routes());
        app.listen(configs.server.port, configs.server.host, ()=>{
            console.log(`服务启动成功： http://${configs.server.host}:${configs.server.port}`);
            
        })
        
})()

// not found api

// router.all('*', async () => {
//     throw Boom.notFound();
// });