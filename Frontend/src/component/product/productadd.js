import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addProductAsync } from '../../features/product/createproductThunks'
import {
  getAllHomestay,
  getAllHomestayByHomestayName,
  getAllHomestayByNameOwner,
  getAllHomestayByStatus,
  getCountHomestaySuccess,
  getCountHomestayWait,
} from '../../features/product/productThunk'
import { fetchCategory } from '../../features/category/categoryThunk'
import { useState } from 'react'
import {
  Space,
  Table,
  Typography,
  Modal,
  Spin,
  Popconfirm,
  Form,
  Input,
  Row,
  Col,
  Select,
  Button,
  Pagination,
  Image,
  message,
} from 'antd'
import {
  EyeOutlined,
  ReloadOutlined,
  RotateLeftOutlined,
  RotateRightOutlined,
  SwapOutlined,
  ZoomInOutlined,
  ZoomOutOutlined,
} from '@ant-design/icons'
import moment from 'moment'
import {
  aproveHomestay,
  disAgreeHomestay,
} from '../../features/admin/adminThunk'
import TextArea from 'antd/es/input/TextArea'

const { Title } = Typography

function AddProductForm() {
  const [viewImage, setViewImage] = useState([])
  const dispatch = useDispatch()
  const products = useSelector((state) => state.product.products)
  const countSuccess = useSelector((state) => state.product.homestayHD)
  const countWait = useSelector((state) => state.product.homestayCD)
  const [confirmModal, setConfirmModal] = useState(false)
  const [deniedModal, setDeniedModal] = useState(false)
  const [refuse, setRefuse] = useState('')
  const [loadingConfirm, setLoadingConfirm] = useState(false)
  const [selectedStatus, setSelectedStatus] = useState({
    name: 'Chờ duyệt',
    value: 1,
  })
  const [homestayName, setHomestayName] = useState('')
  const [ownerName, setOwnerName] = useState(' ')
  //

  const listFilter = [
    {
      name: 'Tất cả',
      value: '',
    },
    {
      name: 'Chờ duyệt',
      value: 1,
    },
    {
      name: 'Đã duyệt',
      value: 0,
    },
    {
      name: 'Từ chối',
      value: 3,
    },
    {
      name: 'Không hoạt động',
      value: 2,
    },
  ]

  const { Search } = Input
  const [isViewModal, setIsViewModal] = useState(false)
  const [viewHomestay, setViewHomestay] = useState({})
  const idAdmin = useSelector((state) => state.user.adminData?.data.id)

  const handleChangeStatus = (value) => {
    if (value === 1) {
      setSelectedStatus({
        name: 'Chờ duyệt',
        value: 1,
      })
      dispatch(getAllHomestayByStatus(1))
    } else if (value === 0) {
      setSelectedStatus({
        name: 'Đã duyệt',
        value: 0,
      })
      dispatch(getAllHomestayByStatus(0))
    } else if (value === 2) {
      setSelectedStatus({
        name: 'Không hoạt động',
        value: 2,
      })
      dispatch(getAllHomestayByStatus(2))
    } else if (value === 3) {
      setSelectedStatus({
        name: 'Từ chối',
        value: 3,
      })
      dispatch(getAllHomestayByStatus(3))
    } else {
      dispatch(getAllHomestay())
      setSelectedStatus({
        name: 'Tất cả',
        value: '',
      })
    }
  }
  const handleCancel = () => {
    setIsViewModal(false)
  }
  const handleOk = () => {
    setConfirmModal(true)
  }
  const handleDenied = () => {
    setDeniedModal(true)
  }

  const showModal = (record) => {
    setIsViewModal(true)
    setViewHomestay(record)
    setViewImage(record.images)
    console.log(record)
  }
  const formatCurrency = (value) => {
    // Sử dụng Intl.NumberFormat để định dạng giá trị tiền tệ
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(value)
  }
  const aproveModalHomestay = async () => {
    const data = {
      homestayId: viewHomestay.id,
      adminId: idAdmin,
      desc: '',
    }
    setLoadingConfirm(true)
    setConfirmModal(false)
    await message.info(
      'Đang tiến hành cập nhật trạng thái bạn vui lòng đợi một vài giây nhé!',
      5,
    )
    await dispatch(aproveHomestay(data))
    await message.info('Duyệt thành công')
    await setLoadingConfirm(false)
    setIsViewModal(false)

    setSelectedStatus({
      name: 'Đã duyệt',
      value: 0,
    })
    dispatch(getAllHomestayByStatus(0))
  }
  const deniedHomestay = async () => {
    const data = {
      homestayId: viewHomestay.id,
      adminId: idAdmin,
      desc: refuse,
    }
    setLoadingConfirm(true)
    setDeniedModal(false)
    await message.info(
      'Đang tiến hành cập nhật trạng thái bạn vui lòng đợi một vài giây nhé!',
      5,
    )
    await dispatch(disAgreeHomestay(data))
    await message.info('Từ chối thành công')
    await setLoadingConfirm(false)
    setIsViewModal(false)

    setSelectedStatus({
      name: 'Từ chối',
      value: 3,
    })
    dispatch(getAllHomestayByStatus(2))
  }
  const cancelConfirmModal = () => {
    setConfirmModal(false)
  }
  const cancelDeniedModal = () => {
    setDeniedModal(false)
  }
  const handleChangeRefuse = (e) => {
    setRefuse(e.target.value)
    console.log(e.target.value)
  }
  const searchOwnerHomestayName = (value, _e, info) => {
    setOwnerName(value)
    dispatch(
      getAllHomestayByNameOwner(selectedStatus.value, homestayName, value),
    )
  }

  const onSearchHomestayName = (value, _e, info) => {
    setHomestayName(value)
    dispatch(
      getAllHomestayByHomestayName(selectedStatus.value, value, ownerName),
    )
  }
  const handleSubmitStatusToUpdating = async (record) => {
    const data = {
      homestayId: record.id,
      adminId: idAdmin,
      desc: 'Chuyển trạng thái homestay',
    }
    await message.info(
      'Đang tiến hành sửa trạng thái bạn vui lòng đợi một vài giây nhé!',
    )
    await dispatch(disAgreeHomestay(data))
    dispatch(getAllHomestayByStatus(2))
  }
  //
  useEffect(() => {
    dispatch(getCountHomestaySuccess())
    dispatch(getCountHomestayWait())
    dispatch(getAllHomestayByStatus(1))
  }, [])
  const columns = [
    {
      title: 'Tên homestay',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Địa chỉ cụ thể',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (data) => {
        if (data === 'HOAT_DONG') {
          return 'Hoạt động'
        }
        if (data === 'CHO_DUYET') {
          return 'Chờ duyệt'
        }
        if (data === 'KHONG_HOAT_DONG') {
          return 'Không hoạt động'
        }
        if (data === 'TU_CHOI_DUYET') {
          return 'Từ chối duyệt'
        }
      },
    },
    {
      title: 'Chủ homestay',
      dataIndex: 'ownerHomestay',
      key: 'ownerHomestay',
      render: (data) => {
        return data.name
      },
    },
    {
      title: 'Giá thuê 1 đêm',
      dataIndex: 'price',
      key: 'price',
      render(str) {
        return formatCurrency(str)
      },
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_, record) => (
        <Space size='middle'>
          <a onClick={() => showModal(record)} style={{ color: '#1677ff' }}>
            <EyeOutlined />
          </a>
          {record.status === 'HOAT_DONG' && (
            <Popconfirm
              title='Cập nhật mục này'
              description='Bạn chắc chắn muốn cập nhật homestay thành không hoạt động không?'
              icon={<ReloadOutlined />}
              cancelText='Hủy'
              okText='Cập nhật'
              onConfirm={() => handleSubmitStatusToUpdating(record)}
            >
              <a>
                <ReloadOutlined />
              </a>
            </Popconfirm>
          )}
        </Space>
      ),
    },
  ]

  return (
    <div style={{ marginTop: '30px' }}>
      <Title level={2}>Quản trị homestay</Title>
      {/* <div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div
            style={{
              width: '25%',
              height: 110,
              backgroundColor: '#321fdb',
              padding: 25,
              marginRight: 60,
              borderRadius: 8,
            }}
          >
            <Title
              style={{ marginTop: '1px', color: 'white', fontWeight: 600 }}
              level={3}
            >
            </Title>
            <Title
              style={{ marginTop: '1px', color: 'white', fontWeight: 600, textAlign: 'center', fontSize: '24px' }}
              level={5}
            >
              {' '}
              Homestay chờ duyệt{' : '}
              {countWait}
            </Title>
          </div>
          <div
            style={{
              width: '25%',
              height: 110,
              backgroundColor: '#e55353',
              padding: 25,
              borderRadius: 8,
            }}
          >
            <Title
              style={{ marginTop: '1px', color: 'white', fontWeight: 600 }}
              level={3}
            >
            </Title>
            <Title
              style={{ marginTop: '1px', color: 'white', fontWeight: 600, textAlign: 'center', fontSize: '24px' }}
              level={5}
            >
              Homestay đã duyệt {' : '} 
              {countSuccess}
            </Title>
          </div>
        </div>
      </div> */}
      <Title level={4}>
        Danh mục (Có {countWait} chờ duyệt, {countSuccess} đã duyệt)
      </Title>
      <Row>
        <Form.Item label='Trạng thái' style={{ float: 'left' }}>
          <Select
            style={{ width: 143 }}
            onChange={handleChangeStatus}
            options={listFilter.map((filter) => ({
              value: filter.value,
              label: filter.name,
            }))}
            value={selectedStatus}
          />
        </Form.Item>
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
      {/* {loading ? <Spin className="example" size="large" /> : null}
      {error ? <p>Error: {error}</p> : null} */}
      <Table columns={columns} dataSource={products} />
      {/* popup form */}

      <Modal
        title={
          <div style={{ fontSize: '22px' }}>Xem thông tin chi tiết homstay</div>
        }
        open={isViewModal}
        onCancel={handleCancel}
        footer={[
          <Button key='back' onClick={handleCancel} disabled={loadingConfirm}>
            Cancel
          </Button>,
          <Button
            key='submit'
            style={{ backgroundColor: 'red', color: 'white' }}
            disabled={viewHomestay.status !== 'KHONG_HOAT_DONG' ? false : true}
            onClick={handleDenied}
            loading={loadingConfirm}
          >
            Từ chối duyệt
          </Button>,
          <Button
            type='primary'
            onClick={handleOk}
            disabled={loadingConfirm}
            loading={loadingConfirm}
            disabled={viewHomestay.status !== 'KHONG_HOAT_DONG' ? false : true}
          >
            Đồng ý duyệt
          </Button>,
        ]}
        width={1100}
        style={{ fontSize: '40px' }}
      >
        <div style={{ fontSize: 18, fontWeight: 600 }}>
          <table>
            <tr>
              <td style={{ width: 600 }}>
                <div style={{ display: 'flex' }}>
                  <div style={{ width: 200 }}>Tên homestay </div> :{' '}
                  {viewHomestay.name}
                </div>
                <br />
              </td>
              <td style={{ width: 600 }}>
                <div style={{ display: 'flex' }}>
                  <div style={{ width: 200 }}>Tên chủ homestay </div> :{' '}
                  {viewHomestay?.ownerHomestay?.name}
                </div>
                <br />
              </td>
            </tr>
            <tr>
              <td style={{ width: 600 }}>
                <div style={{ display: 'flex' }}>
                  <div style={{ width: 200 }}>Giá </div> :{' '}
                  {formatCurrency(viewHomestay.price)}
                </div>
                <br />
              </td>
              <td style={{ width: 500 }}>
                <div style={{ display: 'flex' }}>
                  <div style={{ width: 200 }}>Số lượng người </div> :{' '}
                  {viewHomestay.numberPerson} (Người)
                </div>
                <br />
              </td>
            </tr>
            <tr>
              <td style={{ width: 600 }}>
                <div style={{ display: 'flex' }}>
                  <div style={{ width: 200 }}>Số phòng</div> :{' '}
                  {viewHomestay.roomNumber}
                </div>
                <br />
              </td>
              <td style={{ width: 500 }}>
                <div style={{ display: 'flex' }}>
                  <div style={{ width: 200 }}>Số điện thoại </div> :{' '}
                  {viewHomestay?.ownerHomestay?.phoneNumber}
                </div>
                <br />
              </td>
            </tr>
            <tr>
              <td style={{ width: 600 }}>
                <div style={{ display: 'flex' }}>
                  <div style={{ width: 200 }}>Thời gian nhận phòng </div> :{' '}
                  {viewHomestay.timeCheckIn}
                </div>
                <br />
              </td>
              <td style={{ width: 500 }}>
                <div style={{ display: 'flex' }}>
                  <div style={{ width: 200 }}>Thời gian trả phòng </div> :{' '}
                  {viewHomestay.timeCheckOut}
                </div>
                <br />
              </td>
            </tr>
            <tr>
              <td style={{ width: 600 }}>
                <div style={{ display: 'flex' }}>
                  <div style={{ width: 200 }}>Ngày bắt đầu</div> :{' '}
                  {moment(viewHomestay.createdDate).locale('vi').format('LL')}
                </div>
                <br />
              </td>
              <td style={{ width: 500 }}>
                <div style={{ display: 'flex' }}>
                  <div style={{ width: 200 }}>Ngày kết thúc</div> :{' '}
                  {moment(viewHomestay.endDate).locale('vi').format('LL')}
                </div>
                <br />
              </td>
            </tr>
            <tr>
              <td style={{ width: 600 }}>
                <div style={{ display: 'flex' }}>
                  <div style={{ width: 200 }}>Diện tích </div> :{' '}
                  {viewHomestay.acreage} (m2)
                </div>
                <br />
              </td>
              <td style={{ width: 500 }}>
                <div style={{ display: 'flex' }}>
                  <div style={{ width: 200 }}>Mô tả </div> : {viewHomestay.desc}
                </div>
                <br />
              </td>
            </tr>
            <tr>
              <td style={{ width: 600 }}>
                <div style={{ display: 'flex' }}>
                  <div style={{ width: 200 }}>Email </div> :{' '}
                  {viewHomestay?.ownerHomestay?.email}
                </div>
                <br />
              </td>
            </tr>
          </table>
          <div style={{ display: 'flex' }}>
            <div style={{ width: 200 }}>Địa chỉ </div> : {viewHomestay.address}
          </div>
          <br />

          <div style={{ display: 'flex' }}>
            <div style={{ width: 200 }}>Mô tả </div> : {viewHomestay.desc}
          </div>
          <br />
          <div style={{ display: 'flex' }}>
            <div style={{ width: 200 }}>Tiện nghi </div>:
            {viewHomestay?.detailHomestays?.map((items, index) => (
              <React.Fragment key={index}>
                <p>&nbsp;{items.convenientHomestay?.name}</p>
                {index !== viewHomestay?.detailHomestays.length - 1 && (
                  <span>, </span>
                )}
              </React.Fragment>
            ))}
          </div>
          <br />
          <div>
            Ảnh homstay :<br />
            <div
              style={{
                width: 1030,
                padding: 20,
                flexWrap: 'wrap',
                borderRadius: 10,
                display: 'flex',
                justifyContent: 'center',
                border: '1px solid black',
              }}
            >
              {viewImage.map((img, index) => (
                <Image
                  key={index}
                  src={img.imgUrl}
                  alt={`Homestay Image ${index}`}
                  style={{
                    maxWidth: '200px', // Đảm bảo ảnh không vượt quá chiều rộng của phần tử cha
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
            </div>
          </div>
        </div>
      </Modal>
      <Modal
        title='Xác nhận'
        open={confirmModal}
        onOk={aproveModalHomestay}
        onCancel={cancelConfirmModal}
        okText='Đồng ý'
        cancelText='Từ chối'
      >
        <p>Bạn đồng ý duyệt homestay này</p>
      </Modal>
      <Modal
        title='Từ chối'
        open={deniedModal}
        onOk={deniedHomestay}
        onCancel={cancelDeniedModal}
        okText='Đồng ý'
        cancelText='Từ chối'
      >
        <Form.Item
          label='Lý do từ chối'
          name='name'
          rules={[
            {
              required: true,
              message: 'Vui lòng điền lý do từ chối',
            },
          ]}
        >
          <TextArea
            style={{ height: '50px' }}
            value={refuse}
            onChange={(e) => handleChangeRefuse(e)}
          />
        </Form.Item>
      </Modal>
    </div>
  )
}
export default AddProductForm
