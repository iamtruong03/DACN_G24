// src/features/product/productSlice.js
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  convenients: [],
  loading: false,
  error: null,
}

const convenientSlice = createSlice({
  name: 'convenient',
  initialState,
  reducers: {
    fetchProductsStart: (state) => {
      state.loading = true
      state.error = null
    },
    fetchProductsSuccess: (state, action) => {
      state.convenients = action.payload
      state.loading = false
      state.error = null
    },
    fetchProductsFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    deleteProduct: (state, action) => {
      const productIdToDelete = action.payload
      state.convenients = state.convenients.filter(
        (convenient) => convenient.id !== productIdToDelete,
      )
    },
    addproduct: (state, action) => {
      state.convenients.push(action.payload)
    },
  },
})

export const {
  fetchProductsStart,
  fetchProductsSuccess,
  fetchProductsFailure,
  deleteProduct,
  addproduct,
} = convenientSlice.actions
export default convenientSlice.reducer
