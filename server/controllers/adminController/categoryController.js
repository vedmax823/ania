const { validationResult } = require("express-validator")
const ApiError = require("../../exceptions/api-error")
const CategoryServices = require("../../services/admin_services/cetegories-servise")


class CategoryController {
    async createNewCategory(req, res, next){
        try{
            const errors = validationResult(req)
            if (!errors.isEmpty()){
                return next(ApiError.BadRequest('Помилка при створенні нової категорії', errors))
            }
            const {name, id_father, link} = req.body
            const category = await CategoryServices.createCategory(name, id_father, link)
            res.json(category)
        }
        catch(e){
            next(e)
        }
    }

    async getCategotyList(req, res, next){
        try{
            const category_list = await CategoryServices.getCategotyList()
            res.json(category_list)
        }
        catch(e){
            next(e)
        }
    }
}

module.exports = new CategoryController()