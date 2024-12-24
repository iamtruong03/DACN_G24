import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  provinces: [],
  loading: false,
  error: null,
}

const provinceSlice = createSlice({
  name: 'province',
  initialState,
  reducers: {
    fetchProvinceStart: (state) => {
      state.loading = true
      state.error = null
    },
    fetchProvinceSuccess: (state, action) => {
      state.provinces = action.payload
      state.loading = false
      state.error = null
    },
    fetchProvinceFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    // deleteRegion: (state, action) => {
    //   const productIdToDelete = action.payload;
    //   state.convenients = state.convenients.filter(convenient => convenient.id !== productIdToDelete);
    // },
    // addRegion: (state, action) => {
    //   state.convenients.push(action.payload)
    // }
  },
})

export const {
  fetchProvinceStart,
  fetchProvinceSuccess,
  fetchProvinceFailure,
} = provinceSlice.actions
export default provinceSlice.reducer
