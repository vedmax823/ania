
const ApiError = require('../exceptions/api-error');
const tokenServices = require('../services/token-services');

module.exports = function(role) {
    return function (req, res, next) {
        try {
            const authorizationHeader = req.headers.authorization;
            if (!authorizationHeader){
                return next(ApiError.UnauthorizedError());
            }
            const token = authorizationHeader.split(' ')[1] // Bearer asfasnfkajsfnjk
            if (!token) {
                return next(ApiError.UnauthorizedError())
            }
            const decoded = tokenServices.validateAccessToken(token) 
            if (!decoded){
                return next(ApiError.BadRequest('Не вдалося розшифрувати'))
            }
            if (decoded.role !== role) {
                return next(ApiError.BadRequest('Немаэ доступу'))
            }
            req.user = decoded;
            next()
        } catch (e) {
            return next(ApiError.UnauthorizedError());
        }
    };
}