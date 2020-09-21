const { Sequelize, DataTypes, Model } = require('sequelize')
// const sequelize = new Sequelize('sqlite:memory')
const sequelize = new Sequelize('test','root','root',{
    host:'localhost',
    dialect:'mysql'
})
async function test() {
    try {
        await sequelize.authenticate()
        console.log('Connection has been established successfully.');
    } catch (error) {
        
    }
}
// test()
class Foo extends Model {}
Foo.init({ 
    name: DataTypes.STRING
 }, {
  sequelize,
 
  // don't forget to enable timestamps!
  timestamps: true,

  // I don't want createdAt
  createdAt: false,

  // I want updatedAt to actually be called updateTimestamp
  updatedAt: 'updateTimestamp'
});

// const User = sequelize.define('User', {
//     firstName: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },
//     lastName: {
//         type: DataTypes.STRING,

//     }
// },{})

// console.log(User)
// console.log(sequelize.models)

const foo1 = Foo.build({name:'hh'})
console.log(foo1)
async function create(){
    await Foo.sync()
    console.log('done')
}

create()