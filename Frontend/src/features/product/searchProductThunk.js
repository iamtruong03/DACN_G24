import {
  fetchProductsStart,
  fetchProductsSuccess,
  fetchProductsFailure,
  fetchConvenientsSuccess,
  fetchProductPromotionSuccess,
} from './productSlide'
import { instance } from '../../app/axiosConfig'
import axios from 'axios'

const BASE_URL = '/homestay/get-all?size=999'

export const fetchSearchProducts =
  (
    startDate,
    enDate,
    nameOrAddress,
    numberPerson,
    roomNumber,
    priceMin,
    priceMax,
    convenientHomestayList,
    page,
  ) =>
  async (dispatch) => {
    dispatch(fetchProductsStart())
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/homestay/search?dateFrom=${startDate}&dateTo=${enDate}&nameOrAddress=${nameOrAddress}&numberPerson=${numberPerson}&roomNumber=${roomNumber}&priceMin=${priceMin}&priceMax=${priceMax}&${convenientHomestayList}&size=10&page=${page}`,
      )
      dispatch(fetchProductsSuccess(response.data.data.data)) // Lấy dữ liệu từ response.data.data
    } catch (error) {
      dispatch(fetchProductsFailure(error.message))
    }
  }
export const fetchSearchProductsByPage =
  (
    startDate,
    enDate,
    nameOrAddress,
    numberPerson,
    roomNumber,
    priceMin,
    priceMax,
    convenientHomestayList,
    page,
  ) =>
  async (dispatch) => {
    dispatch(fetchProductsStart())
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/homestay/search?dateFrom=${startDate}&dateTo=${enDate}&nameOrAddress=${nameOrAddress}&numberPerson=${numberPerson}&roomNumber=${roomNumber}&priceMin=${priceMin}&priceMax=${priceMax}&convenientHomestayList=${convenientHomestayList}&size=10&page=${page}`,
      )
      dispatch(fetchProductsSuccess(response.data.data)) // Lấy dữ liệu từ response.data.data
    } catch (error) {
      dispatch(fetchProductsFailure(error.message))
    }
  }
// get convinent homestay
export const getAllConvinentHomestay = () => async (dispatch) => {
  dispatch(fetchProductsStart())
  try {
    const response = await axios.get(
      'http://localhost:8080/api/v1/convenient-homestay-type?size=99',
    )
    dispatch(fetchConvenientsSuccess(response.data.data)) // Lấy dữ liệu từ response.data.data
  } catch (error) {
    dispatch(fetchProductsFailure(error.message))
  }
}
//get promotion
export const fetchSearchProductsForPromotion =
  (startDate, enDate, page) => async (dispatch) => {
    dispatch(fetchProductsStart())
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/homestay/search-by-promotion?dateFrom=${startDate}&dateTo=${enDate}&size=999`,
      )
      dispatch(fetchProductPromotionSuccess(response.data.data)) // Lấy dữ liệu từ response.data.data
    } catch (error) {
      dispatch(fetchProductsFailure(error.message))
    }
  }
