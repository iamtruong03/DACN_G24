import {
  fetchProductsStart,
  fetchProductsSuccess,
  fetchProductsFailure,
  fetchProductsDetailSuccess,
  fetchCommentProductSuccess,
  fetchAvgPointSuccess,
  getPaymentSuccess,
  addInfoBooking,
  getPaypalSuccess,
  checkBookingSuccess,
  checkHomestayHDSuccess,
  checkHomestayCDSuccess,
} from './productSlide'
import { instance } from '../../app/axiosConfig'
import axios from 'axios'
import { addBookingsSuccess } from '../owner_homestay/getbooking/bookingSlice'

const BASE_URL = '/homestay/get-all?size=999'

export const fetchProducts = () => async (dispatch) => {
  dispatch(fetchProductsStart())
  try {
    const response = await axios.get(
      'http://localhost:8080/api/v1/homestay?size=99',
    )
    dispatch(fetchProductsSuccess(response.data.data.data)) // Lấy dữ liệu từ response.data.data
  } catch (error) {
    dispatch(fetchProductsFailure(error.message))
  }
}

export const getProducts = (page) => async (dispatch) => {
  dispatch(fetchProductsStart())
  try {
    const response = await axios.get(
      `http://localhost:8080/api/v1/homestay?size=10&page=${page}`,
    )
    dispatch(fetchProductsSuccess(response.data.data.data)) // Lấy dữ liệu từ response.data.data
  } catch (error) {
    dispatch(fetchProductsFailure(error.message))
  }
}

export const getOneProduct = (id) => async (dispatch) => {
  try {
    const response = await axios.get(
      'http://localhost:8080/api/v1/homestay/getOne?homestayId=' + id,
    )
    dispatch(fetchProductsDetailSuccess(response.data.data)) // Lấy dữ liệu từ response.data.data
    // console.log(response.data.data);
  } catch (error) {
    dispatch(fetchProductsFailure(error.message))
  }
}

export const getCommentProduct = (id, page) => async (dispatch) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/v1/comment?homestayId=${id}&size=10&page=${page}`,
    )
    dispatch(fetchCommentProductSuccess(response.data.data.data)) // Lấy dữ liệu từ response.data.data
    // console.log(response.data.data);
  } catch (error) {
    dispatch(fetchProductsFailure(error.message))
  }
}

export const getAvgPoint = (id) => async (dispatch) => {
  try {
    const response = await axios.get(
      'http://localhost:8080/api/v1/comment/avg-point?homestayId=' + id,
    )
    dispatch(fetchAvgPointSuccess(response.data.data)) // Lấy dữ liệu từ response.data.data
    // console.log(response.data.data);
  } catch (error) {
    dispatch(fetchProductsFailure(error.message))
  }
}

export const getNumberPersonPoint = (id) => async (dispatch) => {
  try {
    const response = await axios.get(
      'http://localhost:8080/api/v1/comment/number-of-reviewers?homestayId' +
      id,
    )
    dispatch(fetchAvgPointSuccess(response.data.data)) // Lấy dữ liệu từ response.data.data
    // console.log(response.data.data);
  } catch (error) {
    dispatch(fetchProductsFailure(error.message))
  }
}

export const checkBooking = (id, startDate, endDate) => async (dispatch) => {
  try {
    const response = await instance.get(
      `http://localhost:8080/api/v1/cart/check-available?homestayId=${id}&startDate=${startDate}&endDate=${endDate}`
    )
    dispatch(checkBookingSuccess(response.data.data)) // Lấy dữ liệu từ response.data.data
    // console.log(response.data.data);
  } catch (error) {
    dispatch(fetchProductsFailure(error.message))
  }
}

export const getPayment = (price) => async (dispatch) => {
  try {
    const response = await instance.post(
      'http://localhost:8080/api/v1/payment/vnpay',
      price,
    )
    dispatch(getPaymentSuccess(response.data.data)) // Lấy dữ liệu từ response.data.data
    // console.log(response.data.data);
  } catch (error) {
    dispatch(fetchProductsFailure(error.message))
  }
}

export const getPaymentPayPal = (price) => async (dispatch) => {
  try {
    const response = await instance.post(
      'http://localhost:8080/api/v1/payment/paypal',
      price,
    )
    dispatch(getPaypalSuccess(response.data.data)) // Lấy dữ liệu từ response.data.data
    // console.log(response.data.data);
  } catch (error) {
    dispatch(fetchProductsFailure(error.message))
  }
}

export const addBooking = (booking) => async (dispatch) => {
  try {
    console.log(booking.totalPrice)
    const response = await instance.post(
      'http://localhost:8080/api/v1/booking/create',
      booking,
    )
    dispatch(addBookingsSuccess(response.data.data)) // Lấy dữ liệu từ response.data.data
    // console.log(response.data.data);
  } catch (error) {
    dispatch(fetchProductsFailure(error.message))
  }
}

export const cancelBooking = (bookingId, node) => async (dispatch) => {
  try {
    const response = await instance.put(
      'http://localhost:8080/api/v1/booking/cancel/' + bookingId,
      { note: node },
    )
    dispatch(addBookingsSuccess(response.data.data)) // Lấy dữ liệu từ response.data.data
    // console.log(response.data.data);
  } catch (error) {
    dispatch(fetchProductsFailure(error.message))
  }
}

export const updateBooking = (bookingId) => async (dispatch) => {
  try {
    const response = await instance.put(
      'http://localhost:8080/api/v1/booking/update?bookingId=' + bookingId,
    )
    dispatch(addBookingsSuccess(response.data.data)) // Lấy dữ liệu từ response.data.data
    // console.log(response.data.data);
  } catch (error) {
    dispatch(fetchProductsFailure(error.message))
  }
}

export const sendBill = (bookingId) => async (dispatch) => {
  try {
    await instance.get(
      'http://localhost:8080/api/v1/payment/send-mail?bookingId=' + bookingId,
    )
    // console.log(response.data.data);
  } catch (error) {
    dispatch(fetchProductsFailure(error.message))
  }
}
export const checkBooked = () => async (dispatch) => {
  try {
    const response = await instance.get(
      'http://localhost:8080/api/v1/cart/check-booked',
    )
    // console.log(response.data.data);
  } catch (error) {
  }
}


export const getAllHomestay = () => async (dispatch) => {
  dispatch(fetchProductsStart())
  try {
    const response = await instance.get('/api/v3/homestay?size=99')
    dispatch(fetchProductsSuccess(response.data.data.data)) // Lấy dữ liệu từ response.data.data
  } catch (error) {
    dispatch(fetchProductsFailure(error.message))
  }
}

export const getAllHomestayByStatus = (status) => async (dispatch) => {
  dispatch(fetchProductsStart())
  try {
    const response = await instance.get(
      '/api/v3/homestay?size=99&statusHomestay=' + status,
    )
    dispatch(fetchProductsSuccess(response.data.data.data)) // Lấy dữ liệu từ response.data.data
  } catch (error) {
    dispatch(fetchProductsFailure(error.message))
  }
}
export const getCountHomestaySuccess = () => async (dispatch) => {
  try {
    const response = await instance.get(
      '/api/v3/homestay/countHD',
    )
    dispatch(checkHomestayHDSuccess(response.data.data)) // Lấy dữ liệu từ response.data.data
  } catch (error) {
    dispatch(fetchProductsFailure(error.message))
  }
}

export const getCountHomestayWait = () => async (dispatch) => {
  try {
    const response = await instance.get(
      '/api/v3/homestay/countCD',
    )
    dispatch(checkHomestayCDSuccess(response.data.data)) // Lấy dữ liệu từ response.data.data
  } catch (error) {
    dispatch(fetchProductsFailure(error.message))
  }
}

export const getAllHomestayByNameOwner = (status, name, ownerName) => async (dispatch) => {
  dispatch(fetchProductsStart())
  console.log(1)
  try {
    const response = await instance.get(
      '/api/v3/homestay?size=99&statusHomestay=' +
      status +
      '&nameOwner=' +
      name +
      '&nameHomestay=' +
      ownerName,
    )
    dispatch(fetchProductsSuccess(response.data.data.data)) // Lấy dữ liệu từ response.data.data
  } catch (error) {
    dispatch(fetchProductsFailure(error.message))
  }
}

export const getAllHomestayByHomestayName =
  (status, name, ownerName) => async (dispatch) => {
    dispatch(fetchProductsStart())
    try {
      const response = await instance.get(
        '/api/v3/homestay?size=99&statusHomestay=' +
        status +
        '&nameHomestay=' +
        name + '&nameOwner=' +
        ownerName,
      )
      dispatch(fetchProductsSuccess(response.data.data.data)) // Lấy dữ liệu từ response.data.data
    } catch (error) {
      dispatch(fetchProductsFailure(error.message))
    }
  }

export const deleteCartUser = (idUser, idHomestay) => async (dispatch) => {
  try {
    const response = await instance.delete(
      `http://localhost:8080/api/v1/cart/delete-cart?userId=${idUser}&homestayId=${idHomestay}`,
    )
    // console.log(response.data.data);
  } catch (error) {
    dispatch(fetchProductsFailure(error.message))
  }
}
