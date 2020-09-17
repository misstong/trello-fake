function compose(middlewares){
    return function wrapped(ctx){
        function dispatch(i) {
            let fn = middlewares[i]
            if(!fn) {
                return null
            }
            return fn(ctx, ()=>dispatch(i+1))
        }
        return dispatch(0)
    }
}
const timeout = i=>new Promise((resolve,reject)=> {
    setTimeout(()=>{
        try {
            console.log('timeout')
            resolve(i)
        } catch (error) {
            reject(-1)
        }
       
    },i)
})


const middlewares =[]
middlewares.push(async (ctx,next) => {
    console.log('first enter')
    console.log('1',ctx)
    await timeout(1)
    next()
    console.log('first out')
})

middlewares.push((ctx,next) => {
    console.log('second enter')
    console.log('2',ctx)
    next()
    console.log('second out')
})

// compose(middlewares)({name:'tang'})

const awaitRet = async ()=>{
    let ret = await timeout(1)
    console.log(ret)
}
const test = async () => {
    await awaitRet()
}
test()// await后可以跟普通返回值的函数，也可以跟返回promise的函数

function A(){
    A.close = function(){
        console.log(a)
    }
    let a = 1
}

A()