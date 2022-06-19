const { Categories } = require("../../models/admin_model");

class CategoryServices{
    static async createCategory(name, id_father){
        const category = Categories.create({name, id_father})
        return category
    }
} 

module.exports = CategoryServices