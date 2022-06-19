const { checkCategoryIdFather } = require("../check-services")

const category_check_schema = {
    name : {
        isLength: {
            options : {min : 3, max : 20},
            errorMessage : 'Дуже коротка, або довга назва!'
        } 
    },
    id_father : {
        custom : {
            options : id_father => checkCategoryIdFather(id_father)

        }
    }
}
module.exports = {category_check_schema}