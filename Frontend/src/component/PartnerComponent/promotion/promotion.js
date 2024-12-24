import React, { useEffect, useMemo, useState } from 'react'
import {
  Form,
  Select,
  Typography,
  Table,
  Row,
  Space,
  Modal,
  Tooltip,
  Button,
  Input,
  Col,
  DatePicker,
  message,
  Checkbox,
  Popconfirm,
  InputNumber,
} from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import {
  EditOutlined,
  EyeOutlined,
  LoadingOutlined,
  ReloadOutlined,
  TeamOutlined,
} from '@ant-design/icons'
import moment from 'moment'
import Search from 'antd/es/input/Search'
import {
  UpdatePromotion,
  UpdateStatusPromotion,
  addPromotion,
  fetchPromotion,
} from '../../../features/owner_homestay/getbooking/promotionThunk'
import * as Yup from 'yup'
import { fetchHomestay } from '../../../features/owner_homestay/homestayThunk'
import dayjs from 'dayjs'

const { Title } = Typography

const text = <span>Sửa khuyến mại</span>
const textView = <span>xem chi tiết khuyến mại</span>
const textupdate = <span>Dừng hoạt động khuyến mại</span>
const Promotion = () => {
  const [isAddFrom, setIsAddFrom] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [homestayname, setHomestayName] = useState('')
  const [valueselect, setValueSelect] = useState('')
  const [isViewmodal, setIsviewmodal] = useState(false)
  const [homestay, setHomestay] = useState([])
  const [dataPromotion, setDataPromotion] = useState([])
  const [arrow, setArrow] = useState('Show')
  const dispatch = useDispatch()
  const userDetail = JSON.parse(localStorage.getItem('ownerDetail'))
  const UserID = userDetail?.data.id
  useEffect(() => {
    dispatch(fetchPromotion(UserID, homestayname, valueselect))
    dispatch(fetchHomestay(''))
  }, [homestayname, valueselect])
  const promotion = useSelector((state) => state.booking.promotions)
  const products = useSelector((state) => state.ownerHomestay.homestays)
  const [checkedValues, setCheckedValues] = useState([])
  useEffect(() => {
    // Update selectedRowKeys when homestay changes
    setCheckedValues(homestay.map((item) => item.id))
  }, [homestay])
  /**
   * @returns Table colums
   */
  // console.log(homestay.map((item) => item.id))
  const handlePriceChange = (value) => {
    // You can perform any additional formatting or validation here
    setValue(value)
  }
  const rowSelection = {
    selectedRowKeys: checkedValues,
    onChange: (selectedRowKeys, selectedRows) => {
      setCheckedValues(selectedRowKeys)
      setDataPromotion(selectedRows)
    },
    getCheckboxProps: (record) => ({
      // Column configuration not to be checked
      name: record.name,
      checked: record.price < value,
      disabled: record.price < value,
    }),
  }

  const isBeforeToday = (current) => {
    return current && current.isBefore(moment().startOf('day'))
  }
  const formatCurrency = (value) => {
    // Sử dụng Intl.NumberFormat để định dạng giá trị tiền tệ
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(value)
  }
  const columnsData = [
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
  ]

  /**
   * table view row
   */
  const columnsDataView = [
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
      title: 'Giá homestay sau khi giảm',
      dataIndex: 'price',
      key: 'price',
      align: 'center',
      render(str) {
        return formatCurrency(str - value)
      },
    },
  ]
  /**
   * @access modal thêm
   */
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [name, setName] = useState('')
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [idPromotion, setPromotion] = useState('')
  const [value, setValue] = useState(0)
  const [formErrors, setFormErrors] = useState({})
  const showModal = () => {
    setIsAddFrom(true)
    setIsModalOpen(true)
    setName('')
    setStartDate(null)
    setEndDate(null)
    setValue(0)
    setCheckedValues([])
    setHomestay([])
  }
  const handleOk = () => {
    setIsModalOpen(false)
  }
  const handleCancel = () => {
    setIsModalOpen(false)
    setIsviewmodal(false)
  }
  /**
   * update status promotion
   */
  const handleSubmitStatus = async (record) => {
    await message.info(
      'Đang tiến hành sửa trạng thái bạn vui lòng đợi một vài giây nhé!',
    )
    await dispatch(UpdatePromotion(record.id))
    await dispatch(fetchPromotion(UserID, homestayname, valueselect))
  }
  /**
   * Table promotion
   */
  const mergedArrow = useMemo(() => {
    if (arrow === 'Hide') {
      return false
    }
    if (arrow === 'Show') {
      return true
    }
    return {
      pointAtCenter: true,
    }
  }, [arrow])
  const columns = [
    {
      title: 'Tên khuyến mại',
      dataIndex: 'name',
      key: 'name',
      render: (data) => {
        return data
      },
    },
    {
      title: 'Ngày bắt đầu',
      dataIndex: 'startDate',
      key: 'startDate',
      align: 'center',
      render: (data) => {
        return moment(data).locale('vi').format('LL')
      },
    },
    {
      title: 'Ngày kết thúc',
      dataIndex: 'endDate',
      align: 'center',
      key: 'endDate',
      render: (data) => {
        return moment(data).locale('vi').format('LL')
      },
    },
    {
      title: 'Số tiền giảm',
      dataIndex: 'value',
      key: 'value',
      align: 'center',
      render(str) {
        return formatCurrency(str)
      },
    },
    {
      title: 'Trạng thái',
      dataIndex: 'statusPromotion',
      key: 'statusPromotion',
      align: 'center',
      render(str) {
        if (str == 'HOAT_DONG') {
          return 'Hoạt động'
        } else if (str == 'KET_THUC') {
          return 'Khuyến mại đã kết thúc'
        } else if (str == 'CHO_HOAT_DONG') {
          return 'Chờ hoạt động'
        } else {
          return 'Không hoạt động'
        }
      },
    },
    {
      title: 'Hành động',
      key: 'action',
      align: 'center',
      render: (_, record) => (
        <Space size='middle'>
          <a style={{ color: '#1677ff' }} onClick={() => handleViewRow(record)}>
            <EyeOutlined />
          </a>
          {record.statusPromotion === 'HOAT_DONG' ||
            (record.statusPromotion === 'CHO_HOAT_DONG' && ( // Thêm điều kiện ở đây
              <a
                style={{ color: '#1677ff' }}
                onClick={() => handleEdit(record)}
              >
                <EditOutlined />
              </a>
            ))}
          {record.statusPromotion === 'HOAT_DONG' && ( // Thêm điều kiện ở đây
            <Popconfirm
              title='Cập nhật mục này'
              description='Bạn chắc chắn muốn cập nhật khuyến mại này thành không hoạt động không?'
              icon={<ReloadOutlined />}
              cancelText='Hủy'
              okText='Cập nhật'
              onConfirm={() => handleSubmitStatus(record)}
            >
              <a>
                <ReloadOutlined />
              </a>
            </Popconfirm>
          )}
          {record.statusPromotion === 'HOAT_DONG' ||
            (record.statusPromotion === 'CHO_HOAT_DONG' && ( // Thêm điều kiện ở đây
              <Popconfirm
                title='Cập nhật mục này'
                description='Bạn chắc chắn muốn cập nhật khuyến mãi này thành không hoạt động không?'
                icon={<ReloadOutlined />}
                cancelText='Hủy'
                okText='Cập nhật'
                onConfirm={() => handleSubmitStatus(record)}
              >
                <a>
                  <ReloadOutlined />
                </a>
              </Popconfirm>
            ))}
        </Space>
      ),
    },
  ]
  /**
   * Edit promotion
   */
  const handleEdit = (record) => {
    setIsAddFrom(false)
    setIsModalOpen(true)
    setName(record.name)
    setStartDate(record.startDate)
    setEndDate(record.endDate)
    setValue(record.value)
    setHomestay(record.homestays)
    setPromotion(record.id)
  }
  /**
   * Handle view row
   */
  const handleViewRow = (record) => {
    setIsviewmodal(true)
    setName(record.name)
    const formattedDateStart = moment(record.startDate)
      .locale('vi')
      .format('YYYY-MM-DD')
    const formattedDateEnd = moment(record.endDate)
      .locale('vi')
      .format('YYYY-MM-DD')
    setStartDate(formattedDateStart)
    setEndDate(formattedDateEnd)
    setValue(record.value)
    setHomestay(record.homestays)
  }
  /**
   * @returns Add promotion
   */
  const promotions = {
    name: name,
    startDate: startDate?.valueOf(),
    endDate: endDate?.valueOf(),
    type: 'TIEN',
    value: value,
    owner: UserID,
    homestay: checkedValues,
  }
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .trim() // Remove leading and trailing whitespaces
      .min(1, 'Vui lòng nhập ít nhất một ký tự cho tên khuyến mại')
      .required('Vui lòng nhập tên khuyến mại'),
    value: Yup.number()
      .required('Vui lòng nhập số tiền giảm')
      .typeError('Vui lòng nhập số tiền giảm')
      .positive('Số tiền giảm phải là số dương')
      .min(1000, 'Số tiền giảm phải lớn hơn 1000'),
    startDate: Yup.number().required('Vui lòng chọn ngày bắt đầu'),
    endDate: Yup.number()
      .typeError('Vui lòng chọn ngày kết thúc')
      .required('Vui lòng chọn ngày kết thúc')
      .test(
        'endDate',
        'Ngày kết thúc phải lớn hơn ngày bắt đầu',
        function (value) {
          const { startDate } = this.parent

          // Kiểm tra nếu giá trị là số (datelong)
          if (typeof value === 'number') {
            return value > startDate
          }

          return false // Trả về false nếu không phải là số
        },
      ),
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (dataPromotion.some((item) => item.price < value)) {
      message.info('Có homestay có giá thấp hơn số tiền khuyến mại!')
    } else {
      try {
        await validationSchema.validate(promotions, { abortEarly: false })
        setIsLoading(true)
        if (isAddFrom) {
          await message.info(
            'Đang tiến hành thêm bạn vui lòng đợi một vài giây nhé!',
          )
          await dispatch(addPromotion(promotions))
          await dispatch(fetchPromotion(UserID, homestayname, valueselect))
          await setIsModalOpen(false)
          await setIsLoading(false)
          message.info('Thêm thành công')
          setName('')
          setValue(0)
          setStartDate(null)
          setEndDate(null)
        } else {
          await message.info(
            'Đang tiến hành sửa bạn vui lòng đợi một vài giây nhé!',
          )
          await dispatch(UpdateStatusPromotion(idPromotion, promotions))
          await dispatch(fetchPromotion(UserID, homestayname, valueselect))
          await setIsModalOpen(false)
          await setIsLoading(false)
          message.info('Sửa thành công')
        }
        dispatch(fetchPromotion(UserID))
        setFormErrors({})
      } catch (errors) {
        const errorObject = {}
        errors.inner.forEach((error) => {
          errorObject[error.path] = error.message
        })
        setFormErrors(errorObject)
        setIsLoading(false)
      }
    }
  }
  const hanhdleSelect = (selectedValue) => {
    setValueSelect(selectedValue) // You can access the selected value here
  }
  const handleSearch = (value) => {
    setHomestayName(value)
  }
  const listFilter = [
    {
      name: 'Tất cả',
      value: '',
    },
    {
      name: 'Hoạt động',
      value: 0,
    },
    {
      name: 'Không hoạt động',
      value: 1,
    },
    {
      name: 'Chờ hoạt động',
      value: 2,
    },
  ]

  return (
    <div style={{ marginTop: '20px' }}>
      <Title level={2}>Quản trị khuyến mại</Title>
      <div style={{ marginBottom: 20, float: 'right' }}>
        <Button type='primary' onClick={showModal}>
          Thêm mới khuyến mại
        </Button>
      </div>
      <Title level={4}>Danh mục</Title>
      <br />
      <Row style={{ float: 'right' }}>
        {/* <Form.Item label="Trạng thái" style={{ float: 'left' }}>
                    <Select
                        style={{ width: 143 }}
                        options={listFilter.map(filter => ({ value: filter.value, label: filter.name }))}
                        defaultValue={listFilter[0].value}
                    />
                </Form.Item> */}
        <Form.Item label='Trạng thái' style={{ float: 'left' }}>
          <Select
            style={{ width: 143 }}
            options={listFilter.map((filter) => ({
              value: filter.value,
              label: filter.name,
            }))}
            defaultValue={listFilter[0].value}
            onChange={hanhdleSelect}
          />
        </Form.Item>
        <Form.Item
          label='Tìm kiếm theo tên khuyến mại'
          style={{ float: 'left', marginLeft: ' 50px' }}
        >
          <Input.Search
            placeholder='Tên khuyến mại'
            allowClear
            size='medium'
            enterButton='search'
            onSearch={handleSearch}
          />
        </Form.Item>
        {/* <Form.Item label="Tìm kiếm theo tên chủ homestay" style={{ float: 'left', marginLeft: ' 50px' }}>
                    <Search
                        placeholder="Tên chủ homestay"
                        allowClear
                        size="medium"
                        enterButton="search"
                    />
                </Form.Item> */}
      </Row>
      <Table columns={columns} dataSource={promotion} />
      <Modal
        width={1200}
        title={isAddFrom == true ? 'Thêm khuyến mại' : 'Sửa khuyến mại'}
        okText={isAddFrom == true ? 'Thêm khuyến mại' : 'Sửa khuyến mại'}
        open={isModalOpen}
        onOk={handleSubmit}
        onCancel={handleCancel}
        okButtonProps={
          isLoading
            ? {
                disabled: true,
                icon: <LoadingOutlined />,
                loading: true,
              }
            : {}
        }
        cancelButtonProps={
          isLoading
            ? {
                disabled: true,
              }
            : {}
        }
      >
        <Form
          name='basic'
          labelCol={{
            span: 14,
          }}
          wrapperCol={{
            span: 24,
          }}
          style={{
            maxWidth: 1200,
          }}
          initialValues={{
            remember: true,
          }}
          autoComplete='off'
        >
          <div style={{ display: 'flex' }}>
            <div>
              <Row gutter={24} style={{ marginRight: 200 }}>
                {/* Trường thứ nhất */}
                <Col span={24}>
                  <Form.Item
                    label={<Title level={5}>Tên khuyến mại</Title>}
                    validateStatus={formErrors.name ? 'error' : ''} // Hiển thị lỗi cho trường name nếu có
                    help={formErrors.name} // Hiển thị thông báo lỗi cho trường name nếu có
                  >
                    <Input
                      style={{ width: '300px' }}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={24} style={{ marginRight: 200 }}>
                {/* Trường thứ nhất */}
                <Col span={24}>
                  <Form.Item
                    label={<Title level={5}>Ngày bắt đầu</Title>}
                    validateStatus={formErrors.startDate ? 'error' : ''} // Hiển thị lỗi cho trường name nếu có
                    help={formErrors.startDate} // Hiển thị thông báo lỗi cho trường name nếu có
                  >
                    <DatePicker
                      style={{ width: '300px' }}
                      value={
                        startDate
                          ? dayjs(
                              dayjs(startDate)
                                .locale('vi')
                                .format('YYYY-MM-DD'),
                              'YYYY-MM-DD',
                            )
                          : null
                      }
                      disabledDate={isBeforeToday}
                      onChange={(dates) => setStartDate(dates)}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={24} style={{ marginRight: 200 }}>
                {/* Trường thứ nhất */}
                <Col span={24}>
                  <Form.Item
                    label={<Title level={5}>Ngày kết thúc</Title>}
                    validateStatus={formErrors.endDate ? 'error' : ''} // Hiển thị lỗi cho trường name nếu có
                    help={formErrors.endDate} // Hiển thị thông báo lỗi cho trường name nếu có
                  >
                    <DatePicker
                      style={{ width: '300px' }}
                      value={
                        endDate
                          ? dayjs(
                              dayjs(endDate).locale('vi').format('YYYY-MM-DD'),
                              'YYYY-MM-DD',
                            )
                          : null
                      }
                      disabledDate={isBeforeToday}
                      onChange={(dates) => setEndDate(dates)}
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={24} style={{ marginRight: 200 }}>
                {/* Trường thứ nhất */}
                <Col span={24}>
                  <Form.Item
                    label={<Title level={5}>Số tiền giảm</Title>}
                    validateStatus={formErrors.value ? 'error' : ''} // Hiển thị lỗi cho trường name nếu có
                    help={formErrors.value} // Hiển thị thông báo lỗi cho trường name nếu có
                  >
                    <InputNumber
                      style={{ width: 300 }}
                      addonAfter='VNĐ'
                      onChange={handlePriceChange}
                      formatter={(value) =>
                        `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
                      }
                      value={value}
                      parser={(value) => {
                        // Remove non-numeric characters and parse as a float
                        const numericValue = parseFloat(
                          value.replace(/\D/g, ''),
                        )
                        return isNaN(numericValue) ? null : numericValue
                      }}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <div style={{ color: 'red', marginLeft: 30 }}>
                *(lưu ý số tiền khi thêm sẽ được trừ thẳng vào giá homestay)
              </div>
            </div>
            <div>
              <div style={{ color: 'red', marginLeft: 30 }}>
                *(Vui lòng chọn homestay mà bạn muốn áp dụng khuyến mại)
              </div>
              <Table
                rowSelection={{
                  type: 'checkbox',
                  ...rowSelection,
                }}
                columns={columnsData}
                dataSource={products}
                rowKey='id'
              />
            </div>
          </div>
        </Form>
      </Modal>
      <Modal
        title={
          <div style={{ fontSize: '22px' }}>
            Xem thông tin chi tiết khuyến mại
          </div>
        }
        open={isViewmodal}
        onCancel={handleCancel}
        onOk={handleCancel}
        width={900}
        style={{ fontSize: '40px' }}
      >
        <div style={{ fontSize: 18, fontWeight: 600 }}>
          <div style={{ display: 'flex' }}>
            <div style={{ width: 400 }}>Tên khuyến mại </div> : {name}
          </div>
          <br />
          <div style={{ display: 'flex' }}>
            <div style={{ width: 400 }}>Thời gian bắt đầu khuyến mại </div> :{' '}
            {startDate}
          </div>
          <br />
          <div style={{ display: 'flex' }}>
            <div style={{ width: 400 }}>Thời gian kết thúc khuyến mại </div> :{' '}
            {endDate}
          </div>
          <br />
          <div style={{ display: 'flex' }}>
            <div style={{ width: 400 }}>Số tiền giảm </div> :{' '}
            {formatCurrency(value)} (VNĐ)
          </div>
          <br />
          <div style={{ display: 'flex' }}>
            <div style={{ width: 400 }}>
              Các homestay đã được áp dụng khuyến mại{' '}
            </div>
          </div>
          <Table columns={columnsDataView} dataSource={homestay} />
        </div>
      </Modal>
    </div>
  )
}
export default Promotion
