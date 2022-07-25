import {$authHost } from "./index";

export const getCategotyList = async () => {
    const {data} = await $authHost.get('api/admin/category_list')
    return data
}

export const createNewCategoty = async (category) => {
    const {data} = await $authHost.post('api/admin/category', category)
    return data
}