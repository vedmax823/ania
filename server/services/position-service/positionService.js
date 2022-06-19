const { CategoryCake } = require("../../models/cake_model");

class PositionService{
    async saveEveryCategory(cakeId, categoryList){
        try{
            for(const element of categoryList){
                await CategoryCake.create({cakeId, categoryId : element})
            }
            return true
        }
        catch(e){
            return null
        } 
    }
}

module.exports = new PositionService()