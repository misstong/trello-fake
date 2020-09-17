ctx.set('authorization', token);

 let rs = await login(data);

                commit('updateUserInfo', {
                    id: rs.data.id,
                    name: rs.data.name,
                    authorization: rs.headers.authorization
                });
前端直接从response的headers里曲authorization，说明ctx.set将authorization设到了headers里

 configs.headers.common.authorization = data.authorization;

 let token = ctx.headers['authorization'];

 前端将authorization设到headers的common里，后端直接从ctx的headers里拿?
 headers.common可能是Axios的实现问题

 Koa的上下文劫持

