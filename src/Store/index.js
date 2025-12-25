import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./Slices/CartSlice";
import authSliceReducer from "./Slices/AuthSlice";



const store=configureStore({
    reducer:{
        auth:authSliceReducer,
        cart:cartSlice,
    }
})

export default store