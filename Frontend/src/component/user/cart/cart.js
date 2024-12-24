import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../../../features/product/productThunk'
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBRow,
  MDBTypography,
} from 'mdb-react-ui-kit'
import { Link, useNavigate } from 'react-router-dom'
import {
  Button,
  Checkbox,
  Popconfirm,
  Radio,
  Rate,
  Typography,
  message,
} from 'antd'
import {
  deleteAllShoppingCart,
  deleteShoppingCart,
  fetchShoppingCart,
} from '../../../features/user/shoppingCartThunk'
import {
  CloseOutlined,
  DeleteOutlined,
  EnvironmentOutlined,
  SearchOutlined,
} from '@ant-design/icons'
import moment from 'moment'

const { Title } = Typography

export const CartUser = () => {
  const shoppingcart = useSelector((state) => state.shoppingcart.shoppingCart)
  const desc = ['Tệ', 'Không hài lòng', 'Bình thường', 'Hài lòng', 'Tuyệt vời']
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const userDetail = JSON.parse(localStorage.getItem('userDetail'))
  const namelocal = userDetail?.data.id
  useEffect(() => {
    dispatch(fetchShoppingCart(namelocal))
  }, [])
  const handleDetailHomestay = (id) => {
    navigate(`/homestay/detail/${id}`)
  }

  const [selectedRadio, setSelectedRadio] = useState([])
  const [selectedRadioData, setSelectedRadioData] = useState([])
  // const [totalNext, setTotalNext] = useState(0)
  const handleRadioChange = (e) => {
    const index = e.target.value
    setSelectedRadio(index)
    setSelectedRadioData(shoppingcart[index])
  }
  const formatCurrency = (value) => {
    // Sử dụng Intl.NumberFormat để định dạng giá trị tiền tệ
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(value)
  }
  const handleDeleteCart = async (id) => {
    await dispatch(deleteShoppingCart(id))
    message.info('Xóa homestay thành công')
    dispatch(fetchShoppingCart(namelocal))
  }
  const handleDeleteAllCart = async () => {
    await dispatch(deleteAllShoppingCart(namelocal))
    message.info('Xóa tất cả homestay thành công')
    dispatch(fetchShoppingCart(namelocal))
  }
  return (
    <section
      style={{
        backgroundColor: '#eee',
        padding: '20px 200px 200px 200px',
        display: 'flex',
      }}
    >
      <div
        style={{
          flex: '60%', // 60% chiều rộng
          marginRight: 20,
        }}
      >
        <div
          style={{
            width: '100%',
            // height: '40%',
            backgroundColor: 'white',
            border: '1px solid rgb(213, 217, 226)',
            padding: 10,
            borderRadius: 5,
            display: 'flex',
          }}
        >
          <Title level={3}>Homestay bạn đã lưu ({shoppingcart?.length})</Title>
          <div style={{ marginLeft: 'auto' }}>
            <Popconfirm
              title='Bạn có muốn xóa tất cả homestay đã lưu trong giỏ hàng?'
              onConfirm={() => handleDeleteAllCart()}
              okText='có'
              cancelText='không'
              placement='topRight'
            >
              <Button
                style={{
                  display: 'flex',
                }}
                danger
              >
                <DeleteOutlined style={{ marginTop: 5 }} />
                Xóa tất cả homestay đã lưu
              </Button>
            </Popconfirm>
          </div>
        </div>
        <br />
        {shoppingcart?.length === 0 ? (
          <div style={{ textAlign: 'center', marginTop: 20 }}>
            Xe đẩy hàng của bạn đang trống
          </div>
        ) : (
          shoppingcart?.map((items, index) => {
            const addressArray = items.address.split(',') // Tách chuỗi thành mảng dựa trên dấu phẩy

            const imageUrls = items.image.split(',')

            // Ensure there is at least one image URL
            const imageUrl = imageUrls?.length > 0 ? imageUrls[0].trim() : ''
            const city = addressArray.length >= 4 ? addressArray[3].trim() : ''
            const averagePoint = items.point
            const startDate = moment(items.startDate * 1)
            const endDate = moment(items.endDate * 1)

            // Calculate the difference in days
            const nightCount = endDate.diff(startDate, 'days')
            const TotolPrice = formatCurrency(
              (items.price -
                items?.valuePromotion +
                ((items.price - items?.valuePromotion) * 11) / 100) *
              nightCount,
            )

            return (
              <div
                style={{
                  width: '100%',
                  // height: '100%',
                  backgroundColor: 'white',
                  border: '1px solid rgb(213, 217, 226)',
                  padding: 10,
                  borderRadius: 5,
                  marginBottom: 20,
                }}
                key={index}
              >
                <div style={{ display: 'flex' }}>
                  <img src={imageUrl} style={{ width: 150 }} />
                  <div style={{ marginLeft: 5 }}>
                    <Title
                      level={5}
                      style={{
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {items.name}
                    </Title>
                    <div style={{ display: 'flex' }}>
                      <Title
                        level={5}
                        style={{
                          overflow: 'hidden',
                          whiteSpace: 'nowrap',
                          textOverflow: 'ellipsis',
                          marginLeft: 5,
                          display: 'flex',
                        }}
                      >
                        <EnvironmentOutlined style={{ marginTop: 4 }} />
                        {city}
                      </Title>
                    </div>
                    <div style={{ display: 'flex' }}>
                      <div
                        style={{
                          width: 30,
                          height: 30,
                          borderRadius: 8,
                          backgroundColor: 'rgb(62, 108, 234)',
                          textAlign: 'center',
                        }}
                      >
                        {averagePoint ? (
                          <span
                            style={{
                              fontWeight: 500,
                              color: 'white',
                              fontSize: 18,
                            }}
                          >
                            {desc[averagePoint - 1]}
                          </span>
                        ) : (
                          <span
                            style={{
                              fontWeight: 500,
                              color: 'white',
                              fontSize: 18,
                            }}
                          >
                            0
                          </span>
                        )}
                      </div>
                      <Rate
                        style={{ marginLeft: 8 }}
                        tooltips={desc}
                        value={averagePoint}
                        disabled
                      />
                      {averagePoint ? (
                        <span>{desc[averagePoint - 1]}</span>
                      ) : (
                        ''
                      )}
                    </div>
                    <div>
                      <Title level={5}>Có {items.quantityCmt} đánh giá</Title>
                    </div>
                    <div style={{ marginLeft: 5, display: 'flex' }}>
                      {items.status !== '0' ? (
                        <span style={{ color: 'red', fontWeight:'600' }}>Đã hết hạn hoặc homestay đã được booking</span>
                      ) : (
                        <>
                          (<Title level={5}> {nightCount} đêm</Title>)
                        </>
                      )}
                    </div>
                  </div>
                  <div style={{ marginLeft: 'auto' }}>
                    <Popconfirm
                      title='Bạn có muốn xóa homestay này khỏi giỏ hàng không?'
                      onConfirm={() => handleDeleteCart(items.id)}
                      okText='có'
                      cancelText='không'
                      placement='topRight'
                    >
                      <DeleteOutlined />
                    </Popconfirm>
                  </div>
                </div>
                <hr />
                <div style={{ display: 'flex' }}>
                  <Radio.Group
                    onChange={handleRadioChange}
                    value={selectedRadio}
                    disabled={items.status !== '0'}
                  >
                    <Radio value={index} />
                  </Radio.Group>
                  <div>
                    {moment(items.startDate * 1)
                      .locale('vi')
                      .format('LL')}
                    {' - '}
                    {moment(items.endDate * 1)
                      .locale('vi')
                      .format('LL')}{' '}
                  </div>
                  <div style={{ marginLeft: 'auto' }}>
                    <Title level={4}>{TotolPrice}</Title>
                  </div>
                </div>
              </div>
            )
          })
        )}
      </div>
      <div
        style={{
          flex: '35%', // 40% chiều rộng
        }}
      >
        <div
          style={{
            width: '100%',
            // height: '90%',
            backgroundColor: 'white',
            border: '1px solid rgb(213, 217, 226)',
            padding: 10,
            borderRadius: 5,
          }}
        >
          <div style={{ display: 'flex' }}>
            <Title level={5}>Tổng giá</Title>
            {selectedRadioData.length === 0 ? (
              <span>&emsp;Bạn chưa chọn homestay nào</span>
            ) : (
              <div style={{ display: 'flex', marginLeft: 'auto' }}>
                <Title level={4}>
                  {formatCurrency(
                    (selectedRadioData.price -
                      selectedRadioData?.valuePromotion +
                      ((selectedRadioData.price -
                        selectedRadioData?.valuePromotion) *
                        11) /
                      100) *
                    moment(selectedRadioData.endDate * 1).diff(
                      moment(selectedRadioData.startDate * 1),
                      'days',
                    ),
                  )}
                </Title>
              </div>
            )}
          </div>
          <Link
            to={`/homestay/booking/${selectedRadioData.idHomestay}?startDate=${selectedRadioData.startDate
              }&endDate=${selectedRadioData.endDate}&numNight=${moment(
                selectedRadioData.endDate * 1,
              ).diff(moment(selectedRadioData.startDate * 1), 'days')}`}
          >
            <MDBBtn
              type='submit'
              className='w-100 mb-4'
              size='md'
              style={{ marginTop: 10 }}
              disabled={loading || selectedRadioData.length === 0}
            >
              {loading ? 'Đang lưu...' : 'Tiếp theo'}
            </MDBBtn>
          </Link>
        </div>
      </div>
    </section>
  )
}
