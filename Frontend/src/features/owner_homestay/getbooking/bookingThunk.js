import {
  fetchBookingsStart,
  fetchBookingsSuccess,
  fetchBookingsFailure,
  fetchImgUploadSuccess,
  fetchBookingsOwnerSuccess,
} from './bookingSlice'
import { instance } from '../../../app/axiosConfig'
import axios from 'axios'
import { addConvenientFailed } from '../../admin/adminSlice'

const BASE_URL = '/api/v2/booking'

export const fetchBooking = (id) => async (dispatch) => {
  dispatch(fetchBookingsStart())
  try {
    const response = await instance.get(`/api/v2/booking/byid?id=${id}`)
    dispatch(fetchBookingsSuccess(response.data.data.data)) // Lấy dữ liệu từ response.data.data
  } catch (error) {
    dispatch(fetchBookingsFailure(error.message))
  }
}

export const getBookingByNameHomestay =
  (id, name, nameBooking, statusBooking, serchYear, serchMonth) =>
  async (dispatch) => {
    try {
      const response = await instance.get(
        `http://localhost:8080/api/v2/booking?idOwner=${id}&size=99&homestayName=${name}&nameBooking=${nameBooking}&statusBooking=${statusBooking}&year=${serchYear}&month=${serchMonth}`,
      )
      dispatch(fetchBookingsOwnerSuccess(response.data.data.data)) // Lấy dữ liệu từ response.data.data
    } catch (error) {
      dispatch(addConvenientFailed(error.message))
    }
  }
export const fetchBaseImg = (id) => async (dispatch) => {
  dispatch(fetchBookingsStart())
  try {
    const response = await instance.get(
      `/api/v2/homestay/get-imghomestay?id=${id}`,
    )
    dispatch(fetchImgUploadSuccess(response.data.data)) // Lấy dữ liệu từ response.data.data
  } catch (error) {
    dispatch(fetchBookingsFailure(error.message))
  }
}
export const addImgUpload = (idHomestay, img) => async (dispatch) => {
  dispatch(fetchBookingsStart())
  const formData = new FormData()
  formData.append('idHomestay', idHomestay)
  img.forEach((imageUrl) => {
    formData.append('img', imageUrl)
  })
  try {
    await instance.post(
      'http://localhost:8080/api/v2/img/add-img-homestay',
      formData,
    )
  } catch (error) {
    dispatch(fetchBookingsFailure(error.message))
  }
}
export const deleteImg = (id) => async (dispatch) => {
  dispatch(fetchBookingsStart())
  try {
    await instance.delete(`/api/v2/img/delete-img-homestay?idImgHomestay=${id}`)
  } catch (error) {
    dispatch(fetchBookingsFailure(error.message))
  }
}
