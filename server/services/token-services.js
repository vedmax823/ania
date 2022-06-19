const jwt = require('jsonwebtoken')
const {Token} = require('../models/token_model')
const HelpService = require('./help-service')
const {Op} = require('sequelize')

class TokenServices{
    async generateToken(payload){
        
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS, {expiresIn : '24h'})
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH, {expiresIn: '7d'})
        return {
            accessToken,
            refreshToken
        }
    }

    async saveToken(userId, refreshToken, ipUser, device_data){
        await Token.destroy({where : {userId, updatedAt : {[Op.lt] : new  Date() - 30 * 24 * 60 * 60 * 1000}}})
        const tokenData = await Token.findOne({where : {userId, device_data}})
        if (tokenData){
            if (HelpService.checkJSONObjects(tokenData.device_data, device_data)){
                tokenData.refreshToken = refreshToken;
                tokenData.ipUser = ipUser;
                return tokenData.save()
            }
        }
        const token = await Token.create({refreshToken, userId, ipUser, device_data})
        return token
    }

    async removeToken(refreshToken){
        const tokenData = await Token.destroy({where : {refreshToken}})
        return tokenData
    }

    validateAccessToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_ACCESS);
            return userData;
        } catch (e) {
            return null;
        }
    }

    validateRefreshToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_REFRESH);
            return userData;
        } catch (e) {
            return null;
        }
    }

    async findToken(refreshToken) {
        const tokenData = await Token.findOne({refreshToken})
        return tokenData;
    }
}

module.exports = new TokenServices()