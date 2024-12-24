// src/features/product/productSlice.js
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  homestays: [],
  loading: false,
  error: null,
}

const ownerHomestaySlice = createSlice({
  name: 'homestay',
  initialState,
  reducers: {
    fetchProductsStart: (state) => {
      state.loading = true
      state.error = null
    },
    fetchProductsSuccess: (state, action) => {
      state.homestays = action.payload
      state.loading = false
      state.error = null
    },
    fetchProductsFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    deleteProduct: (state, action) => {
      const productIdToDelete = action.payload
      state.homestays = state.homestays.filter(
        (homestay) => homestay.id !== productIdToDelete,
      )
    },
    addproduct: (state, action) => {
      state.homestays.push(action.payload)
    },
    edithomestay: (state, action) => {
      const productIdToEdit = action.payload
      state.homestays = state.homestays.find(
        (homestay) => homestay.id === productIdToEdit,
      )
    },
  },
})

export const {
  fetchProductsStart,
  fetchProductsSuccess,
  fetchProductsFailure,
  deleteProduct,
  addproduct,
  edithomestay,
} = ownerHomestaySlice.actions
export default ownerHomestaySlice.reducer
