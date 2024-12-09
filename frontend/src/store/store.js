import { configureStore } from '@reduxjs/toolkit'
import authReducer from "@/slice/authSlice"
import taskReducer from "@/slice/taskSlice"

export default configureStore({
  reducer: {
    auth: authReducer,
    task: taskReducer
  }
})