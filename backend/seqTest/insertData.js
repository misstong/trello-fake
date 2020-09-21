const  {Boy,Girl} = require('./testSeqAsso') 

async function insert1(){
    const boy = await Boy.create({name:'t'})
const girl= await Girl.create({name:'b'})

console.log(await boy.getGirl())
}

// insert1()

async function atta(){
    const boy = await Boy.findOne()
    const girl = await Girl.findOne()
    console.log('boy',boy.toJSON())
    console.log(await boy.getGirl())
    await boy.setGirl(girl)
    console.log(await boy.getGirl())
}

atta()