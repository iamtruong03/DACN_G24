// src/features/user/userThunk.js
import { logout, ownerHomestayloginSuccess } from './ownerHomestaySlice'
import axios from 'axios'
import { notification } from 'antd'

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

export const loginOwnerHomestay = (username, password) => async (dispatch) => {
  try {
    const response = await axios.post('http://localhost:8080/api/v2/login', {
      username: username,
      password: password,
    })
    const accounts = response.data

    dispatch(ownerHomestayloginSuccess({ partner: accounts }))
    localStorage.setItem('partner', 'true')
    dispatch(
      ownerHomestayloginSuccess({ partner: accounts, partnerData: accounts }),
    )
  } catch (error) {
    console.error('Đăng nhập thất bại:', error)
    openNotification()
  }
}
export const logoutOwnerHomestay = () => (dispatch) => {
  dispatch(logout())
  localStorage.removeItem('isLoggedIn')
  localStorage.removeItem('isAdmin')
  localStorage.removeItem('partner')
}
