import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { CartItemType } from '../../services/productService';

interface CartProduct extends CartItemType {
    amount: number
}

export const cartSlice = createSlice({
    name:"cart",
    initialState: [] as CartProduct[],
    reducers:{
        addToCart:(state, action:PayloadAction<CartItemType>)=>{
            const index = state.findIndex(item=>item.id === action.payload.id)
            if(index !== -1) state[index].amount += 1
            else state.push({...action.payload, amount:1})
        },
        removeFromCart:(state, action:PayloadAction<number>) => {
            const index = state.findIndex((item)=> item.id === action.payload)
            if(state[index].amount > 1) state[index].amount -= 1
            else return state.filter(item=>item.id !== action.payload)
        }
    }
})

export const selectCartItems = (state:RootState) => state.cart
export const selectTotalPrice = (state:RootState) => state.cart.reduce((acc, item)=> acc += (item.amount * item.price),0)
export const getTotalItems = (state:RootState) => state.cart.reduce((acc:number, item)=> acc + item.amount, 0)

export const { addToCart, removeFromCart } = cartSlice.actions
export default cartSlice.reducer