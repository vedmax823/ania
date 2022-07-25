import {createSlice} from '@reduxjs/toolkit'
import jwt_decode from "jwt-decode"
let user = {isLogin: false, isAdmin : false}
const localToken = localStorage.getItem('token')

if (localToken){
    const localUser = jwt_decode(localToken)
    user = {isLogin : true, isAdmin : localUser.role === 'ADMIN', ...localUser}
}

export const userSlice = createSlice({
    name : 'user',
    initialState : {
        data : user
    },
    reducers:{
        setUser :(state, user) => {
            state.data = {isLogin : true, isAdmin : user.payload.role === 'ADMIN', ...user.payload}
        },
        destroyUser : state => {
            state.data = {isLogin : false, isAdmin : false}
            localStorage.removeItem('token')
        }
    }
})

export const {setUser, destroyUser} = userSlice.actions

export default userSlice.reducer