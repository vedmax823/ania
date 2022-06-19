const sequelize = require('../db')
const {DataTypes} = require('sequelize')
const {User} = require('./users_model')

const Token = sequelize.define('token', {
    refreshToken : {type : DataTypes.STRING, allowNull : false},
    ipUser : {type : DataTypes.STRING, allowNull : false},
    device_data : {type : DataTypes.JSON, allowNull : false}
})

User.hasMany(Token,{
    onDelete: 'cascade',
    foreignKey: { allowNull: false },
    hooks : true
})

module.exports = {Token}