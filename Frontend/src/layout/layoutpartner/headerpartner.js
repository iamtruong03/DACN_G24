import React from 'react'
import { Avatar, Layout, Menu } from 'antd'
import Title from 'antd/es/typography/Title'
import { useDispatch } from 'react-redux'
import { logoutUser } from '../../features/user/userThunk'
import { useNavigate } from 'react-router-dom'
import logotravel from '../../assets/svg/Rectangle 405.svg'
import { AppleOutlined } from '@ant-design/icons'

const { Header } = Layout
const items1 = ['1', '2', '3'].map((key) => ({
  key,
  label: `nav ${key}`,
}))

const Headerpartner = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const logout = () => {
    dispatch(logoutUser())
    navigate('/hop-tac/login')
  }
  const userDetail = JSON.parse(localStorage.getItem('ownerDetail'))
  const nameUser = userDetail?.data.name
  return (
    <Header style={{ display: 'flex', alignItems: 'center' }}>
      <div className='demo-logo' />
      <Title level={3} style={{ marginTop: '13px', color: 'white' }}>
        <img src={logotravel} />
        Trang quản trị Homestay của bạn
      </Title>
      <div className='layout-login' style={{ marginLeft: 'auto' }}>
        <Title level={5} style={{ color: 'white', display: 'flex' }}>
          {userDetail?.data.avataUrl !== null ? (
            <Avatar src={userDetail?.data.avataUrl} />
          ) : (
            ''
          )}
          &nbsp;{nameUser}
          <div style={{ cursor: 'pointer' }} onClick={logout}>
            (Đăng xuất)
          </div>
        </Title>
      </div>
    </Header>
  )
}
export default Headerpartner
