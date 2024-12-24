import React, { useEffect, useState } from 'react'
import {
  Breadcrumb,
  Col,
  Layout,
  Menu,
  Row,
  theme,
  Rate,
  Button,
  Image,
  Progress,
  Space,
  Modal,
  message,
} from 'antd'
import {
  ClockCircleTwoTone,
  EnvironmentOutlined,
  FileTextTwoTone,
  InfoCircleTwoTone,
  StarTwoTone,
} from '@ant-design/icons'
import { Form, Table } from 'react-bootstrap'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import {
  addBooking,
  addInfoPayment,
  getOneProduct,
} from '../../../features/product/productThunk'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'


const { Header, Content, Footer } = Layout

export const BookingHomestay = () => {
  const formatCurrency = (value) => {
    // Sử dụng Intl.NumberFormat để định dạng giá trị tiền tệ
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(value);
  };

  const statusUser = JSON.parse(localStorage.getItem('userDetail'))?.success
  const userDetail = JSON.parse(localStorage.getItem('userDetail'))
  const params = useParams()
  useEffect(() => {
    dispatch(getOneProduct(params.id))
  }, [])
  const dispatch = useDispatch()
  const [infoPayment, setInfoPayment] = useState({
    name: userDetail?.data?.name,
    email: userDetail?.data?.email,
    phoneNumber: userDetail?.data?.phoneNumber,
  })
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalTypeBooking, setModalTyBooking] = useState(false)
  const detailHomestay = useSelector((state) => state.product.productDetails)
  const [totalPrice, setTotalPrice] = useState(0)
  const [typeBooking, setTypeBooking] = useState(1)

  const navigate = useNavigate()
  const onChangeName = (e) => {
    setInfoPayment({ ...infoPayment, name: e.target.value })
  }
  const onChangeEmail = (e) => {
    setInfoPayment({ ...infoPayment, email: e.target.value })
  }
  const onChangePhoneNumber = (e) => {
    setInfoPayment({ ...infoPayment, phoneNumber: e.target.value })
  }
  const booking = useSelector((state) => state.booking.bookings)

  const location = useLocation()
  const param = new URLSearchParams(location.search)
  const startDate = param.get('startDate')
  const endDate = param.get('endDate')
  const numNight = param.get('numNight')

  const handleBooking = (type) => {
    if (statusUser) {
      setIsModalOpen(true)

      const userID = userDetail?.data.id;
      const bookingData = {
        userId: userID,
        typeBooking: type,
        totalPrice: detailHomestay?.promotion?.value
          ? ((detailHomestay.price -
            detailHomestay?.promotion?.value +
            ((detailHomestay.price - detailHomestay?.promotion?.value) * 11) / 100) *
            numNight) /
          (type === 1 ? 1 : 2)
          : ((detailHomestay.price + (detailHomestay.price * 11) / 100) * numNight) / (type === 1 ? 1 : 2),
        startDate: startDate.valueOf(),
        endDate: endDate.valueOf(),
        name: infoPayment.name,
        email: infoPayment.email,
        phoneNumber: infoPayment.phoneNumber,
        homestayId: detailHomestay.id,
        idPromotion: detailHomestay?.promotion?.id || '',
        numberOfNight: numNight
      }
      setTotalPrice(bookingData.totalPrice)
      setTypeBooking(type)
    } else {
      message.info('Bạn vui lòng đăng nhập trước khi đặt homestay')
    }
  }
  const handleReviewBookingHomestay = (id) => {
    // Chuyển đến trang review với dữ liệu infoPayment trên URL
    navigate(
      `/review/booking/${id}?name=${infoPayment.name}&email=${infoPayment.email}&phoneNumber=${infoPayment.phoneNumber}
      &startDate=${startDate}&endDate=${endDate}&numNight=${numNight}&totalPrice=${totalPrice}&homestayId=${detailHomestay.id}&idPromotion=${detailHomestay?.promotion?.id || ''}&typeBooking=${typeBooking}`
    )
  }
  const isValidEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  }
  function isVietnamesePhoneNumberValid(number) {
    return /(((\+|)84)|0)(3|5|7|8|9)+([0-9]{8})\b/.test(number);
  }
  const handlecheckBookingHomestay = (id) => {
    if (infoPayment.name.trim().length === 0) {
      message.info('Số điện thoại không được trống')
      return false
    }
    if (infoPayment.phoneNumber.trim().length === 0) {
      message.info('Số điện thoại không được trống')
      return false
    }
    if (infoPayment.email.trim().length === 0) {
      message.info('Email không được trống')
      return false
    }
    if (!isValidEmail(infoPayment.email)) {
      message.info('Email không đúng định dạng')
      return false
    }
    if (!isVietnamesePhoneNumberValid(infoPayment.phoneNumber)) {
      message.info('Số điện thoại không đúng định dạng')
      return false
    }
    setModalTyBooking(true)
  }

  return (
    <>
      <Content
        className='site-layout'
        style={{
          padding: '0 100px',
          marginTop: '30px',
          color: 'black',
        }}
      >
        <Breadcrumb
          style={{
            margin: '-20px 24px',
            fontSize: '12px',
          }}
        >
          <Breadcrumb.Item>Homestay</Breadcrumb.Item>
          <Breadcrumb.Item>Booking</Breadcrumb.Item>
          <Breadcrumb.Item>{detailHomestay.name}</Breadcrumb.Item>
        </Breadcrumb>
        <div
          style={{
            paddingTop: 50,
            paddingRight: 100,
            paddingBottom: 50,
            paddingLeft: 100,
            minHeight: 380,
          }}
        >
          <Row>
            <Col span={24}>
              <h3 style={{ fontWeight: '700' }}>Đặt Homestay</h3>
              <div
                style={{
                  color: 'rgb(104, 113, 118)',
                  fontSize: '16px',
                  fontWeight: '700',
                }}
              >
                Hãy chắc chắn rằng tất cả thông tin trên trang này là chính xác
                trước khi tiến hành thanh toán.
              </div>
            </Col>
          </Row>
          <Row style={{ marginTop: '25px' }}>
            <Col span={17}>
              <h5 style={{ fontWeight: '700' }}>
                Chi tiết liên hệ (Cho Vé điện tử/Phiếu xác nhận)
              </h5>
              <div style={{ backgroundColor: 'white', borderRadius: '10px' }}>
                <Form style={{ padding: '20px' }}>
                  <Form.Group className='mb-3' controlId='name'>
                    <Form.Label style={{ fontWeight: '700' }}>
                      Họ và tên
                    </Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='Họ và tên'
                      value={infoPayment.name}
                      onChange={(e) => onChangeName(e)}
                    />
                    <Form.Text className='text-muted'>
                      *Nhập tên như trên CMND/ hộ chiếu
                    </Form.Text>
                  </Form.Group>

                  <Form.Group className='mb-3' controlId='phoneNumber'>
                    <Form.Label style={{ fontWeight: '700' }}>
                      Số điện thoại
                    </Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='Số điện thoại'
                      value={infoPayment.phoneNumber}
                      onChange={(e) => onChangePhoneNumber(e)}
                    />
                    <Form.Text className='text-muted'>
                      VD : 0968374183
                    </Form.Text>
                  </Form.Group>
                  <Form.Group className='mb-3' controlId='Email'>
                    <Form.Label style={{ fontWeight: '700' }}>Email</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='Email'
                      value={infoPayment.email}
                      onChange={(e) => onChangeEmail(e)}
                    />
                    <Form.Text className='text-muted'>
                      VD: email@example.com
                    </Form.Text>
                  </Form.Group>
                </Form>
              </div>
            </Col>
            <Col span={6} push={1} style={{ marginTop: '8px' }}>
              <div style={{ backgroundColor: 'white', borderRadius: '10px' }}>
                <Row style={{ margin: '25px 0px 0px 15px' }}>
                  <Col span={4}>
                    <Image
                      src='https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/6/6aa2fd01a9460e1a71bb0efb713f0212.svg'
                      style={{ marginTop: '10px' }}
                    />
                  </Col>
                  <Col span={20}>
                    <div>{detailHomestay.name}</div>
                    <div>{detailHomestay.name}</div>
                  </Col>
                </Row>
                <Row
                  style={{
                    marginTop: '15px',
                    backgroundColor: 'rgba(247,249,250,1.00)',
                  }}
                >
                  <Col span={11} push={1}>
                    <div style={{ color: 'rgb(104, 113, 118)' }}>
                      Ngày nhận phòng:{' '}
                    </div>
                  </Col>
                  <Col span={11} push={1}>
                    <div style={{ fontWeight: '500' }}>
                      {moment(startDate * 1)
                        .locale('vi')
                        .format('LL')}
                      , Từ 14:00
                    </div>
                  </Col>
                </Row>
                <Row style={{ backgroundColor: 'rgba(247,249,250,1.00)' }}>
                  <Col span={11} push={1}>
                    <div style={{ color: 'rgb(104, 113, 118)' }}>
                      Ngày trả phòng:{' '}
                    </div>
                  </Col>
                  <Col span={11} push={1}>
                    <div style={{ fontWeight: '500' }}>
                      {moment(endDate * 1)
                        .locale('vi')
                        .format('LL')}
                      , Trước 12:00{' '}
                    </div>
                  </Col>
                </Row>
                <Row
                  style={{ margin: '25px 0px 0px 15px', paddingBottom: '20px' }}
                >
                  <Col span={10}>
                    <div>Số phòng :</div>
                    <Image
                      style={{ borderRadius: '10px', marginTop: '10px' }}
                      width={70}
                      height={70}
                      src={detailHomestay?.images?.[0]?.imgUrl}
                    />
                  </Col>
                  <Col span={8} push={1}>
                    <div style={{ fontWeight: '500' }}>
                      {detailHomestay.roomNumber} phòng
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
          <Row style={{ marginTop: '25px' }}>
            <Col span={17}>
              <h6 style={{ fontWeight: '700' }}>Chi tiết giá</h6>
              <div style={{ backgroundColor: 'white', borderRadius: '10px' }}>
                <Row>
                  <Col span={10}>
                    <div
                      style={{
                        padding: '20px 0px 5px 20px',
                        fontSize: '18px',
                        fontWeight: '700',
                      }}
                    >
                      Số tiền (1 Đêm)
                    </div>
                  </Col>
                  <Col span={8} push={4}>
                    {detailHomestay?.promotion?.value ? (
                      <div
                        style={{
                          padding: '20px 0px 5px 20px',
                          fontSize: '18px',
                          fontWeight: '700',
                          float: 'right',
                        }}
                      >
                        {formatCurrency(detailHomestay.price -
                          detailHomestay?.promotion?.value +
                          ((detailHomestay.price -
                            detailHomestay?.promotion?.value) *
                            11) /
                          100)}{' '}

                      </div>
                    ) : (
                      <div
                        style={{
                          padding: '20px 0px 5px 20px',
                          fontSize: '18px',
                          fontWeight: '700',
                          float: 'right',
                        }}
                      >
                        {formatCurrency(detailHomestay.price +
                          (detailHomestay.price * 11) / 100)}{' '}

                      </div>
                    )}
                  </Col>
                </Row>
                <Row>
                  <Col span={10}>
                    <div
                      style={{
                        padding: '20px 0px 5px 20px',
                        fontSize: '18px',
                        fontWeight: '700',
                      }}
                    >
                      Số đêm
                    </div>
                  </Col>
                  <Col span={8} push={4}>
                    <div
                      style={{
                        padding: '20px 0px 5px 20px',
                        fontSize: '18px',
                        fontWeight: '700',
                        float: 'right',
                      }}
                    >
                      {numNight} Đêm
                    </div>
                  </Col>
                </Row>
                <Row style={{ marginTop: '15px' }}>
                  <Col span={1}>
                    <InfoCircleTwoTone
                      style={{ fontSize: '26px', padding: '20px 0px 5px 20px' }}
                    />
                  </Col>
                  <Col span={20} push={1}>
                    <div
                      style={{
                        paddingTop: '15px',
                        fontWeight: '700',
                        fontSize: '16px',
                        color: 'rgb(1, 148, 243)',
                      }}
                    >
                      Mọi thắc mắc về hóa đơn, vui lòng tham khảo Điều khoản và
                      Điều kiện của TravelVIVU để được giải đáp
                    </div>
                    <hr />
                  </Col>
                </Row>
                <Row style={{ padding: '5px 0px 5px 20px' }}>
                  <Col span={10}>
                    <div style={{ fontWeight: '600', fontSize: '18px' }}>
                      {detailHomestay.name} ({numNight} Đêm)
                    </div>
                  </Col>
                  <Col span={8} push={4}>
                    {detailHomestay?.promotion?.value ? (
                      <div
                        style={{
                          fontWeight: '600',
                          fontSize: '18px',
                          float: 'right',
                        }}
                      >
                        {formatCurrency((detailHomestay.price -
                          detailHomestay?.promotion?.value +
                          ((detailHomestay.price -
                            detailHomestay?.promotion?.value) *
                            11) /
                          100) *
                          numNight)}{' '}

                      </div>
                    ) : (
                      <div
                        style={{
                          fontWeight: '600',
                          fontSize: '18px',
                          float: 'right',
                        }}
                      >
                        {formatCurrency((detailHomestay.price +
                          (detailHomestay.price * 11) / 100) *
                          numNight)}{' '}

                      </div>
                    )}
                  </Col>
                </Row>
              </div>
              <Row style={{ padding: '15px 0px 15px 0px' }}>
                <Col span={8}>
                  <div style={{ fontSize: '14px', fontWeight: '500' }}>
                    Khi nhấn vào nút này bạn công nhận mình đã đọc và đồng ý với
                    các Điều khoản & Điều kiện và Chính sách quyền riêng tư của
                    TravelVIVU
                  </div>
                </Col>
                <Col span={16}>
                  <div style={{ float: 'right', marginTop: '5px' }}>
                    <Button
                      onClick={() => handlecheckBookingHomestay()}
                      style={{
                        color: 'white',
                        fontWeight: '500',
                        fontSize: '14px',
                        backgroundColor: 'rgb(255, 94, 31)',
                        width: '85px',
                        height: '40px',
                      }}
                    >
                      Tiếp tục
                    </Button>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </Content>

      <Footer
        style={{
          textAlign: 'center',
        }}
      ></Footer>

      <Modal
        title='Hình thức thanh toán'
        open={modalTypeBooking}
        onCancel={() => setModalTyBooking(false)}
        okText='Thanh toán'
        cancelText='Đặt cọc'
        footer={[
          <Button key="back" onClick={() => handleBooking(0)}>
            Đặt cọc
          </Button>,
          <Button key="submit" style={{ backgroundColor: 'lightblue' }} onClick={() => handleBooking(1)}>
            Thanh toán
          </Button>
        ]}
      >
        <h5>Bạn muốn đặt cọc 50% số tiền hay thanh toán trước?</h5>
      </Modal>

      <Modal
        title='Xác nhận thông tin'
        open={isModalOpen}
        onOk={() => handleReviewBookingHomestay(params?.id)}
        onCancel={() => setIsModalOpen(false)}
        okText='Tiếp tục'
        cancelText='Hủy'
      >
        <h5>Tất cả thông tin bạn điền đã chính xác chưa?</h5>
        <p>Email: {infoPayment?.email}</p>
        <p>Số điện thoại: {infoPayment?.phoneNumber}</p>
      </Modal>
    </>
  )
}
