import './header.css'
import 'bootstrap/dist/css/bootstrap.css'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import {
  UserOutlined,
  ShoppingCartOutlined,
  SearchOutlined,
  FileDoneOutlined,
  HeartOutlined,
  CommentOutlined,
  StarOutlined,
  BankOutlined,
  LogoutOutlined,
  HomeOutlined,
  BookOutlined,
} from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { logoutUser } from '../../features/user/userThunk'
import { Avatar, Badge, Input, Button, Dropdown } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import React, { useEffect, useState } from 'react'
import { Modal, Typography } from 'antd'
import { useNavigate } from 'react-router-dom'
import LoginComponent from '../../component/login/Login'
import iconplane from '../../assets/svg/Iconka-Business-Finance-Plane.512.png'
import logotravel from '../../assets/svg/Rectangle 3.svg'
import { MDBIcon } from 'mdb-react-ui-kit'
import { fetchShoppingCart } from '../../features/user/shoppingCartThunk'

const { Title } = Typography

const HeaderUser = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)
  const navigate = useNavigate()
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn)
  const shoppingcart = useSelector((state) => state.shoppingcart.shoppingCart)
  const userDetail = JSON.parse(localStorage.getItem('userDetail'))
  const userId = userDetail?.data.id
  const statusUser = JSON.parse(localStorage.getItem('userDetail'))?.success
  const dispatch = useDispatch()
  const [searchVisible, setSearchVisible] = useState(false)
  const [searchValue, setSearchValue] = useState('')

  useEffect(() => {
    dispatch(fetchShoppingCart(userId))
  }, [])

  const handleSearchClick = () => {
    setSearchVisible(!searchVisible)
    setSearchValue('')
  }

  const handleInputChange = (e) => {
    setSearchValue(e.target.value)
  }

  const handleSearch = () => {
    console.log('Searching for:', searchValue)
  }

  const showModal = () => {
    setIsModalOpen(true)
  }
  const handleOk = () => {
    setIsModalOpen(false)
  }
  const handleCancel = () => {
    setIsModalOpen(false)
  }
  useEffect(() => {
    if (statusUser) {
      setIsModalOpen(false)
    }
  }, [statusUser])
  const handleDropdownToggle = () => {
    if (!statusUser) {
      showModal() // Redirect to /login if not logged in
    } else {
      setShowDropdown(!showDropdown) // Toggle the dropdown if logged in
    }
  }
  const logout = () => {
    dispatch(logoutUser())
    navigate('/login')
  }
  const booking = () => {
    navigate(`/booking/${userId}`)
  }
  const cart = () => {
    navigate(`/shopingcart/${userId}`)
  }
  const fullName = userDetail?.data.name
  let lastName = '' // Khai báo ở đây để nó có thể được sử dụng ngoài khối if

  // Kiểm tra xem fullName có tồn tại và không rỗng
  if (fullName) {
    // Chia chuỗi thành mảng các phần từ tên
    const nameParts = fullName.split(' ')

    // Lấy phần tử cuối cùng của mảng (tên)
    lastName = nameParts[nameParts.length - 1]
  }
  const items = [
    {
      label: (
        <Link to='/user/propreties' style={{ textDecoration: 'none' }}>
          <button
            type='button'
            className='btn btn-primary'
            style={{
              color: 'white',
              width: 240,
              textAlign: 'justify',
              display: 'flex',
            }}
          >
            <UserOutlined style={{ marginTop: 3 }} />
            &nbsp;Hồ sơ của tôi
          </button>
        </Link>
      ),
      key: '0',
    },
    {
      label: (
        <button
          type='button'
          className='btn btn-primary'
          style={{
            color: 'white',
            width: 240,
            textAlign: 'justify',
            display: 'flex',
          }}
          onClick={booking}
        >
          <FileDoneOutlined style={{ marginTop: 3 }} />
          &ensp;Homestay đã thuê
        </button>
      ),
      key: '1',
    },
    {
      label: (
        <Link to={'/userComment'}>
          <button
            type='button'
            className='btn btn-primary'
            style={{
              color: 'white',
              width: 240,
              textAlign: 'justify',
              display: 'flex',
            }}
          >
            <CommentOutlined style={{ marginTop: 3 }} />
            &ensp;Đánh giá của tôi
          </button>
        </Link>
      ),
      key: '2',
    },
    {
      label: (
        <Link to={'/RulesWhile'}>
          <button
            type='button'
            className='btn btn-primary'
            style={{
              color: 'white',
              display: 'flex',
              width: 240,
            }}
          >
            <BankOutlined style={{ marginTop: 3 }} />
            &ensp;Quy tắc khi đặt homestay
          </button>
        </Link>
      ),
      key: '3',
    },
    {
      label: (
        <Link to={'/supporteduser'}>
          <button
            type='button'
            className='btn btn-primary'
            style={{
              color: 'white',
              width: 240,
              textAlign: 'justify',
              display: 'flex',
            }}
          >
            <MDBIcon fas icon='question' style={{ marginTop: 3 }} />
            &ensp;Những câu hỏi thắc mắc
          </button>
        </Link>
      ),
      key: '4',
    },
    {
      label: (
        <button
          type='button'
          className='btn btn-primary'
          style={{
            color: 'white',
            width: 240,
            textAlign: 'justify',
            display: 'flex',
          }}
          onClick={logout}
        >
          <LogoutOutlined style={{ marginTop: 3 }} />
          &ensp;Đăng xuất
        </button>
      ),
      key: '5',
    },
  ]
  return (
    <header>
      <Navbar collapseOnSelect expand='lg'>
        <Container>
          <Navbar.Brand>
            {/* <div className="parent-box">
                            <div className="box-fly-icon">
                                <div className="parent-plane-icon"><img className="plane-icon" src={iconplane} style={{ color: 'white' }} /></div>
                            </div>
                            <Title level={2} style={{ color: 'blue' }}>Travel</Title>
                        </div> */}
            <img
              src='https://res.cloudinary.com/dcwkiozwf/image/upload/v1700721918/homestay_images/lebvlnajzlmrpxxjps8i.png'
              style={{ with: '70px', height: '70px' }}
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='responsive-navbar-nav' />
          <Navbar.Collapse id='responsive-navbar-nav'>
            <Nav className='me-auto'>
              <Link to={'/'} className='textnabar'>
                <strong>Trang chủ</strong>
              </Link>
              <Link to={'/home-stay'} className='textnabar'>
                <strong>Homestay</strong>
              </Link>
              <Link to={'/phieu-giam-gia'} className='textnabar'>
                <strong>Homestay đang giảm giá</strong>
              </Link>
              <Link to={'/hop-tac'} className='textnabar'>
                <strong>Hợp tác với chúng tôi</strong>
              </Link>
            </Nav>
            <div className='headercart'>
              <div className='cartAndPerson' style={{ display: 'flex' }}>
                {/* <div className='search-bar-container'>
                  {searchVisible ? (
                    <div className='search-input-container'>
                      <Input
                        placeholder='Tìm kiếm...'
                        value={searchValue}
                        onChange={handleInputChange}
                      />
                      <Button type='primary' onClick={handleSearch}>
                        Tìm kiếm
                      </Button>
                    </div>
                  ) : (
                    <SearchOutlined
                      className='search-icon'
                      onClick={handleSearchClick}
                      style={{ fontSize: '26px' }}
                    />
                  )}
                </div> */}
                &emsp;
                <Link to='/shopingcart' className='headercart'>
                  <span className='picturecart'>
                    <span className='cc'>
                      <Badge count={shoppingcart?.length} showZero>
                        <HeartOutlined
                          style={{
                            color: 'black',
                            fontSize: '26px',
                            marginTop: 5,
                          }}
                        />
                      </Badge>
                    </span>
                  </span>
                </Link>
                &emsp;
                {isLoggedIn ? (
                  <Dropdown
                    menu={{
                      items,
                    }}
                    trigger={['click']}
                  >
                    <div style={{ display: 'flex', cursor: 'pointer' }}>
                      {userDetail?.data.avataUrl === null ? (
                        <Avatar icon={<UserOutlined />} />
                      ) : (
                        <Avatar src={userDetail?.data.avataUrl} />
                      )}
                      <Title style={{ marginTop: 5 }} level={5}>
                        &nbsp;{lastName}
                      </Title>
                    </div>
                  </Dropdown>
                ) : null}
                {isLoggedIn ? ( // Render dropdown only if the user is logged in
                  <span />
                ) : (
                  <div>
                    {' '}
                    <Link to='/login'>
                      <Button
                        type='primary'
                        style={{ backgroundColor: '#FF7D63', color: 'white' }}
                      >
                        Đăng nhập
                      </Button>
                    </Link>{' '}
                    &emsp;
                    <Link to='/register'>
                      <Button
                        type='primary'
                        style={{ backgroundColor: '#FF7D63', color: 'white' }}
                      >
                        Đăng ký
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Modal
        title='welcom'
        style={{ top: 20 }}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={800}
      >
        <LoginComponent />
      </Modal>
    </header>
  )
}
export default HeaderUser
