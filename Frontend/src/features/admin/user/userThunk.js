import { instance } from '../../../app/axiosConfig'
import {
  fetchCommentUser,
  fetchOwnerSuccess,
  fetchUserFailure,
  fetchUserSuccess,
} from './userSlice'

export const fetchAllUser = () => async (dispatch) => {
  try {
    const response = await instance.get(`/api/v3/user`)
    dispatch(fetchUserSuccess(response.data.data))
  } catch (error) {
    dispatch(fetchUserFailure(error.message))
  }
}

export const fetchAllOwner = () => async (dispatch) => {
  try {
    const response = await instance.get(`/api/v3/owner-homestay`)
    dispatch(fetchOwnerSuccess(response.data.data))
  } catch (error) {
    dispatch(fetchUserFailure(error.message))
  }
}

export const fetchAllUserByName = (name) => async (dispatch) => {
  try {
    const response = await instance.get(`/api/v3/user?userName=${name}`)
    dispatch(fetchUserSuccess(response.data.data))
  } catch (error) {
    dispatch(fetchUserFailure(error.message))
  }
}

export const fetchAllOwnerByName = (name) => async (dispatch) => {
  try {
    const response = await instance.get(
      `/api/v3/owner-homestay?nameOwner=${name}`,
    )
    dispatch(fetchOwnerSuccess(response.data.data))
  } catch (error) {
    dispatch(fetchUserFailure(error.message))
  }
}

export const getCommentByUser = (id, username, page) => async (dispatch) => {
  try {
    const response = await instance.get(
      `api/v3/comment?homestayId=${id}&size=10&page=${page}&userName=${username}`,
    )
    dispatch(fetchCommentUser(response.data.data))
  } catch (error) {
    dispatch(fetchUserFailure(error.message))
  }
}

export const getCommentByUserId = (id, idUser) => async (dispatch) => {
  console.log(1)
  try {
    const response = await instance.get(
      `api/v3/comment?userId=${idUser}&homestayName=${id}`,
    )
    dispatch(fetchCommentUser(response.data.data))
  } catch (error) {
    dispatch(fetchUserFailure(error.message))
  }
}
export const getCommentByHomestay = (id) => async (dispatch) => {
  try {
    const response = await instance.get(`api/v3/comment?homestayId=${id}`)
    dispatch(fetchCommentUser(response.data.data))
  } catch (error) {
    dispatch(fetchUserFailure(error.message))
  }
}

export const approveUser = (id) => async (dispatch) => {
  try {
    await instance.put(`/api/v3/user/approve`, { userId: id })
    const response = await instance.get(`/api/v3/user`)
    dispatch(fetchUserSuccess(response.data.data))
  } catch (error) {
    dispatch(fetchUserFailure(error.message))
  }
}

export const refuseUser = (id) => async (dispatch) => {
  try {
    await instance.put(`/api/v3/user/refuse`, { userId: id })
    const response = await instance.get(`/api/v3/user`)
    dispatch(fetchUserSuccess(response.data.data))
  } catch (error) {
    dispatch(fetchUserFailure(error.message))
  }
}

export const approveOwner = (id) => async (dispatch) => {
  try {
    await instance.put(`/api/v3/owner-homestay/approve`, {
      ownerHomestayId: id,
    })
    const response = await instance.get(`/api/v3/owner-homestay`)
    dispatch(fetchOwnerSuccess(response.data.data))
  } catch (error) {
    dispatch(fetchUserFailure(error.message))
  }
}

export const refuseOwner = (id) => async (dispatch) => {
  try {
    await instance.put(`/api/v3/owner-homestay/refuse`, { ownerHomestayId: id })
    const response = await instance.get(`/api/v3/owner-homestay`)
    dispatch(fetchOwnerSuccess(response.data.data))
  } catch (error) {
    dispatch(fetchUserFailure(error.message))
  }
}
