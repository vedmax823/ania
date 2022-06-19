const { Categories } = require("../models/admin_model")

class FrontendService{
    async createCategoriesMenu(id_father){
        let mainCategories = await Categories.findAll({where : {id_father}})
        console.log(mainCategories)
        if (mainCategories.length > 0){
            let objectCategories = []
            for (let category of mainCategories){
                let childList = await this.createCategoriesMenu(category.id)
                objectCategories.push({id : category.id, name : category.name, childList})
            }
            return objectCategories
        }
        else{
            return false
        }
    }
}

module.exports = new FrontendService()