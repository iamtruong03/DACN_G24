import {
  Avatar,
  Button,
  Form,
  Image,
  Input,
  Modal,
  Pagination,
  Rate,
  Row,
  Space,
  Table,
  Typography,
  message,
} from 'antd'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  DeleteOutlined,
  DeleteTwoTone,
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
import {
  getAllHomestayByHomestayName,
  getAllHomestayByNameOwner,
  getAllHomestayByStatus,
} from '../../../features/product/productThunk'
import moment from 'moment'
import { deleteCommentHomestay } from '../../../features/admin/adminThunk'
import {
  getCommentByHomestay,
  getCommentByUser,
} from '../../../features/admin/user/userThunk'

const { Title } = Typography
const { Search } = Input

const Comment = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState(false)
  const [deleteId, setDeleteId] = useState('')
  const [homestayId, setHomestayId] = useState('')
  const [homestayName, setHomestayName] = useState('')
  const [ownerName, setOwnerName] = useState('')
  const [current, setCurrent] = useState(1)
  const [username, setUsername] = useState('')
  const onChangePage = (page) => {
    setCurrent(page)
    dispatch(getCommentByUser(homestayId, username, page - 1))
  }
  const showModal = (record) => {
    dispatch(getCommentByUser(record.id, username, current - 1))
    setHomestayId(record.id)
    setIsModalOpen(true)
  }
  const handleOk = () => {
    setIsModalOpen(false)
  }
  const handleCancel = () => {
    setIsModalOpen(false)
  }
  const searchOwnerHomestayName = (value, _e, info) => {
    setOwnerName(value)
    dispatch(getAllHomestayByNameOwner(0, value, homestayName))
  }
  const deleteComment = (id) => {
    dispatch(deleteCommentHomestay(id))
    setDeleteConfirm(false)
    setIsModalOpen(false)
    message.info('Xóa thành công', 2)
  }
  const openConfirmDelete = (id) => {
    setDeleteConfirm(true)
    setDeleteId(id)
  }

  const onSearchHomestayName = (value, _e, info) => {
    setHomestayName(value)
    dispatch(getAllHomestayByHomestayName(0, value, ownerName))
  }
  const products = useSelector((state) => state.product.products)
  const comment = useSelector((state) => state.userAdmin.comment)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAllHomestayByStatus(0))
    dispatch(getCommentByUser(homestayId, username, current - 1))
  }, [])

  const getCommentByUsername = (username) => {
    dispatch(getCommentByUser(homestayId, username, current - 1))
    setUsername(username)
  }

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
      title: 'Chủ homestay',
      dataIndex: 'ownerHomestay',
      key: 'ownerHomestay',
      render: (data) => {
        return data?.name
      },
    },
    {
      title: 'Giá homestay',
      dataIndex: 'price',
      key: 'price',
      align: 'center',
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
      <Row>
        <Form.Item
          label='Tìm kiếm theo tên'
          style={{ float: 'left', marginLeft: ' 50px' }}
        >
          <Search
            placeholder='Tên homestay'
            allowClear
            size='medium'
            enterButton='search'
            onSearch={onSearchHomestayName}
          />
        </Form.Item>
        <Form.Item
          label='Tìm kiếm theo tên chủ homestay'
          style={{ float: 'left', marginLeft: ' 20px' }}
        >
          <Search
            placeholder='Tên chủ homestay'
            allowClear
            size='medium'
            enterButton='search'
            onSearch={searchOwnerHomestayName}
          />
        </Form.Item>
      </Row>
      <Table dataSource={products} columns={columns} />;
      <Modal
        title='Đánh giá của khách hàng'
        width={900}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <section style={{ backgroundColor: '#f7f6f6' }}>
          <MDBContainer
            className='py-5 text-dark'
            style={{ maxWidth: '1000px' }}
          >
            <Row>
              <Form.Item
                label='Tìm kiếm theo tên'
                style={{ float: 'left', marginLeft: ' 50px' }}
              >
                <Search
                  placeholder='Tên user'
                  allowClear
                  size='medium'
                  enterButton='search'
                  onSearch={getCommentByUsername}
                />
              </Form.Item>
            </Row>
            <MDBRow className='justify-content-center'>
              <MDBCol md='12' lg='10' xl='8'>
                {/* <div className='d-flex justify-content-between align-items-center mb-4'>
                  <MDBTypography tag='h4' className='text-dark mb-0'>
                    Có tất cả ({comment?.data?.length}) đánh giá
                  </MDBTypography>
                </div> */}
                {comment?.data?.map((items) => (
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
                              <span className='text-dark '>
                                {items.comment}
                              </span>
                            </MDBTypography>
                            <p className='mb-0'>
                              {moment(items.createdDate).fromNow()}
                            </p>
                            <Button
                              className='mb-0'
                              style={{ border: 'none' }}
                              onClick={() => openConfirmDelete(items.id)}
                            >
                              <DeleteOutlined />
                            </Button>
                          </div>
                        </div>
                      </div>
                      {items.images.map((imageurl, index) => (
                        <Image
                          key={index}
                          src={imageurl.imgUrl}
                          alt={`Homestay Image ${index}`}
                          style={{
                            maxWidth: '100px', // Đảm bảo ảnh không vượt quá chiều rộng của phần tử cha
                            margin: '0 10px 10px 0', // Thêm khoảng cách giữa các ảnh
                            marginLeft: 45,
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
                                <RotateRightOutlined onClick={onRotateRight} />
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
                    </MDBCardBody>
                  </MDBCard>
                ))}
                <div style={{ float: 'right', marginTop: 20 }}>
                  <Pagination
                    current={current}
                    onChange={onChangePage}
                    total={comment?.totalPages * 10}
                  />
                </div>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </section>
      </Modal>
      <Modal
        title='Xóa comment'
        open={deleteConfirm}
        okText='Xóa'
        cancelText='Hủy'
        onCancel={() => setDeleteConfirm(false)}
        onOk={() => deleteComment(deleteId)}
      >
        Bạn có chắc chắn muốn xóa comment này !
      </Modal>
    </div>
  )
}
export default Comment
