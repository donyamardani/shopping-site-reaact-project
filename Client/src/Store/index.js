import authSliceReducer from "./Slices/AuthSlice";
import { configureStore } from "@reduxjs/toolkit";
import CartSlice from "./Slices/CartSlice";
const store=configureStore({
    reducer:{
        auth:authSliceReducer,
        cart:CartSlice
    }
})
export default store