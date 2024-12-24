import { EyeOutlined, HomeOutlined, UserOutlined } from '@ant-design/icons'
import {
  Input,
  Row,
  Select,
  Table,
  Typography,
  Form,
  Space,
  Button,
  Modal,
  message,
} from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import {
  adminTranCodeBooking,
  getBooking,
  searchBooking,
  userTranCodeBooking,
} from '../../../features/admin/adminThunk'
import { useEffect, useState } from 'react'
import moment from 'moment'
import dayjs from 'dayjs'
import 'dayjs/locale/vi'
import { date } from 'yup'
import { getCountHomestaySuccess, getCountHomestayWait } from '../../../features/product/productThunk'
dayjs.locale('vi')

const { Title } = Typography
const { Search } = Input

function BookingForm() {
  const checkDate = (dateCancel, dateStart) => {
    if (dateCancel.getFullYear() <= dateStart.getFullYear()) {
      if (dateCancel.getMonth() <= dateStart.getMonth()) {
        if (dateCancel.getDate() < dateStart.getDate()) {
          return true
        }
      }
    }
    return false
  }
  const formatCurrency = (value) => {
    // Sử dụng Intl.NumberFormat để định dạng giá trị tiền tệ
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(value)
  }
  const dispatch = useDispatch()
  const columns = [
    {
      title: 'Tên người đặt',
      dataIndex: 'user',
      key: 'userName',
      render: (data) => {
        return data.name
      },
    },
    {
      title: 'Tên Homestay',
      dataIndex: 'homestay',
      key: 'homestayName',
      render: (data) => {
        return data.name
      },
    },
    {
      title: 'Ngày đặt',
      dataIndex: 'createdDate',
      key: 'createdDate',
      render: (data) => {
        return moment(data).locale('vi').format('DD/MM/YYYY');
      },
    },
    {
      title: 'Ngày checkin',
      dataIndex: 'startDate',
      key: 'startDate',
      render: (data) => {
        return moment(data).locale('vi').format('DD/MM/YYYY')
      },
    },
    {
      title: 'Ngày hủy',
      dataIndex: 'cancellationDate',
      key: 'cancellationDate',
      render: (data) => {
        if (data === null) {
          return ''
        }
        return moment(data).locale('vi').format('DD/MM/YYYY')
      },
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (data) => {
        if (data === 'HUY') {
          return 'Hủy'
        }
        if (data === 'THANH_CONG') {
          return 'Thành công'
        }
        if (data === 'DA_THUE_XONG') {
          return 'Đã thuê xong'
        }
      },
    },
    {
      title: 'Phương thức booking',
      dataIndex: 'typeBooking',
      key: 'typeBooking',
      render: (data) => {
        if (data === 'DAT_COC') {
          return 'Đặt cọc'
        }
        if (data === 'THANH_TOAN_TRUOC') {
          return 'Đã thanh toán hết'
        }
      },
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
      render: (data) => {
        return formatCurrency(data)
      },
    },
    {
      title: 'Số tiền phải chuyển cho chủ homestay',
      dataIndex: 'totalPrice',
      key: 'price',
      render: (data, record) => {
        if (record.status === 'THANH_CONG') {
          if (record.typeBooking === 'DAT_COC') {
            return formatCurrency(data - (data - (data * 100) / 111) * 2)
          }
          if (record.typeBooking === 'THANH_TOAN_TRUOC') {
            return formatCurrency((data * 100) / 111)
          }
        }
        if (record.status === 'HUY') {
          if (record.refundPrice !== 0) {
            if (record.typeBooking === 'DAT_COC') {
              return formatCurrency(
                data -
                (data - (data * 100) / 111) * 2 -
                (((data * 100) / 111) * 2 * 100) / 100,
              )
            }
            if (record.typeBooking === 'THANH_TOAN_TRUOC') {
              return formatCurrency(
                (data * 100) / 111 - (((data * 100) / 111) * 100) / 100,
              )
            }
          } else {
            if (record.typeBooking === 'DAT_COC') {
              return formatCurrency(data - (data - (data * 100) / 111) * 2)
            }
            if (record.typeBooking === 'THANH_TOAN_TRUOC') {
              return formatCurrency((data * 100) / 111)
            }
          }
        }
      },
    },
    {
      title: 'Số tiền phải chuyển cho khách hàng',
      dataIndex: 'refundPrice',
      key: 'refundPrice',
      render: (data) => {
        return formatCurrency(data)
      },
      // render: (data, record) => {
      //   if (record.status === 'HUY') {
      //     const checkOutDate = dayjs(record.createdDate).add(1, 'day')
      //     if (checkDate(new Date(record.cancellationDate), new Date(checkOutDate))) {
      //       if (record.typeBooking === 'DAT_COC') {
      //         return formatCurrency(
      //           (data * 2 * record.homestay.cancellationPolicy) / 100,
      //         )
      //       }
      //       if (record.typeBooking === 'THANH_TOAN_TRUOC') {
      //         return formatCurrency(
      //           (data * record.homestay.cancellationPolicy) / 100,
      //         )
      //       }
      //     } else {
      //       return 'Không hoàn tiền'
      //     }
      //   }
      // },
    },
    {
      title: 'Mã giao dịch với chủ homestay',
      dataIndex: 'adminTransactionCode',
      key: 'adminTransactionCode',
    },
    {
      title: 'Mã giao dịch booking hủy',
      dataIndex: 'cancelTransactionCode',
      key: 'cancelTransactionCode',
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_, record) => (
        <Space size='middle'>
          <a onClick={() => showBooking(record)}>
            <EyeOutlined />
          </a>
          {record.statusPayOwner === 'CHUA_TT_CHO_OWNER' && (
            <a onClick={() => openOwnerTranCode(record)}>
              <HomeOutlined />
            </a>
          )}
          {record.statusPayUser === 'CHUA_TT_CHO_USER' && (
            <a onClick={() => openUserTranCode(record)}>
              <UserOutlined />
            </a>
          )}

        </Space>
      ),
    },
  ]
  const listFilter = [
    {
      name: 'Tất cả',
      value: '4',
    },
    {
      name: 'Hủy',
      value: 0,
    },
    {
      name: 'Thành công',
      value: 1,
    },
    {
      name: 'Đã thuê xong',
      value: 3,
    },
  ]
  const listFilterOwner = [
    {
      name: 'Tất cả',
      value: '4',
    },
    {
      name: 'Đã thanh toán',
      value: 0,
    },
    {
      name: 'Chưa thanh toán',
      value: 1,
    },
  ]
  const listFilterUser = [
    {
      name: 'Tất cả',
      value: '4',
    },
    {
      name: 'Đã thanh toán',
      value: 0,
    },
    {
      name: 'Chưa thanh toán',
      value: 1,
    },
  ]
  const [selectedStatus, setSelectedStatus] = useState({
    name: 'Tất cả',
    value: '4',
  })
  const [selectedStatusUser, setSelectedStatusUser] = useState({
    name: 'Tất cả',
    value: '4',
  })
  const [selectedStatusOwner, setSelectedStatusOnwer] = useState({
    name: 'Tất cả',
    value: '4',
  })
  const [isViewModal, setIsViewModal] = useState(false)
  const [ownerModal, setOwnerModal] = useState(false)
  const [userModal, setUserModal] = useState(false)

  const [ownerTrancode, setOwnerTrancode] = useState(' ')
  const [userTrancode, setUserTrancode] = useState(' ')

  const [viewBooking, setViewBooking] = useState({})
  const [bookingSearch, setBookingSearch] = useState({
    status: '',
    homestayName: '',
    userName: '',
    statusPayUser: '',
    statusPayOwner: '',
  })

  const handleChangeStatus = (value) => {
    if (value === 1) {
      setSelectedStatus({
        name: 'Thành công',
        value: 1,
      })
      setBookingSearch({ ...bookingSearch, status: 1 })
      dispatch(
        searchBooking(
          1,
          bookingSearch.homestayName,
          bookingSearch.userName,
          bookingSearch.statusPayUser,
          bookingSearch.statusPayOwner,
        ),
      )
    } else if (value === 0) {
      setSelectedStatus({
        name: 'Hủy',
        value: 0,
      })
      setBookingSearch({ ...bookingSearch, status: 0 })
      dispatch(
        searchBooking(
          0,
          bookingSearch.homestayName,
          bookingSearch.userName,
          bookingSearch.statusPayUser,
          bookingSearch.statusPayOwner,
        ),
      )
    } else if (value === 3) {
      setSelectedStatus({
        name: 'Đã thuê xong',
        value: 3,
      })
      setBookingSearch({ ...bookingSearch, status: 3 })
      dispatch(
        searchBooking(
          3,
          bookingSearch.homestayName,
          bookingSearch.userName,
          bookingSearch.statusPayUser,
          bookingSearch.statusPayOwner,
        ),
      )
    } else {
      setBookingSearch({ ...bookingSearch, status: '' })
      dispatch(
        searchBooking(
          ' ',
          bookingSearch.homestayName,
          bookingSearch.userName,
          bookingSearch.statusPayUser,
          bookingSearch.statusPayOwner,
        ),
      )
      setSelectedStatus({
        name: 'Tất cả',
        value: '4',
      })
    }
  }
  const handleChangeStatusUser = (value) => {
    if (value === 0) {
      setSelectedStatusUser({
        name: 'Đã thanh toán',
        value: 0,
      })
      setBookingSearch({ ...bookingSearch, statusPayUser: 0 })
      dispatch(
        searchBooking(
          bookingSearch.status,
          bookingSearch.homestayName,
          bookingSearch.userName,
          0,
          bookingSearch.statusPayOwner,
        ),
      )
    } else if (value === 1) {
      setSelectedStatusUser({
        name: 'Chưa thanh toán',
        value: 1,
      })
      setBookingSearch({ ...bookingSearch, statusPayUser: 1 })
      dispatch(
        searchBooking(
          bookingSearch.status,
          bookingSearch.homestayName,
          bookingSearch.userName,
          1,
          bookingSearch.statusPayOwner,
        ),
      )
    } else {
      setBookingSearch({ ...bookingSearch, statusPayUser: '' })
      dispatch(
        searchBooking(
          bookingSearch.status,
          bookingSearch.homestayName,
          bookingSearch.userName,
          '',
          bookingSearch.statusPayOwner,
        ),
      )
      setSelectedStatusUser({
        name: 'Tất cả',
        value: '4',
      })
    }
  }
  const handleChangeStatusOwner = (value) => {
    if (value === 0) {
      setSelectedStatusOnwer({
        name: 'Đã thanh toán',
        value: 0,
      })
      setBookingSearch({ ...bookingSearch, statusPayOwner: 0 })
      dispatch(
        searchBooking(
          bookingSearch.status,
          bookingSearch.homestayName,
          bookingSearch.userName,
          bookingSearch.statusPayUser,
          0,
        ),
      )
    } else if (value === 1) {
      setSelectedStatusOnwer({
        name: 'Chưa thanh toán',
        value: 1,
      })
      setBookingSearch({ ...bookingSearch, statusPayOwner: 1 })
      dispatch(
        searchBooking(
          bookingSearch.status,
          bookingSearch.homestayName,
          bookingSearch.userName,
          bookingSearch.statusPayUser,
          1,
        ),
      )
    } else {
      setBookingSearch({ ...bookingSearch, statusPayOwner: '' })
      dispatch(
        searchBooking(
          bookingSearch.status,
          bookingSearch.homestayName,
          bookingSearch.userName,
          bookingSearch.statusPayUser,
          '',
        ),
      )
      setSelectedStatusOnwer({
        name: 'Tất cả',
        value: '4',
      })
    }
  }
  const searchByNameHomestay = (value, _e, info) => {
    setBookingSearch({ ...bookingSearch, homestayName: value })
    dispatch(
      searchBooking(
        bookingSearch.status,
        value,
        bookingSearch.userName,
        bookingSearch.statusPayUser,
        bookingSearch.statusPayOwner,
      ),
    )
  }
  const searchByNameBooking = (value, _e, info) => {
    setBookingSearch({ ...bookingSearch, userName: value })
    dispatch(
      searchBooking(
        bookingSearch.status,
        bookingSearch.homestayName,
        value,
        bookingSearch.statusPayUser,
        bookingSearch.statusPayOwner,
      ),
    )
  }
  const showBooking = (booking) => {
    setIsViewModal(true)
    setViewBooking(booking)
  }
  const openOwnerTranCode = (booking) => {
    setOwnerModal(true)
    setViewBooking(booking)
  }
  const openUserTranCode = (booking) => {
    setUserModal(true)
    setViewBooking(booking)
  }
  const handleOwnerTranCode = () => {
    if (ownerTrancode.trim().length === 0) {
      message.info('Mã không được trống', 1)
      return false
    }
    dispatch(adminTranCodeBooking(viewBooking.id, ownerTrancode))
    setOwnerModal(false)
    message.info('Thành công', 2)
  }
  const handleUserTranCode = () => {
    if (userTrancode.trim().length === 0) {
      message.info('Mã không được trống', 1)
      return false
    }
    dispatch(userTranCodeBooking(viewBooking.id, userTrancode))
    setUserModal(false)
    message.info('Thành công', 2)
  }
  useEffect(() => {
    dispatch(getBooking(' '))
  }, [])
  const booking = useSelector((state) => state.admin.booking)
  return (
    <div style={{ marginTop: '30px' }}>
      <Title level={2}>Quản trị booking</Title>
      <Title level={4}>Danh mục</Title>
      <Row>
        <Form.Item label='Trạng thái' style={{ float: 'left' }}>
          <Select
            style={{ width: 143 }}
            options={listFilter.map((filter) => ({
              value: filter.value,
              label: filter.name,
            }))}
            defaultValue={selectedStatus.value}
            onChange={handleChangeStatus}
          />
        </Form.Item>
        <Form.Item
          label='Thanh toán cho chủ'
          style={{ float: 'left', marginLeft: ' 50px' }}
        >
          <Select
            style={{ width: 143 }}
            options={listFilterOwner.map((filter) => ({
              value: filter.value,
              label: filter.name,
            }))}
            defaultValue={selectedStatusOwner.value}
            onChange={handleChangeStatusOwner}
          />
        </Form.Item>
        <Form.Item
          label='Hoàn tiền'
          style={{ float: 'left', marginLeft: ' 50px' }}
        >
          <Select
            style={{ width: 143 }}
            options={listFilterUser.map((filter) => ({
              value: filter.value,
              label: filter.name,
            }))}
            defaultValue={selectedStatusUser.value}
            onChange={handleChangeStatusUser}
          />
        </Form.Item>
        <Form.Item label='Tìm kiếm theo tên' style={{ float: 'left' }}>
          <Search
            placeholder='Tên homestay'
            allowClear
            size='medium'
            enterButton='search'
            onSearch={searchByNameHomestay}
          />
        </Form.Item>
        <Form.Item
          label='Tìm kiếm theo tên người liên lạc'
          style={{ float: 'left', marginLeft: ' 20px' }}
        >
          <Search
            placeholder='Tên người liên lạc'
            allowClear
            size='medium'
            enterButton='search'
            onSearch={searchByNameBooking}
          />
        </Form.Item>
      </Row>
      <Table columns={columns} dataSource={booking} />

      <Modal
        title={
          <div style={{ fontSize: '22px' }}>Xem thông tin chi tiết booking</div>
        }
        open={isViewModal}
        onCancel={() => setIsViewModal(false)}
        footer={[
          <Button key='back' onClick={() => setIsViewModal(false)}>
            Cancel
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
                  <div style={{ width: 200 }}>Tên người booking </div> :{' '}
                  {viewBooking?.name}
                </div>
                <br />
              </td>
              <td style={{ width: 600 }}>
                <div style={{ display: 'flex' }}>
                  <div style={{ width: 200 }}>Số điện thoại </div> :{' '}
                  {viewBooking?.phoneNumber}
                </div>
                <br />
              </td>
            </tr>
            <tr>
              <td style={{ width: 600 }}>
                <div style={{ display: 'flex' }}>
                  <div style={{ width: 200 }}>Tên homestay </div> :{' '}
                  {viewBooking?.homestay?.name}
                </div>
                <br />
              </td>
              <td style={{ width: 600 }}>
                <div style={{ display: 'flex' }}>
                  <div style={{ width: 200 }}>Tên chủ homestay </div> :{' '}
                  {viewBooking?.homestay?.ownerHomestay?.name}
                </div>
                <br />
              </td>
            </tr>
            <tr>
              <td style={{ width: 600 }}>
                <div style={{ display: 'flex' }}>
                  <div style={{ width: 200 }}>Giá </div> :{' '}
                  {formatCurrency(viewBooking.totalPrice)} (VNĐ)
                </div>
                <br />
              </td>
              <td style={{ width: 500 }}>
                <div style={{ display: 'flex' }}>
                  <div style={{ width: 200 }}>Số đêm </div> :{' '}
                  {viewBooking.numberOfNight} (Đêm)
                </div>
                <br />
              </td>
            </tr>
            <tr>
              <td style={{ width: 600 }}>
                <div style={{ display: 'flex' }}>
                  <div style={{ width: 200 }}>Ngày bắt đầu</div> :{' '}
                  {moment(viewBooking.startDate).locale('vi').format('LL')}
                </div>
                <br />
              </td>
              <td style={{ width: 500 }}>
                <div style={{ display: 'flex' }}>
                  <div style={{ width: 200 }}>Ngày kết thúc</div> :{' '}
                  {moment(viewBooking.endDate).locale('vi').format('LL')}
                </div>
                <br />
              </td>
            </tr>
            <tr>
              <td style={{ width: 1200 }}>
                <div style={{ display: 'flex' }}>
                  <div style={{ width: 200 }}>
                    Thông tin tài khoản ngân hàng của chủ homestay{' '}
                  </div>{' '}
                  : {viewBooking.homestay?.ownerHomestay?.numberAccount}{' - '}
                  {viewBooking.homestay?.ownerHomestay?.nameBank}{' - '}
                  {viewBooking.homestay?.ownerHomestay?.nameAccount}
                </div>
                <br />
              </td>
            </tr>
            <tr>
              <td style={{ width: 1200 }}>
                <div style={{ display: 'flex' }}>
                  <div style={{ width: 200 }}>
                    Thông tin tài khoản ngân hàng của khách hàng{' '}
                  </div>{' '}
                  : {viewBooking.user?.numberAccount}{' - '}
                  {viewBooking.user?.nameBank}{' - '}{viewBooking.user?.nameAccount}
                </div>
                <br />
              </td>
            </tr>
            <tr>
              <td style={{ width: 1200 }}>
                <div style={{ display: 'flex' }}>
                  <div style={{ width: 200 }}>
                    Mã booking
                  </div>{' '}
                  : {viewBooking?.code}
                </div>
                <br />
              </td>
            </tr>
            <tr>
              <td style={{ width: 600 }}>
                <div style={{ display: 'flex' }}>
                  <div style={{ width: 200 }}>Mã giao dịch </div> :{' '}
                  {viewBooking.customerTransactionCode}
                </div>
                <br />
              </td>
              <td style={{ width: 500 }}>
                <div style={{ display: 'flex' }}>
                  <div style={{ width: 200 }}>
                    Mã giao dịch với chủ homestay{' '}
                  </div>{' '}
                  : {viewBooking.adminTransactionCode}
                </div>
                <br />
              </td>
            </tr>
            <tr>
              <td style={{ width: 600 }}>
                <div style={{ display: 'flex' }}>
                  <div style={{ width: 200 }}>Tên khuyến mại </div> :{' '}
                  {viewBooking?.promotion?.name}
                </div>
                <br />
              </td>
              <td style={{ width: 500 }}>
                <div style={{ display: 'flex' }}>
                  <div style={{ width: 200 }}>
                    Số tiền giảm{' '}
                  </div>{' '}
                  : {viewBooking.promotionPrice}
                </div>
                <br />
              </td>
            </tr>
          </table>
          <div style={{ display: 'flex' }}>
            <div style={{ width: 200 }}>Hình thức đặt</div> :{' '}
            {viewBooking.typeBooking === 'DAT_COC'
              ? 'Đặt cọc'
              : 'Thanh toán trước'}
          </div>
          <br />
          <div style={{ display: 'flex' }}>
            <div style={{ width: 200 }}>Trạng thái </div> : {viewBooking.status}
          </div>
          <br />
        </div>
      </Modal>

      <Modal
        title='Thanh toán cho chủ homestay'
        open={ownerModal}
        onOk={() => handleOwnerTranCode()}
        onCancel={() => setOwnerModal(false)}
      >
        <Form>
          <Form.Item
            label='Mã giao dịch'
            name='name'
            rules={[
              {
                required: true,
                message: 'Vui lòng điền mã giao dịch',
              },
            ]}
          >
            <Input onChange={(data) => setOwnerTrancode(data.target.value)} />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title='Thanh toán cho khách hàng'
        open={userModal}
        onOk={() => handleUserTranCode()}
        onCancel={() => setUserModal(false)}
      >
        <Form>
          <Form.Item label='Mã giao dịch'>
            <Input onChange={(data) => setUserTrancode(data.target.value)} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}
export default BookingForm
