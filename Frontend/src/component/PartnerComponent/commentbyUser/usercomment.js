import {
  Avatar,
  Image,
  Modal,
  Pagination,
  Rate,
  Space,
  Table,
  Typography,
} from 'antd'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchHomestay } from '../../../features/owner_homestay/homestayThunk'
import { fetchComment } from '../../../features/owner_homestay/getbooking/commentThunk'
import {
  EditOutlined,
  EyeOutlined,
  RotateLeftOutlined,
  RotateRightOutlined,
  SwapOutlined,
  UserOutlined,
  ZoomInOutlined,
  ZoomOutOutlined,
} from '@ant-design/icons'
import {
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBRow,
  MDBSwitch,
  MDBTypography,
} from 'mdb-react-ui-kit'
import moment from 'moment'

const { Title } = Typography
const UserCommment = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [current, setCurrent] = useState(1)
  const [idHomestay, setIdHomestay] = useState('')
  const [totalPage, setTotalPage] = useState(0)
  const onChangePage = (page) => {
    setCurrent(page)
    dispatch(fetchComment(idHomestay, page - 1))
  }
  const showModal = (record) => {
    dispatch(fetchComment(record.id, current - 1))
    setIsModalOpen(true)
    setIdHomestay(record.id)
    setTotalPage(record.comment.length)
  }
  const formatCurrency = (value) => {
    // Sử dụng Intl.NumberFormat để định dạng giá trị tiền tệ
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(value)
  }
  const handleOk = () => {
    setIsModalOpen(false)
  }
  const handleCancel = () => {
    setIsModalOpen(false)
  }
  const dataComment = useSelector((state) => state.booking.comments)
  const products = useSelector((state) => state.ownerHomestay.homestays)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchHomestay(''))
  }, [])

  const columns = [
    {
      title: 'Tên homestay',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Địa chỉ homestay',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Giá homestay',
      dataIndex: 'price',
      key: 'price',
      align: 'center',
      render(str) {
        return formatCurrency(str)
      },
    },
    {
      title: 'Số đánh giá của homestay',
      dataIndex: 'comment',
      key: 'comment',
      align: 'center',
      render(str) {
        return 'Có ' + str.length + ' đánh giá'
      },
    },
    {
      title: 'Xem đánh giá',
      key: 'action',
      align: 'center',
      render: (_, record) => (
        <a onClick={() => showModal(record)}>
          <EyeOutlined />
        </a>
      ),
    },
  ]
  return (
    <div style={{ marginTop: '20px' }}>
      <Title level={2}>Nhận xét,điểm đánh giá của khách hàng</Title>
      <Table dataSource={products} columns={columns} />;
      <Modal
        title='Đánh giá của khách hàng'
        width={900}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[]}
      >
        <section style={{ backgroundColor: '#f7f6f6' }}>
          <MDBContainer
            className='py-5 text-dark'
            style={{ maxWidth: '1000px' }}
          >
            <MDBRow className='justify-content-center'>
              <MDBCol md='12' lg='10' xl='8'>
                <div className='d-flex justify-content-between align-items-center mb-4'>
                  <MDBTypography tag='h4' className='text-dark mb-0'>
                    Có tất cả ({totalPage}) đánh giá
                  </MDBTypography>
                </div>
                {dataComment.map((items) => (
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
                    total={totalPage}
                  />
                </div>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </section>
      </Modal>
    </div>
  )
}
export default UserCommment
