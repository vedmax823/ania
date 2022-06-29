import {$host} from "./index";

export const loginUser = async (loginObj) => {
    const {data} = await $host.post('api/users/login', loginObj)
    localStorage.setItem('token', data.accessToken)
    return data
}
