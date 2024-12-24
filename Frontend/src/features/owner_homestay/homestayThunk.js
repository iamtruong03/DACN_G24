import {
  fetchProductsStart,
  fetchProductsSuccess,
  fetchProductsFailure,
  addproduct,
  edithomestay,
} from '../owner_homestay/onwerHomestaySlice'
import { instance } from '../../app/axiosConfig'
import { message } from 'antd'

const BASE_URL = '/api/v2/homestay'
export const fetchHomestay = (status) => async (dispatch) => {
  dispatch(fetchProductsStart())
  try {
    const id = JSON.parse(localStorage.getItem('ownerDetail'))?.data.id
    const response = await instance.get(
      BASE_URL + `/get-homestay-by-id?id=${id}&size=999&status=${status}`,
    )
    dispatch(fetchProductsSuccess(response.data.data.data))
  } catch (error) {
    dispatch(fetchProductsFailure(error.message))
    message.info(error.request.responseText)
  }
}

export const addHomestay =
  (homestay, imgUrl, convenient) => async (dispatch) => {
    const formData = new FormData()
    imgUrl.forEach((imageUrl) => {
      formData.append('image', imageUrl)
    })
    formData.append('homestay', JSON.stringify(homestay))
    formData.append('convenient', convenient)
    dispatch(fetchProductsStart())
    try {
      await instance.post(BASE_URL + '/add-homestay', formData)
    } catch (error) {
      dispatch(fetchProductsFailure(error.message))
    }
  }
export const EditHomestay =
  (homestay, imgUrl, id, convenient) => async (dispatch) => {
    const formData = new FormData()
    // imgUrl.forEach((imageUrl) => {
    //   formData.append('image', imageUrl)
    // })
    formData.append('homestay', JSON.stringify(homestay))
    formData.append('convenient', convenient)
    dispatch(fetchProductsStart())
    try {
      await instance.put(BASE_URL + `/update-homestays?id=${id}`, formData)
    } catch (error) {
      dispatch(fetchProductsFailure(error.message))
    }
  }
export const UpdateStatus = (id) => async (dispatch) => {
  dispatch(fetchProductsStart())
  try {
    await instance.put(BASE_URL + `/delete-homestays?id=${id}`)
  } catch (error) {
    dispatch(fetchProductsFailure(error.message))
    message.info(error.request.responseText)
  }
}
export const UpdateStatusToUpdating = (id) => async (dispatch) => {
  dispatch(fetchProductsStart())
  try {
    await instance.put(BASE_URL + `/status-homestay?id=${id}`)
  } catch (error) {
    dispatch(fetchProductsFailure(error.message))
  }
}
