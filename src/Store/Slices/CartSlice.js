import {createSlice} from "@reduxjs/toolkit"

const initialState={
    items:[],
    totalPrice:0
}
const cartSlice=createSlice(
    {
        name:'catrSlice',
        initialState,
        reducer:{
            clear(state){
                state.items=[]
                state.totalPrice=0
            },
            remove(state,action){
                const ProductId=action.payload
                state.items=state.items.filter(e=>{
                    if(e.id==ProductId){
                        e.quantity=e.quantity-1
                        if(e.quantity==0){return false}
                    }
                    return e
                })
            },
            add(state,action){
                let add=false
                const Product=action.payload
                state.totalPrice=state.totalPrice+Product?.attributes?.price/100
                state.items=state.items?.map(e=>{
                    if(e.id==Product.id){
                        e.quantity=e.quantity+1
                        add=true
                    }
                    return e
                })
                if(!add){
                    state.items.push({...Product,quantity:1})
                }
            }
        }
    }
)

export const{add,remove,clear}=cartSlice.actions
export default cartSlice.reducer