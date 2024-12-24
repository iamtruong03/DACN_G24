// middleware.js

import { Navigate } from 'react-router-dom'
import {
  adminloginSuccess,
  loginSuccess,
  logout,
  logoutAdmin,
  logoutOwner,
  partnerloginSuccess,
} from '../features/user/userSlice'
import { instance } from './axiosConfig'
import { logoutUser } from '../features/user/userThunk'

export const checkToken = (token) => async (dispatch) => {
  try {
    // Gọi API kiểm tra token ở đây
    const response = await instance.get(
      `http://localhost:8080/api/v2/homestay/get-ownerhomestay-by-token?token=${token}`,
    )
    const data = response?.data
    if (data.success) {
      dispatch(partnerloginSuccess({ partner: data, partnerData: data }))
    } else {
      localStorage.removeItem('ownerDetail')
    }
  } catch (error) {
    console.error('Error checking token:', error)
    dispatch(logoutOwner())
  }
}
export const checkTokenAdmin = (token) => async (dispatch) => {
  try {
    // Gọi API kiểm tra token ở đây
    const response = await instance.get(
      `http://localhost:8080/api/v3/homestay/get-admin-by-token?token=${token}`,
    )
    const data = response?.data
    if (data.success) {
      dispatch(adminloginSuccess({ admin: data, adminData: data }))
    } else {
      localStorage.removeItem('adminDetail')
    }
  } catch (error) {
    console.error('Error checking token:', error)
    dispatch(logoutAdmin())
  }
}
export const checkTokenUser = (token) => async (dispatch) => {
  try {
    // Gọi API kiểm tra token ở đây
    const response = await instance.get(
      `http://localhost:8080/api/v1/homestay/get-user-by-token?token=${token}`,
    )
    const data = response?.data
    if (data.success) {
      dispatch(loginSuccess({ user: data, userData: data }))
    } else {
      localStorage.removeItem('userDetail')
    }
  } catch (error) {
    console.error('Error checking token:', error)
    dispatch(logoutUser())
  }
}
