import { createSlice } from "@reduxjs/toolkit";
const initialState={
    items:[],
    totalPrice:0
}
const cartSlice=createSlice({
    name:'cartSlice',
    initialState,
    reducers:{
        clear(state){
            state.items=[]
            state.totalPrice=0
        },
        remove(state,action){
            const productId=action.payload
            state.items=state.items.filter(e=>{
                if(e._id==productId){
                    e.cartQuantity=e.cartQuantity-1
                    state.totalPrice= state.totalPrice- e?.price
                    if(e.cartQuantity==0){
                        return false
                    }
                }
                return e
            })
        },
        add(state,action){
            let add=false
            const product=action.payload
            state.totalPrice=state.totalPrice + product?.price
            state.items=state.items?.map(e=>{
                if(e._id == product._id){
                    e.cartQuantity=e.cartQuantity+1
                    add=true
                }
                return e
            })
           if(!add){
            state.items.push({...product,cartQuantity:1})
           }
        }
    }
})
export const {add,remove,clear}=cartSlice.actions
export default cartSlice.reducer