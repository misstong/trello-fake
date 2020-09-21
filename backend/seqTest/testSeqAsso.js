const { Sequelize, Model, DataTypes } = require('sequelize')

const sequelize = new Sequelize('test','root','root',{
    host:'localhost',
    dialect:'mysql',
    logging: false
})

class Boy extends Model{

}

Boy.init({name:DataTypes.STRING},{sequelize})

const Girl = sequelize.define('Girl',{
    name: DataTypes.STRING
})

const BlackDress = sequelize.define('BlackDress',{
    color: DataTypes.STRING
})

Boy.hasOne(Girl)
Boy.sync()
Girl.sync()
Girl.hasOne(BlackDress)
BlackDress.sync()
module.exports={
    Boy,
    Girl,
    BlackDress
}