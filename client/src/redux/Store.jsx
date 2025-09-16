import { configureStore } from '@reduxjs/toolkit'
import authReducer from './Features/authSlice'
import holidayReducer from "./Features/holidaysSlice"
export const store = configureStore({
    reducer:{
       auth:authReducer, 
       holidays: holidayReducer,
       
    }
})
export default store
