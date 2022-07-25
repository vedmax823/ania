const { Categories } = require("../../models/admin_model");

class CategoryServices{
    static async createCategory(name, id_father, link){
        const category = Categories.create({name, id_father, link})
        return category
    }

    static async getCategotyByIdFather(id_father, arr, fatherName){
        const categories = await Categories.findAll({where : { id_father}})
        if (categories.length > 0){
            arr =  categories.reduce(async (acc, category) => {
                const id = category.dataValues.id
                const name = fatherName == '' ? category.dataValues.name : fatherName+'/'+category.dataValues.name
                let res = [... await acc, {id, name}]
                return await CategoryServices.getCategotyByIdFather(id, res, name) 
            }, arr)
        }
        return arr
    }

    static async getCategotyList(){
        let arr = await this.getCategotyByIdFather(-1, [], '')
        return arr
    }
} 

module.exports = CategoryServices