import {
  fetchProvinceStart,
  fetchProvinceSuccess,
  fetchProvinceFailure,
} from './provinceSlice'
import { instance } from '../../../app/axiosConfig'

const BASE_URL = '/api/v2/province'

export const fetchProvince = () => async (dispatch) => {
  dispatch(fetchProvinceStart())
  try {
    const response = await instance.get(BASE_URL)
    dispatch(fetchProvinceSuccess(response.data.data)) // Lấy dữ liệu từ response.data.data
  } catch (error) {
    dispatch(fetchProvinceFailure(error.message))
  }
}
