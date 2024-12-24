import { useSelector, useDispatch } from 'react-redux'
import { fetchProducts } from '../../features/product/productThunk'
import React, { useEffect, useState } from 'react'
import {
  Spin,
  Card,
  Row,
  Col,
  Typography,
  Input,
  Select,
  Button,
  Carousel,
  Tabs,
} from 'antd'
import { LeftOutlined, RightOutlined, TeamOutlined } from '@ant-design/icons'
import ProductTabs from './productTab/ProductTabs'
import slidekm from '../../assets/img/slidekm.png'
import imgsection from '../../assets/svg/Ellipse 1.svg'
import imgslide2 from '../../assets/svg/Ellipse 2.svg'
import imgslide3 from '../../assets/svg/Ellipse 3.svg'
import imgslide4 from '../../assets/svg/Ellipse 4.svg'
import hoianImg from '../../assets/svg/hoian.svg'
import danangImg from '../../assets/svg/danang.svg'
import sapaImg from '../../assets/svg/sapa.svg'
import dalatImg from '../../assets/svg/dalat.svg'
import nhatrangImg from '../../assets/svg/danang (2).svg'
import hueImg from '../../assets/svg/hue.svg'
import canthoImg from '../../assets/svg/cantho.svg'
import phuquocImg from '../../assets/svg/phuquoc.svg'
import beach from '../../assets/svg/beach_access_FILL0_wght400_GRAD0_opsz24.svg'
import kayaking from '../../assets/svg/kayaking_FILL0_wght400_GRAD0_opsz24.svg'
import slideform from '../../assets/svg/Rectangle 7.svg'
import './ProductList.css'
import dayjs from 'dayjs'
import { DatePicker, Space } from 'antd'
import { fetchSearchProducts } from '../../features/product/searchProductThunk'
import { Link } from 'react-router-dom'
import { updateAxiosToken } from '../../app/axiosConfig'
const { Search } = Input
const { Title } = Typography
const { RangePicker } = DatePicker

const dateFormat = 'YYYY/MM/DD'
const contentStyle = {
  height: '45%',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
  display: 'flex',
}
const sectionStyle = {
  marginTop: '50px',
  height: '323px',
  width: '100%',
}
const awesection1 = {
  position: 'relative',
}
const overlay = {
  position: 'absolute',
  top: '0',
  left: '0',
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  zIndex: '2', // Giá trị này phải cao hơn so với phần ảnh
}
const items = [
  {
    key: '1',
    label: 'Hồ Chí Minh',
    children: <ProductTabs city='Ho Chi Minh' />,
  },
  {
    key: '2',
    label: 'Hà Nội',
    children: <ProductTabs city='Ha Noi' />,
  },
  {
    key: '3',
    label: 'Đà Nẵng',
    children: <ProductTabs city='Da Nang' />,
  },
  {
    key: '4',
    label: 'Nha Trang',
    children: <ProductTabs city='Nha Trang' />,
  },
  {
    key: '5',
    label: 'Vũng Tàu',
    children: <ProductTabs city='Vung Tau' />,
  },
]

function ProductList() {
  const dispatch = useDispatch()
  const [currentLocation, setCurrentLocation] = useState('1') // Initialize with 'Hồ Chí Minh'
  const [checkInDate, setCheckInDate] = useState(null)
  const [checkOutDate, setCheckOutDate] = useState(null)
  const [nameOrAddress, setNameOrAddress] = useState(null)
  const [convenientvir, setconvenient] = useState('')

  const handleTabChange = (key) => {
    setCurrentLocation(key)
  }
  const storedToken = JSON.parse(localStorage.getItem('userDetail'))?.data
    ?.token
  useEffect(() => {
    setNameOrAddress(items.find((item) => item.key === currentLocation))
    updateAxiosToken(storedToken)
  }, [currentLocation])
  useEffect(() => {
    // Set checkInDate to tomorrow
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate())
    tomorrow.setHours('00')
    tomorrow.setMinutes('00')
    tomorrow.setSeconds('00')
    tomorrow.setMilliseconds('000')
    setCheckInDate(tomorrow)

    // Set checkOutDate to the day after tomorrow
    const dayAfterTomorrow = new Date()
    dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 1)
    dayAfterTomorrow.setHours('00')
    dayAfterTomorrow.setMinutes('00')
    dayAfterTomorrow.setSeconds('00')
    dayAfterTomorrow.setMilliseconds('000')
    setCheckOutDate(dayAfterTomorrow)
  }, [])

  useEffect(() => {
    dispatch(
      fetchSearchProducts(
        checkInDate?.valueOf(),
        checkOutDate?.valueOf(),
        nameOrAddress?.label,
        1,
        1,
        0,
        100000000,
        convenientvir,
        0,
      ),
    )
  }, [checkInDate, checkOutDate, nameOrAddress])
  const [currentPage, setCurrentPage] = useState(0)

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1)
  }

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1)
  }
  const YourData = [
    { img: imgsection, title: 'Hồ Chí Minh' },
    { img: imgslide2, title: 'Hà Nội' },
    { img: imgslide3, title: 'Hải Phòng' },
    { img: imgslide4, title: 'Ninh Bình' },
    { img: danangImg, title: 'Nha Trang' },
    { img: hoianImg, title: 'Hội An' },
    { img: sapaImg, title: 'Sapa' },
    { img: dalatImg, title: 'Đà Lạt' },
    { img: nhatrangImg, title: 'Đà Nẵng' },
    { img: hueImg, title: 'TP Huế' },
    { img: canthoImg, title: 'TP Cần Thơ' },
    { img: phuquocImg, title: 'Phú Quốc' },
    { img: imgslide4, title: 'An Giang' },
    // Thêm các dữ liệu khác tương tự
  ]
  const itemsPerPage = 7
  const startIndex = currentPage * itemsPerPage
  const endIndex = startIndex + itemsPerPage

  const itemsToShow = YourData.slice(startIndex, endIndex)

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <img src={slideform} style={{ width: '100%' }} />
      </div>
      <section style={sectionStyle}>
        <div className='texthead' style={{ textAlign: 'center' }}>
          Các Điểm Đến Thu Hút Nhất Việt Nam
        </div>
        <div
          className='allItem'
          style={{
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          {currentPage > 0 && (
            <div onClick={handlePrevPage}>
              <LeftOutlined style={{ fontSize: '22px' }} />
            </div>
          )}
          {itemsToShow.map((item, index) => (
            <div
              className='picturetrval'
              style={{ textAlign: 'center', width: '10%' }}
              key={index}
            >
              <Link to={`/home-stay?name=${item.title}`}>
                <div className='image-container'>
                  <img
                    src={item.img}
                    style={{ borderRadius: '50px' }}
                    alt='Hình ảnh'
                  />
                  <div className='hover-text'>
                    <Title level={5}>{item.title}</Title>
                  </div>
                </div>
              </Link>
            </div>
          ))}
          {(currentPage + 1) * itemsPerPage < YourData.length && (
            <div onClick={handleNextPage}>
              <RightOutlined
                style={{ fontSize: '22px', position: 'absolute' }}
              />
            </div>
          )}
        </div>
      </section>
      {/* <section style={{ padding: '0 150px 0 150px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Title>Chương trình khuyến mại</Title>
                    <div><a href='/home-stay' style={{ fontSize: 18, textDecoration: 'none' }}>Xem tất cả &gt;</a></div>
                </div>

                <Carousel style={{}}>
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <div style={{ width: 400, height: 185, marginRight: 40 }}><img src={slidekm} style={{ position: 'absolute', width: 400, height: 185 }} /></div>
                            <div style={{ width: 400, height: 185, marginRight: 40 }}><img src={slidekm} style={{ position: 'absolute', width: 400, height: 185 }} /></div>
                            <div style={{ width: 400, height: 185 }}><img src={slidekm} style={{ position: 'absolute', width: 400, height: 185 }} /></div>
                        </div>
                    </div>
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <div style={{ width: 400, height: 185, marginRight: 40 }}><img src={slidekm} style={{ position: 'absolute', width: 400, height: 185 }} /></div>
                            <div style={{ width: 400, height: 185, marginRight: 40 }}><img src={slidekm} style={{ position: 'absolute', width: 400, height: 185 }} /></div>
                            <div style={{ width: 400, height: 185 }}><img src={slidekm} style={{ position: 'absolute', width: 400, height: 185 }} /></div>
                        </div>
                    </div>
                </Carousel>
            </section> */}
      {/* <section style={{ marginTop: 30 }}>
                <div style={{ justifyContent: 'center', textAlign: 'center' }}>
                    <Title level={2}>Tiếng lành đồn xa</Title>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center' }} >
                    <div style={{ width: 368, height: 294, border: '1px solid #e9ebee', backgroundColor: '#fff', textAlign: 'center', padding: '15px 15px 15px 10px', marginRight: 30, borderBottom: '4px solid #75a8f9' }} >
                        <Title level={4} style={{ color: '#5392f9' }}>Nhà nghỉ ở phố cổ<br /></Title><Title level={5} style={{ color: '#737373' }}>Hà Nội</Title><br />
                        <span style={{ fontSize: 22, fontFamily: 'mallory,Helvetica Neue,Helvetica,Arial,sans-serif', color: 'black' }}>Tôi hoàn toàn hài lòng khi nghỉ tại phố cổ. Cám ơn trvalVIVU rất nhiều.</span>
                        <div style={{ marginTop: 30, fontSize: 18 }}>
                            <p>- Perter đến từ Anh quốc</p>
                        </div>
                    </div>
                    <div style={{ width: 368, height: 294, border: '1px solid #e9ebee', backgroundColor: '#fff', textAlign: 'center', padding: '15px 15px 15px 10px', marginRight: 30, borderBottom: '4px solid #75a8f9' }} >
                        <Title level={4} style={{ color: '#5392f9' }}>homestay haritage<br /></Title><Title level={5} style={{ color: '#737373' }}>Đà nẵng</Title><br />
                        <span style={{ fontSize: 22, fontFamily: 'mallory,Helvetica Neue,Helvetica,Arial,sans-serif', color: 'black' }}>Tôi săn được giá đặc biệt giờ chót với TravalVIVU. Phòng ốc rộng rãi, giường ngủ thoải mái và ấm cúng.</span>
                        <div style={{ marginTop: 30, fontSize: 18 }}>
                            <p>- fukada đến từ Nhật Bản</p>
                        </div>
                    </div>
                    <div style={{ width: 368, height: 294, border: '1px solid #e9ebee', backgroundColor: '#fff', textAlign: 'center', padding: '15px 15px 15px 10px', borderBottom: '4px solid #75a8f9' }} >
                        <Title level={4} style={{ color: '#5392f9' }}>homestay novotel<br /></Title><Title level={5} style={{ color: '#737373' }}>Phú QUốc</Title><br />
                        <span style={{ fontSize: 22, fontFamily: 'mallory,Helvetica Neue,Helvetica,Arial,sans-serif', color: 'black' }}>Sau khi nghỉ tại đây, mọi âu lo đều tan biến. Cám ơn trvalVIVU rất nhiều.</span>
                        <div style={{ marginTop: 30, fontSize: 18 }}>
                            <p>- Anh Wang đến từ Trung Quốc</p>
                        </div>
                    </div>
                </div>
            </section> */}
      <br />
      <br />
      <section style={{ marginBottom: 100 }}>
        <div style={{ textAlign: 'center' }}>
          <Title level={2}>Những chỗ nghỉ nổi bật dành cho quý khách:</Title>
        </div>
        <div>
          <Tabs
            defaultActiveKey='1'
            centered
            items={items}
            onChange={handleTabChange}
          />
        </div>
      </section>
    </div>
  )
}

export default ProductList
