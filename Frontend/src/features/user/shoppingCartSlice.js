import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  shoppingCart: [],
  loading: false,
  error: null,
}

const shoppingcartslice = createSlice({
  name: 'shoppingcart',
  initialState,
  reducers: {
    fetchShoppingCartstart: (state) => {
      state.loading = true
      state.error = null
    },
    fetchShoppingCartSuccess: (state, action) => {
      state.shoppingCart = action.payload
      state.loading = false
      state.error = null
    },
    fetchShoppingCartFail: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
  },
})
export const {
  fetchShoppingCartstart,
  fetchShoppingCartSuccess,
  fetchShoppingCartFail,
} = shoppingcartslice.actions
export default shoppingcartslice.reducer
