import React, { useState } from 'react'
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBRow,
  MDBInput,
  MDBCheckbox,
  MDBIcon,
  MDBRadio,
  MDBSpinner,
} from 'mdb-react-ui-kit'
import { DatePicker, message, notification } from 'antd'
import moment from 'moment'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

// const validationSchema = Yup.object().shape({
//     name: Yup.string().required('Họ và tên không được để trống'),
//     birthday: Yup.date().required('Ngày sinh không được để trống'),
//     gender: Yup.boolean().required('Giới tính không được để trống'),
//     address: Yup.string().required('Địa chỉ không được để trống'),
//     phoneNumber: Yup.string().required('Số điện thoại không được để trống'),
//     email: Yup.string().email('Email không hợp lệ').required('Email không được để trống'),
//     username: Yup.string().required('Tài khoản không được để trống'),
//     password: Yup.string().required('Mật khẩu không được để trống')
// });

const PartnerRegister = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [name, setname] = useState('')
  const [birthday, setbirthday] = useState(856345)
  const [gender, setgender] = useState(true)
  const [address, setaddress] = useState('')
  const [phoneNumber, setphoneNumber] = useState(0)
  const [email, setemail] = useState('')
  const [username, setusername] = useState('')
  const [password, setpassword] = useState('')
  const [numberBank, setNumberBank] = useState(0)
  const [nameBank, setNameBank] = useState(0)
  const [nameAccountBank, setNameAccountBank] = useState('')
  const handleDateChangestart = (dates) => {
    setbirthday(dates.valueOf())
  }
  const navigate = useNavigate()
  const openNotification = () => {
    notification.open({
      message: 'Thông báo',
      description:
        'Đăng ký thành công chúng tôi vừa gửi đương link kích hoạt tài khoản vào mail của bạn',
      onClick: () => {
        console.log('Notification Clicked!')
      },
    })
  }
  const formData = {
    name: name,
    birthday: birthday,
    gender: gender,
    address: address,
    phoneNumber: phoneNumber,
    email: email,
    username: username,
    password: password,
    nameBack: nameBank,
    nameAccount: nameAccountBank,
    numberAccount: numberBank,
    point: 9,
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (password.length < 8 || username.length < 8) {
      message.info('Mật khẩu và tài khoản phải có ít nhất 8 ký tự', 5)
      return
    } else if (phoneNumber.toString().length !== 10) {
      message.info('Số điện thoại phải có đúng 10 số', 5)
      return
    } else {
      setIsLoading(true)
      try {
        // Gửi POST request tới API
        await message.info(
          'Đang tiến hành đăng ký bạn vui lòng đợi một vài giây nhé!',
          2,
        )
        const response = await axios.post(
          'http://localhost:8080/api/v2/login/registers',
          formData,
        )

        // Kiểm tra trạng thái thành công từ API
        if (response.status === 200) {
          setIsLoading(false)
          message.success(
            'Đăng ký thành công bạn vui lòng check email để kích hoạt tài khoản',
          )
          navigate('/hop-tac/login')
          // Thực hiện các bước tiếp theo sau khi đăng ký thành công
        } else {
          // Xử lý các trường hợp lỗi khác nếu cần
          message.error(response.data.message || 'Đã có lỗi xảy ra')
        }
      } catch (error) {
        // Xử lý lỗi từ request
        setIsLoading(false)
        console.error('Error during registration:', error)
        message.error(error.response.data.message, 5)
      }
    }
  }
  const isBeforeToday = (current) => {
    return current && current.isAfter(moment().startOf('day'))
  }
  return (
    <MDBContainer fluid style={{ width: '60%' }}>
      <MDBCard
        className='mx-5 mb-5 p-5 shadow-5'
        style={{
          marginTop: '100px',
          background: 'hsla(0, 0%, 100%, 0.8)',
          backdropFilter: 'blur(30px)',
        }}
      >
        <MDBCardBody className='p-5 text-center'>
          <h2 className='fw-bold mb-5'>Đăng ký ngay</h2>
          <form onSubmit={handleSubmit}>
            <MDBRow>
              <MDBCol col='6'>
                <MDBInput
                  wrapperClass='mb-4'
                  label='Họ và Tên'
                  id='name'
                  type='text'
                  onChange={(e) => setname(e.target.value)}
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
                  onChange={(e) => setaddress(e.target.value)}
                />
              </MDBCol>
            </MDBRow>
            <MDBRow>
              <MDBCol col='6'>
                <MDBInput
                  wrapperClass='mb-4'
                  label='Tài khoản'
                  id='username'
                  type='text'
                  required
                  onChange={(e) => setusername(e.target.value)}
                />
              </MDBCol>
              <MDBCol col='6'>
                <MDBInput
                  wrapperClass='mb-4'
                  label='Mật khẩu'
                  id='password'
                  type='password'
                  required
                  onChange={(e) => setpassword(e.target.value)}
                />
              </MDBCol>
            </MDBRow>
            <MDBInput
              wrapperClass='mb-4'
              required
              label='Email'
              id='email'
              type='email'
              onChange={(e) => setemail(e.target.value)}
            />
            {/* <MDBInput wrapperClass='mb-4' label='Số căn cước công dân' id='identificationNumber' type='number' required
                            onChange={(e) => setidentificationNumber(e.target.value)} /> */}
            <MDBInput
              wrapperClass='mb-4'
              label='Số điện thoại'
              id='phoneNumber'
              type='phoneNumber'
              required
              onChange={(e) => setphoneNumber(e.target.value)}
            />
            <MDBInput
              wrapperClass='mb-4'
              label='Số tài khoản'
              id='numberBank'
              type='numberBank'
              required
              onChange={(e) => setNumberBank(e.target.value)}
            />
            <MDBInput
              wrapperClass='mb-4'
              label='Tên ngân hàng'
              id='nameBank'
              type='nameBank'
              required
              onChange={(e) => setNameBank(e.target.value)}
            />
            <MDBInput
              wrapperClass='mb-4'
              label='Tên tài khoản'
              id='nameAccount'
              type='nameAccount'
              required
              onChange={(e) => setNameAccountBank(e.target.value)}
            />
            <MDBRow>
              <MDBCol col='6'>
                Giới tính &emsp;&emsp;
                <label>
                  <input
                    type='radio'
                    name='gender'
                    value={true}
                    defaultChecked={true}
                  />
                  Nam
                </label>
                &emsp;
                <label>
                  <input type='radio' name='gender' value={false} />
                  Nữ
                </label>
              </MDBCol>
              <MDBCol col='6'>
                <div style={{ display: 'flex' }}>
                  <span style={{ marginTop: 4 }}>Ngày sinh &ensp;</span>
                  <DatePicker
                    style={{ width: '86%', height: 36 }}
                    dateFormat='dd/MM/yyyy'
                    required
                    onChange={handleDateChangestart}
                    disabledDate={isBeforeToday}
                  />
                </div>
              </MDBCol>
            </MDBRow>
            <MDBBtn
              type='submit'
              className='w-100 mb-4'
              size='md'
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <MDBSpinner role='status' size='sm'>
                    <span className='visually-hidden'>Loading...</span>
                  </MDBSpinner>
                  {' Đang tiến hành đăng ký...'}
                </>
              ) : (
                'Đăng ký'
              )}
            </MDBBtn>
          </form>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  )
}

export default PartnerRegister
