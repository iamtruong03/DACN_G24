import React from 'react'
import { DatePicker, Tabs, Typography, message, notification } from 'antd'
import { MDBBtn, MDBCol, MDBInput, MDBRow } from 'mdb-react-ui-kit'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import dayjs from 'dayjs'
import moment from 'moment'
import {
  ChangePasswordByPass,
  ChangePasswordSlice,
} from '../../../features/owner_homestay/changePassword/changPassword'
import { instance } from '../../../app/axiosConfig'
const onChange = (key) => {
  console.log(key)
}

const { Title } = Typography
const ChangePassword = () => {
  const userDetail = JSON.parse(localStorage.getItem('ownerDetail'))
  const namelocal = userDetail?.data.name
  const idowner = userDetail?.data.id
  const [name, setname] = useState(namelocal)
  const [birthday, setbirthday] = useState(userDetail?.data.birthday)
  const [gender, setgender] = useState(userDetail?.data.gender)
  const [address, setaddress] = useState(userDetail?.data.address)
  const [password, setpassword] = useState('')
  const [newpassword, setnewpassword] = useState('')
  const [confirmpassword, setconfirmpassword] = useState('')
  const [numberBank, setNumberBank] = useState(userDetail?.data?.numberAccount)
  const [nameBank, setNameBank] = useState(userDetail?.data?.nameBack)
  const [nameAccountBank, setNameAccountBank] = useState(
    userDetail?.data?.nameAccount,
  )
  const [loading, setLoading] = useState(false)
  const handleDateChangestart = (dates) => {
    setbirthday(dates.valueOf())
  }
  const [file, setFile] = useState([])

  const [selectedImage, setSelectedImage] = useState([])

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0]

    if (selectedFile) {
      const imageObject = {
        name: selectedFile.name,
        url: URL.createObjectURL(selectedFile),
      }

      setSelectedImage(imageObject)
      setFile(selectedFile)
    }
  }
  const isBeforeToday = (current) => {
    return current && current.isAfter(moment().startOf('day'))
  }
  const navigate = useNavigate()
  const openNotification = () => {
    notification.open({
      message: 'Thông báo',
      description:
        'Cập nhật thông tin thành công,thông tin mới sẽ được áp dụng cho lần đăng nhập sau',
      onClick: () => {
        console.log('Notification Clicked!')
      },
    })
  }
  const openNotificationChangePass = () => {
    notification.open({
      message: 'Thông báo',
      description: 'Mật khẩu mới và mật khẩu xác nhận phải giống nhau',
      onClick: () => {
        console.log('Notification Clicked!')
      },
    })
  }
  const formChangePass = {
    currentPassword: password,
    newPassword: newpassword,
    confirmationPassword: confirmpassword,
  }
  const formData = {
    username: userDetail?.data.username,
    birthday: 1234567890,
    name: name,
    gender: gender,
    address: address,
    phoneNumber: userDetail?.data.phoneNumber,
    email: userDetail?.data.email,
  }
  const handleSubmitchange = async (e) => {
    // console.log(formChangePass)
    e.preventDefault()
    if (newpassword !== confirmpassword) {
      openNotificationChangePass()
      return
    }
    try {
      // Assuming ChangePasswordByPass function takes an object with a 'password' property
      await ChangePasswordByPass(formChangePass)
      openNotification()
    } catch (error) {
      message.error('Password change failed:', 5)
      setLoading(false)
    }
  }
  const handleSubmitBankAccount = async (e) => {
    // console.log(formChangePass)
    e.preventDefault()
    if (newpassword !== confirmpassword) {
      openNotificationChangePass()
      return
    }
    try {
      // Assuming ChangePasswordByPass function takes an object with a 'password' property
      await ChangePasswordByPass(formChangePass)
      openNotification()
    } catch (error) {
      message.error('Password change failed:', 5)
      setLoading(false)
    }
  }
  // const handleSubmit = async (e) => {
  //   e.preventDefault()
  //   try {
  //     setLoading(true)
  //     await ChangePasswordSlice(
  //       userDetail?.data.username,
  //       birthday || userDetail.data?.birthday.valueOf(),
  //       name,
  //       gender,
  //       address,
  //       file,
  //       idowner,
  //       userDetail?.data.phoneNumber,
  //       userDetail?.data.email,
  //     )
  //     setLoading(false)
  //     openNotification()
  //   } catch (error) {
  //     // Handle the error, show a notification, etc.
  //     message.error('Password change failed:', 5)
  //     setLoading(false)
  //   }
  // }
  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true) // Set loading to true when submitting

    const formData = new FormData()
    formData.append('name', name)
    formData.append('gender', gender)
    formData.append('address', address)
    formData.append('phoneNumber', userDetail?.data.phoneNumber)
    formData.append('email', userDetail?.data.email)
    formData.append('birthday', birthday || userDetail.data?.birthday.valueOf())
    formData.append('username', userDetail?.data?.username)

    if (file && file.size > 0) {
      formData.append('avataUrl', file)
    }
    message.info('Đang tiến hành sửa bạn vui lòng đợi một vài giây nhé!', 5)
    instance
      .put(
        `http://localhost:8080/api/v2/owner/update-information-owner?id=${userDetail?.data.id}`,
        formData,
      )
      .then((response) => {
        setLoading(false) // Set loading to false after a successful request
        message.info(
          'Sửa thông tin thành công những thay đổi sẽ được áp dụng cho lần đăng nhập tới!',
          5,
        )
      })
      .catch((error) => {
        // console.error('Error:', error)

        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          const errorMessage = error.response.data.message
          //   console.error('Error Message:', errorMessage)

          // Do something with the error message, such as displaying it to the user
          message.error(errorMessage, 5)
        }

        setLoading(false) // Set loading to false if the request fails
      })
  }
  const handleSubmitUser = (e) => {
    e.preventDefault()
    setLoading(true) // Set loading to true when submitting

    const formData = new FormData()
    formData.append('name', name)
    formData.append('gender', gender)
    formData.append('address', address)
    formData.append('phoneNumber', userDetail?.data.phoneNumber)
    formData.append('email', userDetail?.data.email)
    formData.append('birthday', birthday || userDetail.data?.birthday.valueOf())
    formData.append('username', userDetail?.data?.username)
    if (file.length > 0) {
      formData.append('avataUrl', file)
    }
    formData.append('nameBack', nameBank)
    formData.append('nameAccount', nameAccountBank)
    formData.append('numberAccount', numberBank)
    message.info('Đang tiến hành sửa bạn vui lòng đợi một vài giây nhé!', 5)
    instance
      .put(
        `http://localhost:8080/api/v2/owner/update-information-owner?id=${userDetail?.data.id}`,
        formData,
      )
      .then((response) => {
        setLoading(false) // Set loading to false after a successful request
        message.info(
          'Sửa thông tin thành công những thay đổi sẽ được áp dụng cho lần đăng nhập tới!',
          5,
        )
      })
      .catch((error) => {
        // console.error('Error:', error)

        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          const errorMessage = error.response.data.message
          //   console.error('Error Message:', errorMessage)

          // Do something with the error message, such as displaying it to the user
          message.error(errorMessage, 5)
        }

        setLoading(false) // Set loading to false if the request fails
      })
  }
  const items = [
    {
      key: '1',
      label: 'Thông tin tài khoản',
      children: (
        <div>
          <Title level={3}>Thông tin cá nhân</Title>
          <Title level={5}>Cập nhật thông tin của bạn</Title>
          <form onSubmit={handleSubmit}>
            <MDBRow>
              <MDBCol col='6'>
                <MDBInput
                  wrapperClass='mb-4'
                  label='Họ và Tên'
                  id='name'
                  type='text'
                  onChange={(e) => setname(e.target.value)}
                  defaultValue={namelocal}
                  required
                />
              </MDBCol>
              <MDBCol col='6'>
                <MDBInput
                  wrapperClass='mb-4'
                  label='Địa chỉ'
                  id='address'
                  type='text'
                  required
                  defaultValue={userDetail?.data.address}
                  onChange={(e) => setaddress(e.target.value)}
                />
              </MDBCol>
            </MDBRow>
            <div style={{ display: 'flex', marginBottom: 10 }}>
              <span>Ngày sinh &ensp;</span>
              <DatePicker
                style={{ width: '44.5%', height: 36 }}
                dateFormat='dd/MM/yyyy'
                required
                onChange={handleDateChangestart}
                disabledDate={isBeforeToday}
                defaultValue={
                  userDetail.data?.birthday
                    ? dayjs(
                        dayjs(userDetail.data?.birthday)
                          .locale('vi')
                          .format('YYYY-MM-DD'),
                        'YYYY-MM-DD',
                      )
                    : null
                }
              />
            </div>
            <MDBRow>
              <MDBCol col='3'>
                Giới tính &emsp;&emsp;
                <label>
                  <input
                    type='radio'
                    name='gender'
                    value={true}
                    defaultChecked={true}
                    checked={gender === true}
                    onChange={() => setgender(true)}
                  />
                  Nam
                </label>
                &emsp;
                <label>
                  <input
                    type='radio'
                    name='gender'
                    value={false}
                    checked={gender === false}
                    onChange={() => setgender(false)}
                  />
                  Nữ
                </label>
              </MDBCol>
            </MDBRow>

            <br />
            <div style={{ display: 'flex' }}>
              <label
                htmlFor='image'
                style={{
                  cursor: 'pointer',
                  border: '1px solid black',
                  borderRadius: 8,
                  padding: '6px 15px 6px 15px',
                  marginLeft: 10,
                }}
              >
                Chọn tệp
              </label>
              <input
                type='file'
                id='image'
                accept='image/*'
                onChange={handleFileChange}
                style={{ display: 'none' }}
              />
              <div style={{ marginLeft: 8, marginTop: 5 }}>
                {selectedImage ? (
                  <div>
                    <img
                      src={selectedImage.url}
                      style={{ width: 50, marginRight: 5 }}
                    />
                    {selectedImage.name}
                  </div>
                ) : (
                  'Chưa có file được chọn'
                )}
              </div>
            </div>
            <br />
            <div style={{ width: '100%' }}>
              <span style={{ width: 150 }}>Email : </span>
              <span>{userDetail?.data.email}</span>
            </div>
            <br />
            <div style={{ width: '100%' }}>
              <span style={{ width: 150 }}>Số điện thoại : </span>
              <span>{userDetail?.data.phoneNumber}</span>
            </div>
            <br />

            {/* <input type='file' accept="image/*" onChange={handleFileChange} /> */}
            <MDBBtn
              type='submit'
              className='w-100 mb-4'
              size='md'
              style={{ marginTop: 10 }}
              disabled={loading}
            >
              {loading ? 'Đang lưu...' : 'Lưu'}
            </MDBBtn>
          </form>
        </div>
      ),
    },
    {
      key: '2',
      label: 'Đặt lại mật khẩu',
      children: (
        <form>
          <MDBInput
            wrapperClass='mb-4'
            label='Mật khẩu cũ'
            id='password'
            type='password'
            required
            onChange={(e) => setpassword(e.target.value)}
          />
          <MDBInput
            wrapperClass='mb-4'
            label='Mật khẩu mới'
            id='newpassword'
            type='password'
            required
            onChange={(e) => setnewpassword(e.target.value)}
          />
          <MDBInput
            wrapperClass='mb-4'
            label='Xác nhận mật khẩu'
            id='confirmpassword'
            type='password'
            required
            onChange={(e) => setconfirmpassword(e.target.value)}
          />
          <MDBBtn
            className='w-100 mb-4'
            size='md'
            style={{ marginTop: 10 }}
            onClick={handleSubmitchange}
          >
            Đổi mật khẩu
          </MDBBtn>
        </form>
      ),
    },
    {
      key: '3',
      label: 'Thông tin thông báo',
      children: (
        <div
          style={{
            width: '100%',
            height: 200,
            border: '1px solid #b0b0b0',
            borderRadius: 8,
            padding: '10px 20px 10px 20px',
            backgroundColor: 'rgba(255,255,255,1.00)',
          }}
        >
          <Title level={4}>Thông báo email</Title>
          <div>
            Tùy chọn email:chúng tôi sẽ gửi các thông báo về thanh toán,đổi mật
            khẩu quên mật khẩu vào email:{' '}
            <Title level={5}>{userDetail?.data.email}</Title>
          </div>
        </div>
      ),
    },
    {
      key: '4',
      label: 'Thông tin tài khoản ngân hàng',
      children: (
        <form>
          <MDBInput
            wrapperClass='mb-4'
            label='Số tài khoản'
            id='numberBank'
            type='numberBank'
            required
            defaultValue={userDetail?.data?.numberAccount}
            onChange={(e) => setNumberBank(e.target.value)}
          />
          <MDBInput
            wrapperClass='mb-4'
            label='Tên ngân hàng'
            id='nameBank'
            type='nameBank'
            required
            defaultValue={userDetail?.data?.nameBack}
            onChange={(e) => setNameBank(e.target.value)}
          />
          <MDBInput
            wrapperClass='mb-4'
            label='Tên tài khoản'
            id='nameAccount'
            type='nameAccount'
            required
            defaultValue={userDetail?.data?.nameAccount}
            onChange={(e) => setNameAccountBank(e.target.value)}
          />
          <MDBBtn
            className='w-100 mb-4'
            size='md'
            style={{ marginTop: 10 }}
            onClick={handleSubmitUser}
          >
            Cập nhật tài khoản ngân hàng
          </MDBBtn>
        </form>
      ),
    },
  ]
  return (
    <div>
      <Title level={3}>Cài đặt</Title>
      <Tabs defaultActiveKey='1' items={items} onChange={onChange} />
    </div>
  )
}
export default ChangePassword
