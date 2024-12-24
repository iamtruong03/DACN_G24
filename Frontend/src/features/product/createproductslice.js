import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  products: [],
  loading: false,
  error: null,
}

const addproductslice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    fetchProductstart: (state) => {
      state.loading = true
      state.error = null
    },
    fetchProductSuccess: (state, action) => {
      state.products = action.payload
      state.loading = false
      state.error = null
    },
    fetchProductFail: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    addProdut: (state, action) => {
      state.products.push(action.payload)
    },
  },
})
export const {
  fetchProductstart,
  fetchProductSuccess,
  fetchProductFail,
  addProdut,
} = addproductslice.actions
export default addproductslice.reducer
