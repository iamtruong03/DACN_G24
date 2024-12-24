// src/features/user/userThunk.js
import {
  adminloginSuccess,
  loginSuccess,
  logout,
  partnerloginSuccess,
} from './userSlice'
import axios from 'axios'
import { notification } from 'antd'
import { updateAxiosToken } from '../../app/axiosConfig'
import { fetchShoppingCart } from './shoppingCartThunk'

const openNotification = () => {
  notification.open({
    message: 'Thông báo',
    description:
      'Đăng nhập không thành công vì tài khoản hoặc mật khẩu không đúng',
    onClick: () => {
      console.log('Notification Clicked!')
    },
  })
}
const openNotificationlogin = () => {
  notification.open({
    message: 'Thông báo',
    description: 'chào mừng bạn đến với trang web',
    onClick: () => {
      console.log('Notification Clicked!')
    },
  })
}
const openNotificationadmin = () => {
  notification.open({
    message: 'Thông báo',
    description: 'chào mừng bạn đến với trang quản trị trang web',
    onClick: () => {
      console.log('Notification Clicked!')
    },
  })
}
export const loginUser = (username, password) => async (dispatch) => {
  try {
    const response = await axios.post(
      'http://localhost:8080/api/v1/login/authenticate',
      {
        username: username,
        password: password,
      },
    )
    const accounts = response.data
    if (accounts.success) {
      dispatch(loginSuccess({ user: accounts }))
      localStorage.setItem('userDetail', JSON.stringify(accounts))
      const token = JSON.parse(localStorage.getItem('userDetail')).data.token
      openNotificationlogin()
      dispatch(loginSuccess({ user: accounts, userData: accounts }))
      updateAxiosToken(token)
      const userDetail = JSON.parse(localStorage.getItem('userDetail'))
      const userId = userDetail?.data.id
      dispatch(fetchShoppingCart(userId))
    } else {
      openNotification()
    }
  } catch (error) {
    console.error('Đăng nhập thất bại:', error)
    openNotification()
  }
}
export const loginAdmin = (username, password) => async (dispatch) => {
  try {
    const response = await axios.post(
      'http://localhost:8080/api/v3/login/authenticate',
      {
        username: username,
        password: password,
      },
    )
    const accounts = response.data
    if (accounts.success) {
      dispatch(adminloginSuccess({ admin: accounts }))
      localStorage.setItem('adminDetail', JSON.stringify(accounts))
      const token = JSON.parse(localStorage.getItem('adminDetail')).data.token
      dispatch(adminloginSuccess({ admin: accounts, adminData: accounts }))
      updateAxiosToken(token)
    } else {
      openNotification()
    }
  } catch (error) {
    console.error('Đăng nhập thất bại:', error)
    openNotification()
  }
}
export const loginpartner = (username, password) => async (dispatch) => {
  try {
    const response = await axios.post(
      'http://localhost:8080/api/v2/login/authenticate',
      {
        username: username,
        password: password,
      },
    )
    const accounts = response.data
    if (accounts.success) {
      dispatch(partnerloginSuccess({ partner: accounts }))
      localStorage.setItem('ownerDetail', JSON.stringify(accounts))
      const token = JSON.parse(localStorage.getItem('ownerDetail')).data.token
      dispatch(
        partnerloginSuccess({ partner: accounts, partnerData: accounts.data }),
      )
      updateAxiosToken(token)
    } else {
      openNotification()
    }
  } catch (error) {
    console.error('Đăng nhập thất bại:', error)
    openNotification()
  }
}
export const logoutUser = () => (dispatch) => {
  dispatch(logout())
  localStorage.removeItem('userDetail')
  localStorage.removeItem('ownerDetail')
  localStorage.removeItem('adminDetail')
  const userDetail = JSON.parse(localStorage.getItem('userDetail'))
  const userId = userDetail?.data.id
  dispatch(fetchShoppingCart(userId))
}

// Similarly modify loginAdmin and loginpartner functions

// Add a function to check local storage on page load
