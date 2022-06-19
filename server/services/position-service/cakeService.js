const ApiError = require("../../exceptions/api-error");
const { Cake } = require("../../models/cake_model");
const positionService = require("./positionService");

class CakeService{
    async createNewCake(name, price, description, composition, categoryId, id_sub_category, img){

        const cake = await Cake.create({name, price, description, composition, categoryId, img})
        if (!cake){
            throw ApiError.BadRequest('Не вдалося зберегти позицію1')
        }

        if (id_sub_category){
            const categoryList = id_sub_category.split(",")
            //console.log('id_sub_category : ' + id_sub_category)
            //const categoryList = id_sub_category;
            console.log(categoryList)
            const isOk = await positionService.saveEveryCategory(cake.id, categoryList)

            if (!isOk){
                await cake.destroy()
                throw ApiError.BadRequest('Не вдалося зберегти позицію2')
            }
        }
        
        return cake
    }
}

module.exports = new CakeService()