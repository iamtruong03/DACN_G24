import axios from 'axios'
import {
  fetchBookingsFailure,
  fetchBookingsStart,
  fetchCommentSuccess,
  fetchCommentUserSuccess,
} from './bookingSlice'
import { instance } from '../../../app/axiosConfig'

export const fetchComment = (id, page) => async (dispatch) => {
  dispatch(fetchBookingsStart())
  try {
    const response = await instance.get(
      `/api/v2/comment?idHomestay=${id}&size=10&page=${page}`,
    )
    dispatch(fetchCommentSuccess(response.data.data.data)) // Lấy dữ liệu từ response.data.data
  } catch (error) {
    dispatch(fetchBookingsFailure(error.message))
  }
}
export const fetchCommentUser = (id, page) => async (dispatch) => {
  dispatch(fetchBookingsStart())
  try {
    const response = await axios.get(
      `http://localhost:8080/api/v1/comment/by-user?idUser=${id}&size=10&page=${page}`,
    )
    dispatch(fetchCommentUserSuccess(response.data.data)) // Lấy dữ liệu từ response.data.data
  } catch (error) {
    dispatch(fetchBookingsFailure(error.message))
  }
}
export const addCommentByUser =
  (homestay, comment, user, multipartFiles, point) => async (dispatch) => {
    dispatch(fetchBookingsStart())
    const formData = new FormData()
    formData.append('homestay', homestay)
    formData.append('comment', comment)
    formData.append('user', user)
    multipartFiles.forEach((imageUrl) => {
      formData.append('multipartFiles', imageUrl)
    })
    formData.append('point', point)
    try {
      await instance.post(
        'http://localhost:8080/api/v1/comment/add-comment',
        formData,
      )
    } catch (error) {
      dispatch(fetchBookingsFailure(error.message))
    }
  }
