import {
  fetchstatisticalStart,
  fetchStatisticalByYearSuccess,
  fetchstatisticalFailure,
  fetchStatisticalByMonthSuccess,
  fetchStatisticalByYearsSuccess,
  fetchStatisticalByDaySuccess,
  fetchStatisticalByTop5Success,
  fetchStatisticalTopBooking,
  fetchStatisticalByBookingTodaySuccess,
  fetchStatisticalIsAwait,
} from './statisticalSlice'
import { instance } from '../../../app/axiosConfig'

export const fetchStatisticalByYear = (id, year) => async (dispatch) => {
  // Extract the year from the date
  // const yearValue = new Date(year).getFullYear()

  dispatch(fetchstatisticalStart())
  try {
    const response = await instance.get(
      `/api/v2/statictical/year?idOwnerHomestay=${id}&year=${year}`,
    )
    dispatch(fetchStatisticalByYearSuccess(response.data.data))
  } catch (error) {
    dispatch(fetchstatisticalFailure(error.message))
  }
}
export const fetchStatisticalByYears = (id, year) => async (dispatch) => {
  dispatch(fetchstatisticalStart())
  try {
    const response = await instance.get(
      `/api/v2/statictical/month-and-year?idOwnerHomestay=${id}&year=${year}`,
    )
    dispatch(fetchStatisticalByYearsSuccess(response.data.data)) // Lấy dữ liệu từ response.data.data
  } catch (error) {
    dispatch(fetchstatisticalFailure(error.message))
  }
}
export const fetchStatisticalByMonth =
  (id, month, year) => async (dispatch) => {
    dispatch(fetchstatisticalStart())
    try {
      const response = await instance.get(
        `/api/v2/statictical/month-and-year?idOwnerHomestay=${id}&year=${year}&month=${month}`,
      )
      dispatch(fetchStatisticalByMonthSuccess(response.data.data)) // Lấy dữ liệu từ response.data.data
    } catch (error) {
      dispatch(fetchstatisticalFailure(error.message))
    }
  }
export const fetchStatisticalByDay =
  (id, day, month, year) => async (dispatch) => {
    dispatch(fetchstatisticalStart())
    try {
      const response = await instance.get(
        `/api/v2/statictical/month-and-year?idOwnerHomestay=${id}&year=${year}&month=${month}&date=${day}`,
      )
      dispatch(fetchStatisticalByDaySuccess(response.data.data)) // Lấy dữ liệu từ response.data.data
    } catch (error) {
      dispatch(fetchstatisticalFailure(error.message))
    }
  }
export const fetchStatisticalByTop5 =
  (idOwnerHomestay, year) => async (dispatch) => {
    dispatch(fetchstatisticalStart())
    const yearValue = new Date(year).getFullYear()
    try {
      const response = await instance.get(
        `/api/v2/statictical/top5?idOwnerHomestay=${idOwnerHomestay}&year=${year}&size=5`,
      )
      dispatch(fetchStatisticalByTop5Success(response.data.data)) // Lấy dữ liệu từ response.data.data
    } catch (error) {
      dispatch(fetchstatisticalFailure(error.message))
    }
  }
export const fetchTopUserBooking = (idOwnerHomestay) => async (dispatch) => {
  dispatch(fetchstatisticalStart())

  try {
    const response = await instance.get(
      `/api/v2/booking/user?idowner=${idOwnerHomestay}&size=99`,
    )
    dispatch(fetchStatisticalTopBooking(response.data.data.data)) // Lấy dữ liệu từ response.data.data
  } catch (error) {
    dispatch(fetchstatisticalFailure(error.message))
  }
}
export const fetchStatisticalByBookingToday =
  (idOwnerHomestay) => async (dispatch) => {
    dispatch(fetchstatisticalStart())

    try {
      const response = await instance.get(
        `/api/v2/booking/number-of-book-today?idowner=${idOwnerHomestay}&size=99`,
      )
      dispatch(fetchStatisticalByBookingTodaySuccess(response.data.data)) // Lấy dữ liệu từ response.data.data
    } catch (error) {
      dispatch(fetchstatisticalFailure(error.message))
    }
  }
export const fetchStatisticalAwait = (idOwnerHomestay) => async (dispatch) => {
  dispatch(fetchstatisticalStart())

  try {
    const response = await instance.get(
      `/api/v2/booking/number-of-book-cho?idowner=${idOwnerHomestay}&size=99`,
    )
    dispatch(fetchStatisticalIsAwait(response.data.data)) // Lấy dữ liệu từ response.data.data
  } catch (error) {
    dispatch(fetchstatisticalFailure(error.message))
  }
}
