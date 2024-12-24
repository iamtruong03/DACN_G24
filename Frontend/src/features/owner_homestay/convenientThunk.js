import {
  fetchProductsStart,
  fetchProductsSuccess,
  fetchProductsFailure,
} from '../owner_homestay/convenientSlice'
import { instance } from '../../app/axiosConfig'

const BASE_URL = '/api/v2/convenient'

export const fetchConvenient = () => async (dispatch) => {
  dispatch(fetchProductsStart())
  try {
    const response = await instance.get(BASE_URL)
    dispatch(fetchProductsSuccess(response.data.data)) // Lấy dữ liệu từ response.data.data
  } catch (error) {
    dispatch(fetchProductsFailure(error.message))
  }
}
