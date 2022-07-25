import {$host, $authHost} from "./index";

export const loginUser = async (loginObj) => {
    const {data} = await $host.post('api/users/login', loginObj)
    localStorage.setItem('token', data.accessToken)
    return data
}

export const refreshUser = async() => {
    const data = $host.get(`${process.env.REACT_APP_API_URL}api/users/refresh`)
    return data
}
