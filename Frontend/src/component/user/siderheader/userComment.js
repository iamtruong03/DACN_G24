import {
  HomeOutlined,
  RotateLeftOutlined,
  RotateRightOutlined,
  SwapOutlined,
  ZoomInOutlined,
  ZoomOutOutlined,
} from '@ant-design/icons'
import { Avatar, Image, Pagination, Rate, Space, Typography } from 'antd'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCommentUser } from '../../../features/owner_homestay/getbooking/commentThunk'
import { MDBCard, MDBCardBody, MDBTypography } from 'mdb-react-ui-kit'
import moment from 'moment'

const { Title } = Typography
const formatCurrency = (value) => {
  // Sử dụng Intl.NumberFormat để định dạng giá trị tiền tệ
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(value)
}
const UserComment = () => {
  const userDetail = JSON.parse(localStorage.getItem('userDetail'))
  const userId = userDetail?.data.id
  const dispatch = useDispatch()
  const [current, setCurrent] = useState(1)
  const onChangePage = (page) => {
    setCurrent(page)
    dispatch(fetchCommentUser(userId, page - 1))
  }
  const userComment = useSelector((state) => state.booking.commentsUser)
  useEffect(() => {
    dispatch(fetchCommentUser(userId, current - 1))
  }, [])
  return (
    <section style={{ padding: '40px 300px 40px 300px' }}>
      <Title level={4}>Các đánh giá của bạn</Title>
      {userComment?.data?.length === 0 ? (
        <div style={{ textAlign: 'center', marginTop: 20 }}>
          Bạn chưa có đánh giá nào
        </div>
      ) : (
        userComment?.data?.map((items) => (
          <div
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: '#ffffff',
              borderRadius: 8,
              boxShadow: '0 0 3px 1px #ACAEB1',
              padding: '10px 10px 10px 10px',
              marginBottom: 15,
            }}
          >
            <div style={{ display: 'flex' }}>
              <HomeOutlined style={{ fontSize: 22 }} />
              <Title level={5} style={{ marginLeft: 5 }}>
                {items.homestay.name}
              </Title>
              <div
                style={{
                  marginLeft: 'auto',
                  color: 'orange',
                  fontSize: 16,
                  display: 'flex',
                }}
              >
                <Title level={5} style={{ marginLeft: 5 }}>
                  Tổng tiền {formatCurrency(items.homestay.price)}
                </Title>{' '}
                (Hoàn thành)
              </div>
            </div>
            <MDBCard className='mb-3'>
              <MDBCardBody>
                <div className='d-flex flex-start'>
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
                        <span className='text-dark '>{items.comment}</span>
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
                                  <SwapOutlined rotate={90} onClick={onFlipY} />
                                  <SwapOutlined onClick={onFlipX} />
                                  <RotateLeftOutlined onClick={onRotateLeft} />
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
          </div>
        ))
      )}
      <div style={{ float: 'right', marginTop: 20, marginBottom: 20 }}>
        {userComment?.data?.length === 0 ? (
          <div />
        ) : (
          <Pagination
            current={current}
            onChange={onChangePage}
            total={userComment?.totalPages * 10}
          />
        )}
      </div>
    </section>
  )
}
export default UserComment
