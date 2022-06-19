const { Categories } = require("../models/admin_model")
const frontendService = require("../services/frontend-service")

class InterfaceController{
    async getCategories(req, res, next){
        const categories = await frontendService.createCategoriesMenu(-1)
        res.json(categories)
    }
}

module.exports = new InterfaceController()