
const { Categories } = require("../../models/admin_model")


const checkDeviceData = async (device_data) => {
    if (!device_data){
        return Promise.reject('Не вказаний девайс!')
    }
    if (!device_data.browser || !device_data.os || !device_data.device){
        return Promise.reject('Не все вказано!')
    }
}

const checkCategoryIdFather = async (id_father) => {
    if (id_father == -1){
        return Promise.resolve()
    }
    return checkExsistCategory(id_father)
    
}

const checkExsistCategory = async (id_father) => {
    const category = await Categories.findOne({where : {id : id_father}})
    if (!category){
        return Promise.reject('Немає такої батьківської категорії')
    }
    return Promise.resolve(category)
}

const checkSubCategories = async (id_sub_categories) => {
    if (!id_sub_categories){
        return Promise.resolve()
    }
    const subCategoryList = id_sub_categories.split(',')
    if (!subCategoryList){
        return Promise.reject('Не вірно вказані підкатегорії')
    }
    for(const item of subCategoryList){
        const categoryId = parseInt(item)
        if (!Number.isInteger(categoryId)){
            return Promise.reject('jojooj')
        }
        const category = await checkExsistCategory(categoryId)
        if (!category){
            return Promise.reject('kjkjkkjjk')
        }
    }
    return Promise.resolve()
}

module.exports = {
    checkDeviceData,
    checkCategoryIdFather,
    checkExsistCategory,
    checkSubCategories
}