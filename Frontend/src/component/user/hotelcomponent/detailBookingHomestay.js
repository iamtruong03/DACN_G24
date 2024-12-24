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
  Avatar,
  Pagination,
  Modal,
  Carousel,
  message,
} from 'antd'
import {
  ClockCircleTwoTone,
  EnvironmentOutlined,
  FileTextTwoTone,
  RotateLeftOutlined,
  RotateRightOutlined,
  StarTwoTone,
  SwapOutlined,
  ZoomInOutlined,
  ZoomOutOutlined,
} from '@ant-design/icons'
import { Table } from 'react-bootstrap'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchProducts,
  getAvgPoint,
  getCommentProduct,
  getOneProduct,
} from '../../../features/product/productThunk'
import moment from 'moment'
import {
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBTypography,
} from 'mdb-react-ui-kit'
import {
  addShoppingCartThunk,
  fetchShoppingCart,
} from '../../../features/user/shoppingCartThunk'

const { Header, Content, Footer } = Layout

export const DetailHomestayBooking = () => {
  const [current, setCurrent] = useState(1)
  const userDetail = JSON.parse(localStorage.getItem('userDetail'))
  const onChangePage = (page) => {
    setCurrent(page)
    dispatch(getCommentProduct(params.id, page - 1))
  }
  const params = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  useEffect(() => {
    dispatch(getAvgPoint(params.id))
    dispatch(getCommentProduct(params.id, current - 1))
    dispatch(getOneProduct(params.id))
  }, [])
  const formatCurrency = (value) => {
    // Sử dụng Intl.NumberFormat để định dạng giá trị tiền tệ
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(value)
  }
  const location = useLocation()
  const detailHomestay = useSelector((state) => state.product.productDetails)
  const comment = useSelector((state) => state.product.commentProduct)
  const avgPoint = useSelector((state) => state.product.avgPoint)

  const maxCommentsToShow = 6
  const slicedComments = comment.slice(0, maxCommentsToShow)

  const listComment = slicedComments.map((comment, index) => {
    if (index === 2) {
      return false
    }
    if (comment?.point >= 4) {
      return (
        <Col key={index} span={6} style={{ marginRight: '70px' }}>
          <div
            style={{
              minHeight: '80px',
              width: '270px',
              marginLeft: '15px',
              marginBottom: '15px',
              paddingLeft: '5px',
              fontSize: '12px',
              fontWeight: '500',
              boxShadow: '0px 2px 5px rgba(3,18,26,0.15)',
              borderRadius: '5px',
            }}
          >
            <div style={{ marginBottom: '5px', paddingTop: '5px' }}>
              {comment?.user.name}
            </div>
            <div style={{ width: '250px', wordWrap: 'break-word' }}>
              {comment?.comment}
            </div>
          </div>
        </Col>
      )
    }
  })
  const calculatePercentage = (point, totalPoints) => {
    return (point / totalPoints) * 100
  }

  const renderProgressBars = () => {
    if (!comment || comment.length === 0) {
      return null
    }

    // Initialize counts for each point
    const pointCounts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
    let totalPoints = 0

    // Count points and calculate total points
    comment.forEach((item) => {
      const point = item.point
      if (point >= 1 && point <= 5) {
        pointCounts[point]++
        totalPoints++
      }
    })

    return Object.keys(pointCounts).map((point) => (
      <Progress
        key={point}
        percent={calculatePercentage(pointCounts[point], totalPoints)}
        size='default'
      />
    ))
  }
  /**
   * nếu ảnh nhiều hơn 7
   */
  const [modalVisible, setModalVisible] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const openModal = (index) => {
    setCurrentImageIndex(index)
    setModalVisible(true)
  }
  const closeModal = () => {
    setModalVisible(false)
  }
  /**
   * shopping cart
   */

  return (
    <>
      <div
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
          <Breadcrumb.Item>Detail</Breadcrumb.Item>
          <Breadcrumb.Item>{detailHomestay?.name}</Breadcrumb.Item>
        </Breadcrumb>
        <div
          style={{
            padding: 24,
            minHeight: 380,
          }}
        >
          <Row>
            <Col>
              <h4>{detailHomestay?.name}</h4>
              <span>{detailHomestay?.name}</span>
            </Col>
          </Row>
          <Row style={{ marginTop: '10px' }}>
            <Col span={8}>
              <EnvironmentOutlined
                style={{ fontSize: '10px', alignItems: 'center' }}
              />
              <span style={{ fontSize: '12px', marginTop: '3px' }}>
                {detailHomestay.address}
              </span>
              <div
                style={{
                  fontSize: '18px',
                  alignItems: 'center',
                  marginTop: '10px',
                }}
              >
                Tổng số phòng của homestay: {detailHomestay?.numberPerson}
              </div>
            </Col>
            <Col span={6} push={10}>
              <div>
                <div style={{ fontSize: '12px', marginBottom: '0' }}>
                  Giá mỗi phòng mỗi đêm từ
                </div>
                {detailHomestay?.promotion?.value ? (
                  <div
                    style={{
                      fontSize: '24',
                      color: 'rgb(255, 94, 31)',
                      lineHeight: '28px',
                      fontWeight: '700',
                      marginTop: '-5px',
                    }}
                  >
                    {formatCurrency(
                      detailHomestay.price -
                      detailHomestay?.promotion?.value +
                      ((detailHomestay.price -
                        detailHomestay?.promotion?.value) *
                        11) /
                      100,
                    )}
                    <span style={{ fontSize: '22' }}> </span>{' '}
                  </div>
                ) : (
                  <div
                    style={{
                      fontSize: '24',
                      color: 'rgb(255, 94, 31)',
                      lineHeight: '28px',
                      fontWeight: '700',
                      marginTop: '-5px',
                    }}
                  >
                    {formatCurrency(
                      detailHomestay.price + (detailHomestay.price * 11) / 100,
                    )}
                    <span style={{ fontSize: '22' }}></span>{' '}
                  </div>
                )}
              </div>
            </Col>
          </Row>
          <Row style={{ marginTop: '15px' }}>
            <Col span={14}>
              <Image
                style={{ borderRadius: '10px' }}
                width={730}
                height={400}
                src={detailHomestay?.images?.[0]?.imgUrl}
              />
            </Col>
            <Col span={4} style={{ marginLeft: '12px' }}>
              <Image
                style={{ borderRadius: '10px', marginBottom: '10px' }}
                width={250}
                height={128}
                src={detailHomestay?.images?.[1]?.imgUrl}
              />
              <Image
                style={{ borderRadius: '10px', marginTop: '7px' }}
                width={250}
                height={128}
                src={detailHomestay?.images?.[2]?.imgUrl}
              />
              <Image
                style={{ borderRadius: '10px', marginTop: '15px' }}
                width={250}
                height={128}
                src={detailHomestay?.images?.[3]?.imgUrl}
              />
            </Col>
            <Col span={4} push={1}>
              <Image
                style={{ borderRadius: '10px', marginBottom: '10px' }}
                width={250}
                height={128}
                src={detailHomestay?.images?.[4]?.imgUrl}
              />
              {detailHomestay?.images?.[5]?.imgUrl && (
                <Image
                  style={{ borderRadius: '10px', marginTop: '7px' }}
                  width={250}
                  height={128}
                  src={detailHomestay?.images?.[5]?.imgUrl}
                />
              )}

              {detailHomestay?.images?.[6]?.imgUrl && (
                <div
                  style={{
                    borderRadius: '10px',
                    marginTop: '15px',
                    filter: 'brightness(50%)', // Tùy chỉnh giá trị để làm tối hoặc sáng ảnh
                    position: 'relative',
                    cursor: 'pointer',
                  }}
                >
                  <img
                    style={{ borderRadius: 8 }}
                    width={250}
                    height={128}
                    src={detailHomestay?.images?.[6]?.imgUrl}
                    onClick={() => openModal(6)}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      color: 'white',
                      fontSize: '18px',
                      cursor: 'pointer',
                    }}
                    onClick={() => openModal(6)}
                  >
                    Xem tất cả
                  </div>
                </div>
              )}
            </Col>
            <Modal visible={modalVisible} onCancel={closeModal} footer={null}>
              <Carousel initialSlide={currentImageIndex} dots={true}>
                {detailHomestay?.images?.map((image, index) => (
                  <div key={index}>
                    <Image
                      style={{
                        marginBottom: '10px',
                        filter: index === 6 ? 'brightness(50%)' : 'none',
                      }}
                      width={'100%'}
                      height={300}
                      src={image.imgUrl}
                    />
                  </div>
                ))}
              </Carousel>
            </Modal>
          </Row>
          <Row style={{ marginTop: '10px' }}>
            <Col
              span={5}
              style={{
                backgroundColor: 'white',
                borderRadius: '5px',
                height: '150px',
              }}
            >
              <div style={{ margin: '10px 0px' }}>
                <h4
                  style={{
                    marginLeft: '15px',
                    marginTop: '10px',
                    fontSize: '16px',
                  }}
                >
                  Tiện nghi chính
                </h4>
                <div
                  style={{
                    marginLeft: '15px',
                    fontSize: '12px',
                    fontWeight: '500',
                  }}
                >
                  {detailHomestay?.detailHomestays?.map((items, index) => (
                    <div>{index <=4 ?items?.convenientHomestay?.name : ''}</div>
                  ))}
                </div>
              </div>
            </Col>
            <Col
              span={18}
              push={1}
              style={{
                backgroundColor: 'white',
                borderRadius: '5px',
                height: '150px',
              }}
            >
              <div style={{ margin: '10px 0px' }}>
                <h4 style={{ margin: '10px 0px 15px 15px', fontSize: '16px' }}>
                  Cảm nghĩ của du khách
                </h4>
                <Row>{listComment}</Row>
              </div>
            </Col>
          </Row>
        </div>
      </div>

      <div
        style={{
          padding: '0 100px',
          color: 'black',
        }}
      >
        <div
          style={{
            paddingLeft: 24,
            paddingRight: 24,
            minHeight: 10,
          }}
        >
          <Row
            style={{
              backgroundColor: 'white',
              borderRadius: '5px',
              minHeight: '10px',
            }}
          >
            <Col
              span={6}
              style={{
                backgroundImage:
                  'linear-gradient(92deg, rgba(81, 149, 227, 0.5) -60%, #D6F1FF 40%, rgba(214, 241, 255, 0.7) 100%)',
              }}
            >
              <h5 style={{ marginTop: '10px', textAlign: 'center' }}>
                Chính sách và thông tin chung
              </h5>
            </Col>
            <Col span={18}>
              <div style={{ marginLeft: '10px', marginTop: '10px' }}>
                <div style={{ lineHeight: '12px', marginTop: '3px' }}>
                  <ClockCircleTwoTone style={{ fontSize: '12px' }} />{' '}
                  <b>Thời gian nhận/trả Homestay</b>
                </div>
                <span style={{ lineHeight: '12px', marginLeft: '17px' }}>
                  Giờ nhận phòng: <b>Từ {detailHomestay.timeCheckIn}</b>
                </span>
                <span style={{ lineHeight: '12px', marginLeft: '17px' }}>
                  Giờ trả phòng: <b>Trước {detailHomestay.timeCheckOut}</b>
                </span>
              </div>
              <hr style={{ width: '96%', marginLeft: '2%' }} />
              <div style={{ marginLeft: '10px', marginTop: '10px' }}>
                <div style={{ lineHeight: '12px', marginTop: '3px' }}>
                  <ClockCircleTwoTone style={{ fontSize: '12px' }} />
                  <b> Chính sách hủy phòng</b>
                </div>
                <span style={{ lineHeight: '12px', marginLeft: '17px' }}>
                  Việc hủy phòng sẽ phải mất một khoản tiền khi hủy phòng
                </span>
              </div>
              <hr style={{ width: '96%', marginLeft: '2%' }} />
              <div style={{ marginLeft: '10px', marginTop: '10px' }}>
                <div style={{ lineHeight: '16px', marginTop: '3px' }}>
                  <FileTextTwoTone style={{ fontSize: '12px' }} />
                  <b> Mô tả</b>
                </div>
                <div style={{ lineHeight: '16px', marginLeft: '17px' }}>
                  {detailHomestay.desc}
                </div>
              </div>
              <hr style={{ width: '96%', marginLeft: '2%' }} />
              <div style={{ margin: '10px 15px 0px 10px' }}>
                <div style={{ lineHeight: '12px', margin: '0px 0px 15px 5px' }}>
                  <b> Thông tin chung</b>
                </div>
                <Table striped hover size='sm'>
                  <tbody>
                    <tr>
                      <td>Thời gian nhận trả phòng</td>
                      <td>
                        Từ {detailHomestay?.timeCheckIn} - trước{' '}
                        {detailHomestay?.timeCheckOut}
                      </td>
                    </tr>
                    <tr>
                      <td>Diện tích</td>
                      <td>{detailHomestay?.acreage}m2</td>
                    </tr>
                    <tr>
                      <td>Số phần trăm tiền bạn nhân được khi hủy phòng</td>
                      <td>{detailHomestay.cancellationPolicy} %</td>
                    </tr>
                    <tr>
                      <td>Số người</td>
                      <td>{detailHomestay?.numberPerson}</td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </Col>
          </Row>
        </div>
      </div>

      <div
        style={{
          padding: '0 100px',
          color: 'black',
        }}
      >
        <div
          style={{
            marginLeft: 24,
            marginRight: 24,
            minHeight: 10,
            marginTop: 20,
            backgroundColor: 'white',
          }}
        >
          <h4 style={{ marginTop: '15px', marginLeft: '10px' }}>
            Thêm đánh giá từ khách hàng khác
          </h4>
          <div style={{ marginLeft: '10px' }}>
            <b>Xếp hạng & Điểm đánh giá chung</b>
          </div>
          <div style={{ marginLeft: '10px', color: 'rgba(104,113,118,1.00)' }}>
            Từ {comment.length} đánh giá của khách đã ở
          </div>
          <Row
            style={{
              backgroundColor: 'white',
              borderRadius: '5px',
              minHeight: '10px',
              marginTop: '15px',
            }}
          >
            <Col span={4} style={{ alignItems: 'center' }}>
              <Space wrap style={{ marginLeft: '40px', marginTop: '10px' }}>
                <Progress
                  type='dashboard'
                  percent={(avgPoint * 100) / 5}
                  gapDegree={30}
                />
              </Space>
            </Col>
            <Col span={14}>{renderProgressBars()}</Col>
            <Col span={5} push={1}>
              <Rate style={{ fontSize: '18px' }} defaultValue={1} disabled />{' '}
              <br />
              <Rate
                style={{ fontSize: '18px' }}
                defaultValue={2}
                disabled
              />{' '}
              <br />
              <Rate
                style={{ fontSize: '18px' }}
                defaultValue={3}
                disabled
              />{' '}
              <br />
              <Rate
                style={{ fontSize: '18px' }}
                defaultValue={4}
                disabled
              />{' '}
              <br />
              <Rate style={{ fontSize: '18px' }} defaultValue={5} disabled />
            </Col>
          </Row>
          <MDBContainer className='py-5 text-dark'>
            <MDBRow className='justify-content-center'>
              <MDBCol md='12' lg='11' xl='10'>
                <div className='d-flex justify-content-between align-items-center mb-4'>
                  <MDBTypography tag='h4' className='text-dark mb-0'>
                    Có tất cả ({detailHomestay?.comment?.length}) đánh giá
                  </MDBTypography>
                </div>
                {comment.map((items) => (
                  <MDBCard className='mb-3'>
                    <MDBCardBody>
                      <div className='d-flex flex-start'>
                        {items.user?.avatarUrl !== null ? (
                          <Avatar src={items.user?.avatarUrl} />
                        ) : (
                          <Avatar
                            style={{
                              backgroundColor: '#f56a00',
                              verticalAlign: 'middle',
                              width: 40,
                              height: 40,
                            }}
                            size='large'
                          >
                            {items.user?.name
                              ? items.user.name.charAt(0).toUpperCase()
                              : ''}
                          </Avatar>
                        )}
                        <div className='w-100' style={{ marginLeft: 10 }}>
                          <div className='d-flex justify-content-between align-items-center mb-3'>
                            <MDBTypography
                              tag='h6'
                              className='text-primary fw-bold mb-0'
                            >
                              {items.user?.name}
                              <br />
                              <Rate disabled defaultValue={items.point} />
                              <br />
                              <br />
                              <span className='text-dark '>
                                {items.comment}
                              </span>
                              <br />
                              <br />
                              {items.images.map((imageurl, index) => (
                                <Image
                                  key={index}
                                  src={imageurl.imgUrl}
                                  alt={`Homestay Image ${index}`}
                                  style={{
                                    maxWidth: '100px', // Đảm bảo ảnh không vượt quá chiều rộng của phần tử cha
                                    margin: '0 10px 10px 0', // Thêm khoảng cách giữa các ảnh
                                  }}
                                  preview={{
                                    toolbarRender: (
                                      _,
                                      {
                                        transform: { scale },
                                        actions: {
                                          onFlipY,
                                          onFlipX,
                                          onRotateLeft,
                                          onRotateRight,
                                          onZoomOut,
                                          onZoomIn,
                                        },
                                      },
                                    ) => (
                                      <Space className='toolbar-wrapper'>
                                        <SwapOutlined
                                          rotate={90}
                                          onClick={onFlipY}
                                        />
                                        <SwapOutlined onClick={onFlipX} />
                                        <RotateLeftOutlined
                                          onClick={onRotateLeft}
                                        />
                                        <RotateRightOutlined
                                          onClick={onRotateRight}
                                        />
                                        <ZoomOutOutlined
                                          disabled={scale === 1}
                                          onClick={onZoomOut}
                                        />
                                        <ZoomInOutlined
                                          disabled={scale === 50}
                                          onClick={onZoomIn}
                                        />
                                      </Space>
                                    ),
                                  }}
                                />
                              ))}
                            </MDBTypography>
                            <div style={{ marginBottom: 150 }}>
                              <p className='mb-16'>
                                {moment(items.createdDate).fromNow()}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </MDBCardBody>
                  </MDBCard>
                ))}
                <div style={{ float: 'right', marginTop: 20 }}>
                  <Pagination
                    current={current}
                    onChange={onChangePage}
                    total={detailHomestay?.comment?.length}
                  />
                </div>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </div>
      </div>

      <div
        style={{
          textAlign: 'center',
          marginBottom: 20,
        }}
      ></div>
    </>
  )
}
