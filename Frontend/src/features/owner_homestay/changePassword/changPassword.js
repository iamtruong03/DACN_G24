import { message } from 'antd'
import { instance } from '../../../app/axiosConfig'

export const ChangePasswordSlice = async (
  username,
  birthday,
  name,
  gender,
  address,
  imgUrl,
  id,
  phoneNumber,
  email,
) => {
  const formData = new FormData()
  formData.append('username', username)
  formData.append('birthday', birthday)
  formData.append('name', name)
  formData.append('gender', gender)
  formData.append('address', address)
  formData.append('phoneNumber', phoneNumber)
  formData.append('email', email)
  // imgUrl.forEach((imageUrl) => {

  if (imgUrl.length > 0) {
    formData.append('avataUrl', imgUrl)
  }
  // })
  try {
    await instance.put(
      `/api/v2/owner/update-information-owner?id=${id}`,
      formData,
    )
  } catch (error) {
    console.log(error.message)
    throw error
  }
}
export const ChangePasswordByPass = async (Data) => {
  try {
    const response = await instance.post(
      `/api/v2/change-pass/changePassword`,
      Data,
    )
    return response.data
  } catch (error) {
    message.error(error.response.data.message)
    throw error
  }
}
export const ChangePasswordByPassUser = async (Data) => {
  try {
    const response = await instance.post(
      `http://localhost:8080/api/v1/change-pass/changePassword`,
      Data,
    )
    return response.data
  } catch (error) {
    message.error(error.response.data.message)
    throw error
  }
}
