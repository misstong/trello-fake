const  {Boy,Girl, BlackDress} = require('./testSeqAsso') 

async function select() {
    // const girl = await Girl.findOne()
    // const d = await BlackDress.create({color:'red'})
    // girl.setBlackDress(d)
    const boy =await Boy.findOne({
        include: {
            model:Girl
        }
    })
    
    // console.log(boy)
    // console.log(boy.toJSON())
    console.log('ggg1',boy.Girl.toJSON())
    console.log('--------------------')
}

select()

async function select2() {

    const boy =await Boy.findOne({
        include: {
            model:Girl,
            include: BlackDress
        }
    })
    
    // console.log(boy)
    // console.log(boy.toJSON())
    console.log('ggg2',boy.Girl.toJSON())
}

select2()