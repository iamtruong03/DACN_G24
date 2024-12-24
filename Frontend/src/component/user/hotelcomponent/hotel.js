import {
  Typography,
  DatePicker,
  Select,
  Input,
  Collapse,
  Button,
  Layout,
  Slider,
  Checkbox,
  Rate,
  Pagination,
} from 'antd'
import hotelimg from '../../../assets/img/saleHotel.png'
import logoTravel from '../../../assets/svg/Rectangle 405.svg'
import {
  SearchOutlined,
  FireOutlined,
  UserOutlined,
  WalletOutlined,
  UsergroupAddOutlined,
  PayCircleOutlined,
  CompassOutlined,
  ShopOutlined,
  InsertRowRightOutlined,
} from '@ant-design/icons'
import { MDBInputGroup, MDBIcon } from 'mdb-react-ui-kit'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import imgheadhotel from '../../../assets/img/imgheadhotel.png'
import 'dayjs/locale/vi'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchProducts,
  getProducts,
} from '../../../features/product/productThunk'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import {
  fetchSearchProducts,
  fetchSearchProductsByPage,
  getAllConvinentHomestay,
} from '../../../features/product/searchProductThunk'
import moment from 'moment'
import { fetchConvenientsSuccess } from '../../../features/product/productSlide'
dayjs.locale('vi')
const { Title } = Typography
const { Header, Footer, Sider, Content } = Layout

const Hotel = () => {
  /**
   * pagination
   */
  const [current, setCurrent] = useState(1)
  const onChangePage = (page) => {
    setCurrent(page)
    dispatch(
      fetchSearchProductsByPage(
        checkInDate.valueOf(),
        calculateCheckOutDate().valueOf(),
        nameLocation || nameOrAddress,
        numberPerson,
        roomNumber,
        rangeValue[0],
        rangeValue[1],
        convenientvir,
        page - 1,
      ),
    )
  }
  const products = useSelector((state) => state.product.products)
  const convenient = useSelector((state) => state.product.convenient)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const nameLocation = searchParams.get('name')

  let checkOutDate
  const handleDetailHomestay = async (id) => {
    navigate(
      `/homestay/detail/${id}?startDate=${checkInDate.valueOf()}&endDate=${calculateCheckOutDate().valueOf()}&numNight=${numNights}`,
    )
  }
  useEffect(() => {
    // dispatch(getProducts(current - 1));
    dispatch(getAllConvinentHomestay())
    const dateFix = new Date(today)
    dateFix.setHours('00')
    dateFix.setMinutes('00')
    dateFix.setSeconds('00')
    dateFix.setMilliseconds('000')
    setCheckInDate(dateFix.valueOf())
    calculateCheckOutDate()
  }, [])
  const onChange = (key) => {}
  const formatCurrency = (value) => {
    // Sử dụng Intl.NumberFormat để định dạng giá trị tiền tệ
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(value)
  }
  const today = dayjs()
  const [checkInDate, setCheckInDate] = useState(today)
  const [numNights, setNumNights] = useState(1)
  const handleCheckInChange = (date) => {
    const dateFix = new Date(date)
    dateFix.setHours('00')
    dateFix.setMinutes('00')
    dateFix.setSeconds('00')
    dateFix.setMilliseconds('000')
    setCheckInDate(dateFix.valueOf())
  }
  const handleNumNightsChange = (value) => {
    setNumNights(value)
  }
  const handleKeyDown = (e) => {
    // Kiểm tra nếu ký tự không phải là số thì chặn
    if (isNaN(Number(e.key))) {
      e.preventDefault()
    }
  }

  const disabledDate = (current) => {
    // Can not select days before today and today
    return current && current < dayjs().startOf('day')
  }
  const disabledDateTime = () => ({
    disabledHours: () => range(0, 24).splice(4, 20),
    disabledMinutes: () => range(30, 60),
    disabledSeconds: () => [55, 56],
  })
  const range = (start, end) => {
    const result = []
    for (let i = start; i < end; i++) {
      result.push(i)
    }
    return result
  }
  const options = []
  for (let i = 1; i < 30; i++) {
    options.push({
      value: i,
      label: i + ' đêm',
    })
  }
  const calculateCheckOutDate = () => {
    if (checkInDate) {
      checkOutDate = dayjs(checkInDate).add(numNights, 'day')
      return checkOutDate
    }
    return null
  }
  checkOutDate = dayjs(checkInDate).add(numNights, 'day')
  const [rangeValue, setRangeValue] = useState([0, 25000000])
  const initialValue = [0, 25000000]
  const handleSliderChange = (value) => {
    // Kiểm tra nếu giá trị trái lớn hơn giá trị phải
    if (value[0] > value[1]) {
      return
    }
    setRangeValue(value)
  }
  const handleInputChange = (index, value) => {
    const newValue = [...rangeValue]
    newValue[index] = value

    // Kiểm tra nếu khoảng cách giữa giá trị trái và giá trị phải lớn hơn 20000
    if (newValue[1] - newValue[0] < 20000) {
      return
    }

    setRangeValue(newValue)
  }
  const handleresetinput = () => {
    setRangeValue(initialValue)
  }
  const [nameOrAddress, setNameOrAddress] = useState('Hà Nội')
  const [numberPerson, setNumberPerson] = useState(1)
  const [roomNumber, setRoomNumber] = useState(1)
  const [convenientvir, setconvenient] = useState('')
  const [notification, setNotification] = useState('')
  const onChangeConvenients = (checkedValues) => {
    setconvenient(checkedValues.join(','))
  }

  const handleSearch = () => {
    if (nameOrAddress == '') {
      setNotification('Vui lòng nhập tên hoặc địa chỉ')
    } else {
      setNotification('')
      dispatch(
        fetchSearchProductsByPage(
          checkInDate.valueOf(),
          calculateCheckOutDate().valueOf(),
          nameLocation || nameOrAddress,
          numberPerson,
          roomNumber,
          rangeValue[0],
          rangeValue[1],
          convenientvir,
          current - 1,
        ),
      )
    }
  }
  // console.log(nameOrAddress)
  useEffect(() => {
    dispatch(
      fetchSearchProductsByPage(
        checkInDate.valueOf(),
        calculateCheckOutDate().valueOf(),
        nameLocation || nameOrAddress,
        numberPerson,
        roomNumber,
        rangeValue[0],
        rangeValue[1],
        convenientvir,
        current - 1,
      ),
    )
  }, [checkInDate, nameLocation])
  // const groupedConvenient = convenient.reduce((acc, item) => {
  //   const typeName = item.convenientHomestayType.name

  //   const typePrefix = typeName.match(/^Type \d+/)

  //   const key = typePrefix ? typePrefix[0] : typeName

  //   acc[key] = acc[key] || []

  //   acc[key].push(item)

  //   return acc
  // }, {})

  // // Map the grouped items to display
  // const mappedConvenient = Object.entries(groupedConvenient).map(
  //   ([title, items]) => ({
  //     title,
  //     items,
  //   }),
  // )

  const text = (
    <section>
      <div
        style={{
          justifyContent: 'space-between',
          display: 'flex',
          fontSize: 18,
        }}
      >
        <div style={{ display: 'flex' }}>
          <UserOutlined style={{ marginBottom: 10 }} />
          &ensp;số lượng người
        </div>
        <div>
          <Input
            style={{ width: 100, height: 40 }}
            defaultValue={1}
            onChange={(e) => setNumberPerson(e.target.value)}
          />
        </div>
        <div style={{ display: 'flex' }}>
          <InsertRowRightOutlined style={{ marginBottom: 10 }} />
          &ensp;số lượng phòng
        </div>
        <div>
          <Input
            style={{ width: 100, height: 40 }}
            defaultValue={1}
            onChange={(e) => setRoomNumber(e.target.value)}
          />
        </div>
      </div>
    </section>
  )
  const utilities = (
    <div
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: '5px 5px 5px',
      }}
    >
      <div>
        <div>
          {convenient?.map((items) => (
            <div style={{ marginBottom: 10 }}>
              {items.name}
              <br />

              <Checkbox.Group
                options={items.convenientHomestays.map((item) => ({
                  label: item.name,
                  value: item.id,
                }))}
                onChange={onChangeConvenients}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
  const items = [
    {
      key: '1',
      label: 'Bạn hãy chọn số lượng người',
      children: <p>{text}</p>,
    },
  ]
  const itemsutilities = [
    {
      key: '2',
      label: 'Tiện nghi',
      children: <p>{utilities}</p>,
    },
  ]
  return (
    <>
      <section
        style={{
          width: '100%',
          position: 'relative',
          height: 300,
          backgroundImage: 'linear-gradient(-180deg,rgba(0,160,255,1),#0770cd)',
          minHeight: 50,
          marginBottom: 400,
        }}
      >
        <div
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            display: 'flex',
            bottom: 120,
            padding: '40px 100px 100px 0',
          }}
        >
          <Title level={2} style={{ color: 'white' }}>
            Tìm & đặt phòng homestay giá rẻ chỉ với <br />3 bước đơn giản!
            <br />
            <br />
            <Title level={4} style={{ color: 'rgba(255,255,255,1)' }}>
              Khám phá ngay những ưu đãi tốt nhất dành cho
              <br /> bạn tại TravelVIVU!
            </Title>
          </Title>
          &emsp;&emsp;&emsp;&emsp;
          <img src={hotelimg} style={{ borderRadius: 8, width: '30%' }} />
        </div>
        <div style={{ justifyContent: 'center', display: 'flex' }}>
          <div
            style={{
              position: 'absolute',
              width: 960,
              height: 380,
              backgroundColor: 'white',
              bottom: -350,
              borderRadius: 10,
              boxShadow: '0 0 3px 3px #ACAEB1',
              padding: '20px 20px 20px 20px',
            }}
          >
            <Title level={4} style={{ color: '#0194f3', display: 'flex' }}>
              <SearchOutlined style={{ marginTop: 5, marginRight: 10 }} />{' '}
              <div> Hãy tìm kiếm homestay quý khách mong muốn</div>{' '}
            </Title>
            <hr />
            <div>
              <h5 style={{ fontSize: 16 }}>
                Thành phố đia điểm hoặc tên homestay
              </h5>
              <MDBInputGroup
                className='mb-3'
                size='lg'
                noBorder
                textBefore={<MDBIcon fas icon='search' />}
              >
                <input
                  className='form-control'
                  type='text'
                  placeholder='Search'
                  defaultValue={nameLocation || 'Hà Nội'}
                  onChange={(e) => setNameOrAddress(e.target.value)}
                  required
                />
              </MDBInputGroup>
              <div style={{ color: 'red', marginLeft: 30 }}>{notification}</div>
              <div>
                <div style={{ display: 'flex' }}>
                  <h5 style={{ fontSize: 16 }}>Nhận phòng:</h5>
                  <h5 style={{ fontSize: 16, marginLeft: 260 }}>Số đêm:</h5>
                  <h5 style={{ fontSize: 16, marginLeft: 260 }}>Trả phòng:</h5>
                </div>
                <div style={{ display: 'flex' }}>
                  <DatePicker
                    format='YYYY-MM-DD'
                    disabledDate={disabledDate}
                    disabledTime={disabledDateTime}
                    defaultValue={today}
                    size='lg'
                    style={{ width: 300, height: 40 }}
                    onChange={handleCheckInChange}
                    onKeyDown={handleKeyDown}
                    allowClear={false}
                  />
                  &emsp;&emsp;&emsp;
                  <Select
                    defaultValue='1 đêm'
                    style={{ width: 300, minWidth: '50px', height: 40 }} // Thêm maxWidth ở đây
                    size='large'
                    options={options}
                    suffixIcon={<FireOutlined style={{ fontSize: 18 }} />}
                    onChange={handleNumNightsChange}
                  />
                  <div>
                    <h5 style={{ fontSize: 18, marginLeft: 30, marginTop: 8 }}>
                      {calculateCheckOutDate()?.format(
                        'dddd, DD [tháng] MM [năm] YYYY',
                      )}
                    </h5>
                  </div>
                </div>
              </div>
              <div>
                <h5 style={{ fontSize: 16 }}>Khách vào phòng</h5>
                <div
                  style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                  <Collapse
                    items={items}
                    onChange={onChange}
                    style={{ width: '70%', height: 40 }}
                  />
                  <Button
                    style={{ height: 40, width: '25%', fontSize: 18 }}
                    onClick={handleSearch}
                  >
                    <SearchOutlined />
                    Tìm Homestay
                  </Button>
                </div>
              </div>
              <br />
              <div
                style={{
                  color: '#0194f3',
                  fontSize: 18,
                  display: 'flex',
                  float: 'right',
                }}
              >
                <PayCircleOutlined style={{ marginTop: 5 }} /> &ensp;Thanh toán
                trực tuyến
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: '20px 200px 400px 200px' }}>
        <Layout>
          <Sider style={{ marginRight: 40, backgroundColor: '#f5f5f5' }}>
            &emsp;&emsp;&emsp;&ensp;
            <img src={logoTravel} />
            <br />
            <br />
            <div
              style={{
                display: 'flex',
                width: '100%',
                height: '150px',
                backgroundColor: 'white',
                borderRadius: 10,
                padding: '5px 5px 5px',
              }}
            >
              <div>
                <div style={{ display: 'flex' }}>
                  <Title level={2} style={{ fontSize: 16 }}>
                    Phạm vi giá
                  </Title>
                  <Title
                    level={2}
                    style={{
                      fontSize: 16,
                      marginLeft: 40,
                      color: '#0194f3',
                      cursor: 'pointer',
                    }}
                    onClick={handleresetinput}
                  >
                    Đặt lại
                  </Title>
                </div>
                <Title level={2} style={{ fontSize: 12 }}>
                  1 phòng 1 đêm
                </Title>
                <div style={{ display: 'flex' }}>
                  <Input
                    style={{ width: 90, height: 20, fontSize: 10 }}
                    value={rangeValue[0]}
                    onChange={(e) => handleInputChange(0, e.target.value)}
                    prefix='VND'
                  />
                  &ensp;
                  <Input
                    style={{ width: 90, height: 20, fontSize: 10 }}
                    value={rangeValue[1]}
                    onChange={(e) => handleInputChange(1, e.target.value)}
                    prefix='VND'
                  />
                </div>
                <Slider
                  range={{
                    draggableTrack: true,
                  }}
                  min={0}
                  max={25000000}
                  value={rangeValue}
                  step={20000}
                  onChange={handleSliderChange}
                />
              </div>
            </div>
            <br />
            <Collapse
              items={itemsutilities}
              size='small'
              defaultActiveKey={['2']}
              onChange={onChange}
            />
          </Sider>
          <Content style={{}}>
            <section>
              <div
                style={{
                  width: '100%',
                  height: 50,
                  backgroundColor: '#ffffff',
                  borderRadius: 8,
                  boxShadow: '0 0 3px 1px #ACAEB1',
                  display: 'flex',
                }}
              >
                <img
                  src={imgheadhotel}
                  style={{ height: 50, borderRadius: 8 }}
                />
                <h1 style={{ fontSize: 18, marginTop: 12, color: '#0194f3' }}>
                  Chào mừng bạn đến với TravelVIVU nơi có những ưu đãi tốt nhất
                  dành cho bạn!!!
                </h1>
              </div>
              <div>
                {products.data && products.data.length > 0 ? (
                  products.data.map((item) => {
                    const averagePoint =
                      item.comment.reduce(
                        (sum, comment) => sum + comment.point,
                        0,
                      ) / item.comment.length

                    return (
                      <div
                        key={item.id}
                        style={{
                          width: '100%',
                          height: 210,
                          backgroundColor: '#ffffff',
                          borderRadius: 8,
                          boxShadow: '0 0 3px 1px #ACAEB1',
                          marginTop: 20,
                          padding: '2px 2px 2px 2px',
                          display: 'flex',
                        }}
                      >
                        <div style={{ width: '35%' }}>
                          <img
                            src={item.images[0]?.imgUrl}
                            style={{ borderRadius: 8, height: 150, width: 255 }}
                          />
                          <div style={{ marginTop: 8, display: 'flex' }}>
                            <img
                              src={item.images[1]?.imgUrl}
                              style={{
                                borderRadius: 8,
                                height: 48,
                                marginRight: 6,
                                width: 80,
                              }}
                            />
                            <img
                              src={item.images[2]?.imgUrl}
                              style={{
                                borderRadius: 8,
                                height: 48,
                                marginRight: 6,
                                width: 80,
                              }}
                            />
                            <img
                              src={item.images[3]?.imgUrl}
                              style={{
                                borderRadius: 8,
                                height: 48,
                                marginRight: 6,
                                width: 80,
                              }}
                            />
                          </div>
                        </div>
                        <div style={{ width: '50%', marginRight: 'auto' }}>
                          <h1
                            style={{
                              fontSize: 18,
                              marginTop: 10,
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              width: 250,
                            }}
                          >
                            {item?.name}
                          </h1>
                          <Rate
                            allowHalf
                            disabled
                            defaultValue={averagePoint}
                            size='sm'
                          />
                          <br />
                          <div style={{ display: 'flex', marginTop: 10 }}>
                            &ensp;
                            <Title
                              style={{
                                fontSize: 16,
                                textOverflow: 'ellipsis',
                                width: 300,
                                marginTop: 3,
                              }}
                            >
                              <CompassOutlined style={{}} />
                              <span style={{ marginLeft: 10 }}>
                                {item.address}
                              </span>
                            </Title>
                          </div>
                          <h1
                            style={{
                              width: '100%',
                              height: 20,
                              backgroundColor: 'rgb(242, 243, 243)',
                              borderRadius: 8,
                              fontSize: 14,
                              padding: '0 2px 0 2px',
                            }}
                          >
                            Thanh toán trực tuyến
                          </h1>
                        </div>
                        <div
                          style={{
                            marginLeft: 10,
                            borderLeft: '1px solid #ACAEB1',
                            padding: '8px 8px 2px 12px',
                            width: '30%',
                          }}
                        >
                          <div
                            style={{
                              display: 'flex',
                              color: 'rgb(5, 165, 105)',
                            }}
                          >
                            <ShopOutlined
                              style={{ marginTop: 3, fontSize: 14 }}
                            />{' '}
                            Ưu đãi dành riêng cho bạn...
                          </div>
                          <div style={{}}>
                            <div style={{ fontSize: 16 }}>
                              {item?.promotion?.statusPromotion ==
                              'HOAT_DONG' ? (
                                <del>
                                  {formatCurrency(
                                    item.price + (item.price * 11) / 100,
                                  )}{' '}
                                </del>
                              ) : (
                                ' '
                              )}
                            </div>
                            {item?.promotion?.statusPromotion == 'HOAT_DONG' ? (
                              <div
                                style={{
                                  fontSize: 22,
                                  color: 'rgb(231, 9, 14)',
                                }}
                              >
                                {formatCurrency(
                                  item.price -
                                    item?.promotion?.value +
                                    ((item.price - item?.promotion?.value) *
                                      11) /
                                      100,
                                )}{' '}
                              </div>
                            ) : (
                              <div
                                style={{
                                  fontSize: 22,
                                  color: 'rgb(231, 9, 14)',
                                }}
                              >
                                {formatCurrency(
                                  item.price + (item.price * 11) / 100,
                                )}{' '}
                              </div>
                            )}
                            {/* <div style={{ fontSize: 12, color: 'rgb(231, 9, 14)' }}>Ngày bạn chọn đã có 10 lượt<br /> đặt</div> */}
                            <div style={{ fontSize: 22 }}>
                              <Button
                                style={{
                                  backgroundColor: 'rgb(231, 9, 14)',
                                  color: 'white',
                                }}
                                onClick={() => handleDetailHomestay(item.id)}
                              >
                                Chọn homestay
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })
                ) : (
                  <p>Nơi bạn tìm kiếm không có homestay nào</p>
                )}

                <div style={{ float: 'right', marginTop: 20 }}>
                  <Pagination
                    current={current}
                    onChange={onChangePage}
                    total={products.totalPages * 10}
                  />
                </div>
              </div>
            </section>
          </Content>
        </Layout>
      </section>
    </>
  )
}
export default Hotel
