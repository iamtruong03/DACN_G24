import React, { useState } from 'react'
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCheckbox,
  MDBIcon,
  MDBSpinner,
} from 'mdb-react-ui-kit'
import { Button, DatePicker, Spin, message, notification } from 'antd'
import moment from 'moment'
import './Login.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { LoadingOutlined } from '@ant-design/icons'
const Register = () => {
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const [name, setname] = useState('')
  const [birthday, setbirthday] = useState(856345)
  const [gender, setgender] = useState(true)
  const [address, setaddress] = useState('')
  const [phoneNumber, setphoneNumber] = useState(0)
  const [email, setemail] = useState('')
  const [username, setusername] = useState('')
  const [password, setpassword] = useState('')
  const [identificationNumber, setidentificationNumber] = useState('')
  const handleDateChangestart = (dates) => {
    setbirthday(dates.valueOf())
  }
  const [api, contextHolder] = notification.useNotification()
  const openNotification = () => {
    notification.open({
      message: 'Thông báo',
      description: 'Đăng ký thành công',
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
    // identificationNumber: identificationNumber,
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
          'http://localhost:8080/api/v1/login/registers',
          formData,
        )

        // Kiểm tra trạng thái thành công từ API
        if (response.status === 200) {
          setIsLoading(false)
          message.success('Đăng ký thành công')
          navigate('/login')
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
    <MDBContainer fluid className='p-4'>
      <MDBRow>
        <MDBCol
          md='6'
          className='text-center text-md-start d-flex flex-column justify-content-center'
        >
          <h1 className='my-5 display-3 fw-bold ls-tight px-3'>
            Với những ưu đãi <br />
            <span className='text-primary'>tốt nhất dành cho bạn</span>
          </h1>
          <p className='px-3' style={{ color: 'hsl(217, 10%, 50.8%)' }}>
            Chào mừng bạn đến với trang web đặt homestay của chúng tôi! Chúng
            tôi cung cấp những trải nghiệm ấm cúng và tiện nghi tại các điểm đến
            tuyệt vời trên khắp Việt Nam. Tận hưởng những ưu đãi tốt nhất và tạo
            ra những kỷ niệm đáng nhớ cùng chúng tôi.
          </p>
        </MDBCol>

        <MDBCol md='6'>
          <MDBCard className='my-5'>
            <MDBCardBody className='p-5'>
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
                <MDBInput
                  wrapperClass='mb-4'
                  label='Số điện thoại'
                  id='phoneNumber'
                  type='number'
                  required
                  onChange={(e) => setphoneNumber(e.target.value)}
                />
                {/* <MDBInput wrapperClass='mb-4' label='Số căn cước công dân' id='identificationNumber' type='number' required
                                    onChange={(e) => setidentificationNumber(e.target.value)} /> */}
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
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  )
}
export default Register
