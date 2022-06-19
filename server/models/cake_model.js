const sequelize = require('../db')
const {DataTypes} = require('sequelize')
const { Categories } = require('./admin_model')

const Cake = sequelize.define('cake', {
    id : {type : DataTypes.INTEGER, primaryKey : true, autoIncrement : true},
    price : {type : DataTypes.FLOAT},
    description : {type: DataTypes.STRING},
    composition : {type : DataTypes.STRING},
    img : {type : DataTypes.STRING, allowNull : false}
})

const CategoryCake = sequelize.define('category_cake', {
    id : {type : DataTypes.INTEGER, primaryKey : true, autoIncrement : true}
})

Cake.belongsToMany(Categories, {through : CategoryCake})
Categories.belongsToMany(Cake, {through : CategoryCake})

Categories.hasMany(Cake)


module.exports = {
    Cake,
    CategoryCake
}