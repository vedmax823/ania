import {configureStore} from '@reduxjs/toolkit'
import userReducer from '../slicers/userSlice'

export default configureStore({
    reducer : {
        user : userReducer
    }
})