import axios from 'axios'

const $host = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    crossDomain: true,
    withCredentials: true
})

const $authHost = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    crossDomain: true,
    withCredentials: true
})

const authInterceptor = config => {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
    return config
}

$authHost.interceptors.request.use(authInterceptor)

$authHost.interceptors.response.use((config) => {
    return config;
},async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true;
        try {
            const response = await $authHost.get(`${process.env.REACT_APP_API_URL}api/users/refresh`)
            localStorage.setItem('token', response.data.accessToken);
            return $authHost.request(originalRequest);
        } catch (e) {
            throw e
        }
    }
    throw error;
})


export {
    $host,
    $authHost
}