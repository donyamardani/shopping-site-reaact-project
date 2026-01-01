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
                if(e.id==productId){
                    e.quantity=e.quantity-1
                    state.totalPrice= state.totalPrice- e?.attributes?.price / 100
                    if(e.quantity==0){
                        return false
                    }
                }
                return e
            })
        },
        add(state,action){
            let add=false
            const product=action.payload
            state.totalPrice=state.totalPrice + product?.attributes?.price / 100
            state.items=state.items?.map(e=>{
                if(e.id == product.id){
                    e.quantity=e.quantity+1
                    add=true
                }
                return e
            })
           if(!add){
            state.items.push({...product,quantity:1})
           }
        }
    }
})
export const {add,remove,clear}=cartSlice.actions
export default cartSlice.reducer