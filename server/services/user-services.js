const {User, UserData, LoginData} = require('../models/users_model')
const bcrypt = require('bcrypt')
const uuid = require('uuid')
const mailService  = require('./mail-services')
const tokenService = require('./token-services')
const UserDto = require('../dtos/user-dto')
const ApiError = require('../exceptions/api-error')

class UserServices{
    async registration(userRegistrationDto, ip){
        const candidate = await User.findOne({where : {email : userRegistrationDto.email}})
        if (candidate){
            if (candidate.isActivated){
                throw ApiError.BadRequest(`Пользователь c таким почтовым адрессом  ${userRegistrationDto.email} уже сущечствчует`);
            }
            this.deleteNotActivetedUser(candidate.id)
        }
        const hashPassword = await bcrypt.hash(userRegistrationDto.password, 3)
        const activationLink = uuid.v4()
        
        const user = await User.create({email: userRegistrationDto.email, password: hashPassword, activationLink})
        const userData = await UserData.create({
            name : userRegistrationDto.name,
            surname : userRegistrationDto.surname,
            phone_number : userRegistrationDto.phone_number,
            userId : user.id
        })

        if (!userData){
            throw ApiError.BadRequest(`Не вдалося зберегти нового корстувача`)
        }
        await mailService.sendActivationMail(userRegistrationDto.email, `${process.env.API_URL}/api/users/activate/${activationLink}`)
        await this.saveLogin(user.id, ip, userRegistrationDto.device_data)
        const userDto = new UserDto(user)
        const tokens = await tokenService.generateToken({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken, ip, userRegistrationDto.device_data)

        return {...tokens, user: userDto}
    }

    async activate(activationLink){
        const user = await User.findOne({where : {activationLink}})
        if (!user){
            throw ApiError.BadRequest('Некоректне посилання активації')
        }
        user.isActivated  = true;
        await user.save();
    }

    async login(email, password, device_data, ip){
        const user = await User.findOne({where : {email, isActivated : true}})
        if (!user){
            throw ApiError.BadRequest('Користувач з таким email не знайдений!')
        }
        const isPassEquals = await bcrypt.compare(password, user.password)
        if (!isPassEquals){
            throw ApiError.BadRequest('Не вірний пароль!');
        }
        const userDto = new UserDto(user)
        const tokens = await tokenService.generateToken({...userDto})

        await tokenService.saveToken(userDto.id, tokens.refreshToken , ip, device_data)
        await this.saveLogin(user.id, ip, device_data)
        return {...tokens, user: userDto}
    }

    async logout(refreshToken){
        const token = await tokenService.removeToken(refreshToken);
        return token;
    }

    async refresh(refreshToken, ip){
        if (!refreshToken){
            throw ApiError.UnauthorizedError()
        }

        const userData = tokenService.validateRefreshToken(refreshToken)
        const tokenFromDB = await tokenService.findToken(refreshToken)
        if(!userData || !tokenFromDB){
            throw ApiError.UnauthorizedError()
        }
        const user = await User.findOne({where : {id : userData.id}})
        const userDto = new UserDto(user)
        const tokens = await tokenService.generateToken({...userDto})

        await tokenService.saveToken(userDto.id, tokens.refreshToken , ip, tokenFromDB.device_data)
        return {...tokens, user: userDto}
    }

    async getAllUsers(){
        const users = await User.findAll()
        return users;
    }

    async deleteNotActivetedUser(user_id){
        const deleteUser = await User.destroy({where : {id : user_id}});
        return deleteUser 
    }

    async saveLogin(userId, ip, device_data){
        const loginData = await LoginData.create({ip, device_data, userId})
        return loginData;
    }
}

module.exports = new UserServices()