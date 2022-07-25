import { $host } from './index'

export const getCategories = async () => {
    const {data} = await $host.get('api/interface/categories')
    return data
}