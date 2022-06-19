const UserRegistrationDto = require('../dtos/user-registration-dto')
const userServices = require("../services/user-services")
const {validationResult, cookie} = require('express-validator')
const ApiError = require('../exceptions/api-error')

class UserController{
    async registration(req, res, next){
        try{
            const errors = validationResult(req)
            if (!errors.isEmpty()){
                return next(ApiError.BadRequest('Помилка при валідаціЇ', errors.array()))
            }
            const userRegistrationDto = new UserRegistrationDto(req.body) 
            const userData = await userServices.registration(userRegistrationDto, req.ip)
            res.cookie('refreshToken', userData.refreshToken, {maxAge : 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            res.json(userData)
        }
        catch(e){
            next(e)
        }
    }

    async login(req, res, next){
        try{
            const errors = validationResult(req)
            if (!errors.isEmpty()){
                return next(ApiError.BadRequest('Помилка при валідаціЇ', errors.array()))
            }
            const {email, password, device_data} = req.body
            const userData = await userServices.login(email, password, device_data, req.ip)
            res.cookie('refreshToken', userData.refreshToken, {maxAge : 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            res.json(userData) 
        }
        catch(e){
            next(e)
        }
    }

    async logout(req, res, next){
        try{
            const {refreshToken} = req.cookies
            const token = await userServices.logout(refreshToken)
            res.clearCookie('refreshToken')
            res.json(token)
        }
        catch(e){
            next(e)
        }
    }

    async refresh(req, res, next){
        try{
            const errors = validationResult(req)
            if (!errors.isEmpty()){
                return next(ApiError.BadRequest('Помилка при валідаціЇ', errors.array()))
            }
            const {refreshToken} = req.cookies
            const userData = await userServices.refresh(refreshToken, req.ip)
            res.cookie('refreshToken', userData.refreshToken, {maxAge : 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            res.json(userData) 

        }
        catch(e){
            next(e)
        }
    }

    async activate(req, res, next){
        try{
            const activationLink = req.params.link;
            //console.log(`\n activation link : ${activationLink} \n`)
            await userServices.activate(activationLink)
            return res.redirect('https:/football.ua')
        }
        catch(e){
            next(e)
        }
    }

    async getUsers(req, res, next){
        try{
            const users = await userServices.getAllUsers()
            return res.json(users)
        }
        catch(e){
            next(e)
        }
    }

}

module.exports = new UserController()