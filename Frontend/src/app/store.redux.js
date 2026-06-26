import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/auth.silice"
import teacherReducer from "../features/Teacher/Teacher_slice"
export const store = configureStore({
    reducer:{
    auth:authReducer,
    teacher:teacherReducer
    }
});