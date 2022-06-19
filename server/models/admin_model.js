const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const Categories = sequelize.define('category', {
    id : {type : DataTypes.INTEGER, autoIncrement : true, primaryKey : true},
    name : {type : DataTypes.STRING, allowNull : false},
    id_father : {type : DataTypes.INTEGER, allowNull : false}
})

module.exports = {Categories}