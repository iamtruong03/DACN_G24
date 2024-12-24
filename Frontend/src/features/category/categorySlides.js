import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    categorys: [],
    loading: false,
    error: null,
};

const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        fetchCategorysStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchCategorysSuccess: (state, action) => {
            state.categorys = action.payload;
            state.loading = false;
            state.error = null;
        },
        fetchCategorysFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const { fetchCategorysStart, fetchCategorysSuccess, fetchCategorysFailure } = categorySlice.actions;
export default categorySlice.reducer;