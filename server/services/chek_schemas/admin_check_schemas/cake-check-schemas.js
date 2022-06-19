const { checkExsistCategory, checkSubCategories } = require("../check-services");

const cake_check_schema = {
    categoryId : {
        custom : {
            options : categoryId => checkExsistCategory(categoryId)
        }
    },
    id_sub_category : {
        custom : {
            options : id_sub_category => checkSubCategories(id_sub_category)

        }
    }
}

module.exports = {
    cake_check_schema
}