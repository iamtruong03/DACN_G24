import { message, notification } from 'antd'
import axios from 'axios'
const openNotificationadmin = () => {
  notification.open({
    message: 'Thông báo',
    description: 'Kích hoạt tài khoản thành công',
    onClick: () => {
      console.log('Notification Clicked!')
    },
  })
}
export const comfirmMailActiveAcc = (id) => async () => {
  try {
    await axios.post(
      `http://localhost:8080/api/v2/login/confirm-email?id=${id}`,
    )
    openNotificationadmin()
  } catch (error) {
    message.info(`${error}`)
  }
}
export const comfirmMailActiveUser = (id) => async () => {
  try {
    await axios.put(
      `http://localhost:8080/api/v1/customer/update-information-owner?id=${id}`,
    )
    openNotificationadmin()
  } catch (error) {
    message.info(`${error}`)
  }
}
