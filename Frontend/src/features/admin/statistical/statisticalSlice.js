import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    statisticalByYear: [],
    statisticalByMonth: [],
    statisticalByYears: [],
    statisticalByDay: [],
    statisticalByTop5: [],
    loading: false,
    error: null,
};

const statisticalSlice = createSlice({
    name: 'statistical',
    initialState,
    reducers: {
        fetchstatisticalStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchStatisticalByYearSuccess: (state, action) => {
            state.statisticalByYear = action.payload;
            state.loading = false;
            state.error = null;
        },
        fetchStatisticalByYearsSuccess: (state, action) => {
            state.statisticalByYears = action.payload;
            state.loading = false;
            state.error = null;
        },
        fetchStatisticalByMonthSuccess: (state, action) => {
            state.statisticalByMonth = action.payload;
            state.loading = false;
            state.error = null;
        },
        fetchStatisticalByTop5Success: (state, action) => {
            state.statisticalByTop5 = action.payload;
            state.loading = false;
            state.error = null;
        },
        fetchStatisticalByDaySuccess: (state, action) => {
            state.statisticalByDay = action.payload;
            state.loading = false;
            state.error = null;
        },
        fetchstatisticalFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

    },
});

export const { fetchstatisticalStart, fetchStatisticalByYearSuccess, fetchstatisticalFailure, fetchStatisticalByMonthSuccess, fetchStatisticalByYearsSuccess, fetchStatisticalByDaySuccess, fetchStatisticalByTop5Success } = statisticalSlice.actions;
export default statisticalSlice.reducer;