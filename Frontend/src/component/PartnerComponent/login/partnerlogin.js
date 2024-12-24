import React, { useEffect, useState } from 'react'
import {
  MDBContainer,
  MDBInput,
  MDBCheckbox,
  MDBBtn,
  MDBIcon,
} from 'mdb-react-ui-kit'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { notification } from 'antd'
import { loginpartner } from '../../../features/user/userThunk'

const LoginPartner = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const ispartner = useSelector((state) => state.user.ispartner)

  const [username, setUsername] = useState('') // Thêm state cho username
  const [password, setPassword] = useState('') // Thêm state cho password
  const [size, setSize] = useState('large')
  const openNotificationpartner = () => {
    notification.open({
      message: 'Thông báo',
      description: 'chào mừng bạn đến với trang quản trị home-stay',
      onClick: () => {
        console.log('Notification Clicked!')
      },
    })
  }
  const handleLogin = async () => {
    // Gọi loginUser thunk và truyền vào username và password
    dispatch(loginpartner(username, password))
  }

  useEffect(() => {
    if (ispartner) {
      navigate('/partner/homestay')
      openNotificationpartner()
    }
  }, [ispartner])

  const hadleRegister = () => {
    navigate('/hop-tac/register')
  }
  return (
    <MDBContainer className='p-3 my-5 d-flex flex-column w-50'>
      <MDBInput
        wrapperClass='mb-4'
        label='Tài khoản'
        id='form1'
        type='email'
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <MDBInput
        wrapperClass='mb-4'
        label='Mật khẩu'
        id='form2'
        type='password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <div className='d-flex justify-content-between mx-3 mb-4'>
        <MDBCheckbox
          name='flexCheck'
          value=''
          id='flexCheckDefault'
          label='Remember me'
        />
        <Link to={'/changePassword'}>
          <div>Quên mật khẩu?</div>
        </Link>
      </div>

      <MDBBtn className='mb-4' onClick={() => handleLogin()}>
        Đăng nhập
      </MDBBtn>

      <div className='text-center'>
        <p>
          Chưa có tài khoản?{' '}
          <a style={{ color: 'blue' }} onClick={() => hadleRegister()}>
            Đăng ký ngay
          </a>
        </p>
      </div>
    </MDBContainer>
  )
}

export default LoginPartner
