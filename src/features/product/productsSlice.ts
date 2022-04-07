import { createSlice, createAsyncThunk, PayloadAction, createEntityAdapter,  } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { CartItemType } from '../../services/productService';
import productService from '../../services/productService';


  interface ProductSliceState {
    // products: CartItemType[]
    isLoading: boolean
    errorMessage?:string
  }
  
const productAdapter = createEntityAdapter<CartItemType>()
const initialState = productAdapter.getInitialState<ProductSliceState>({
    isLoading:false,
    errorMessage:undefined,
  })

  export const getAllProducts = createAsyncThunk(
      "products/getProducts",
      async (_, { dispatch }) => {
          const  res:any = await productService.getProducts()
         return dispatch(productsReceived(res.data))
      }
  )


const productsSlice = createSlice({
    name:"products",
    initialState,
    reducers:{
        productsReceived:(state, action)=>{
            productAdapter.setAll(state,action.payload)
            state.isLoading = false
            state.errorMessage = undefined
        }
    },
    extraReducers: builder => {
        builder.addCase(getAllProducts.fulfilled, (state, action) => {
            productAdapter.setAll(state, action.payload)
            state.isLoading = false
            state.errorMessage = undefined
        })
        builder.addCase(getAllProducts.rejected, (state, action) => ({
          ...state,
          isLoading : false,
          errorMessage:action.error.message
        }))
        builder.addCase(getAllProducts.pending, (state, action) => ({
          ...state,
          errorMessage:undefined,
          isLoading:true
        }))
      }
})

const {productsReceived} = productsSlice.actions
export const selectProducts = (state:RootState) => state.products.entities
export const selectIsLoading = (state:RootState) => state.products.isLoading
export const selectError = (state:RootState) => state.products.errorMessage

export const {
    selectAll: selectAllProducts,
    selectById: selectProductById,
    selectEntities: selectProductEntities,
    selectIds: selectProductIds,
    selectTotal: selectTotalProducts
  } = productAdapter.getSelectors<RootState>(state => state.products)
  export default productsSlice.reducer