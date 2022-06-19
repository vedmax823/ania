const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id : {type : DataTypes.INTEGER, primaryKey: true, autoIncrement : true},
    email : {type : DataTypes.STRING, unique : true, allowNull : false},
    password : {type : DataTypes.STRING, allowNull : false},
    roles : {type : DataTypes.STRING, defaultValue : 'USER'},
    isActivated : {type : DataTypes.BOOLEAN, defaultValue : false},
    activationLink : {type : DataTypes.STRING}
})

const UserData = sequelize.define('userData', {
    name : {type : DataTypes.STRING},
    surname : {type : DataTypes.STRING},
    phone_number : {type : DataTypes.STRING, allowNull : false}
})

const LoginData = sequelize.define('loginData', {
    ip : {type : DataTypes.STRING, allowNull : false},
    device_data : {type : DataTypes.JSON, allowNull : false}
})

User.hasOne(UserData,{
    onDelete: 'cascade',
    foreignKey: { allowNull: false },
    hooks : true
})
UserData.belongsTo(User)

User.hasMany(LoginData,{
    onDelete: 'cascade',
    foreignKey: { allowNull: false },
    hooks : true
})

module.exports = {User, UserData, LoginData}