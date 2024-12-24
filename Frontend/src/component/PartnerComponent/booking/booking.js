import React, { useEffect } from 'react'
import { PlusOutlined } from '@ant-design/icons'
import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Select,
  Upload,
  Typography,
  Table,
  Row,
  Space,
} from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { EyeOutlined } from '@ant-design/icons'
import { useState } from 'react'
import moment from 'moment'
import Search from 'antd/es/input/Search'
import {
  fetchBooking,
  getBookingByNameHomestay,
} from '../../../features/owner_homestay/getbooking/bookingThunk'
import * as XLSX from 'xlsx'
import dayjs from 'dayjs'
const { Title } = Typography

const Booking = () => {
  const dispatch = useDispatch()
  const userDetail = JSON.parse(localStorage.getItem('ownerDetail'))
  const UserID = userDetail?.data.id
  const [homestayname, setHomestayName] = useState('')
  const [namebooking, setNameBooking] = useState('')
  const [valueselect, setValueSelect] = useState('')
  const [serchYear, setSerchYear] = useState('2024')
  const [serchMonth, setSerchMonth] = useState('')
  useEffect(() => {
    dispatch(
      getBookingByNameHomestay(
        UserID,
        homestayname,
        namebooking,
        valueselect,
        serchYear,
        serchMonth,
      ),
    )
  }, [homestayname, namebooking, valueselect, serchYear, serchMonth])
  const formatCurrency = (value) => {
    // Sử dụng Intl.NumberFormat để định dạng giá trị tiền tệ
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(value)
  }
  const currentDate = new Date()
  // Lấy thông tin về tháng và năm từ ngày hiện tại
  const currentMonth = currentDate.getMonth() + 1 // Tháng bắt đầu từ 0
  const currentYear = new Date().getFullYear()
  const currentDateTime = new Date().getDate()
  const booking = useSelector((state) => state.booking.booking)
  const onChangeMonth = (date, dateString) => {
    const selectedMonth = date ? date.format('MM') : '' // Format the selected date to get only the month
    const selectedYear = date ? date.format('YYYY') : ''
    setSerchMonth(selectedMonth)
    // setSerchYear(selectedYear)
  }
  const onChangeyear = (date, dateString) => {
    const selectedYear = date ? date.year() : '' // Extract the year from the date object
    setSerchYear(selectedYear.toString())
  }
  const columns = [
    {
      title: 'Ngày nhận phòng',
      dataIndex: 'startDate',
      key: 'startDate',
      render: (data) => {
        return moment(data).locale('vi').format('LL')
      },
    },
    {
      title: 'Ngày trả phòng',
      dataIndex: 'endDate',
      key: 'endDate',
      render: (data) => {
        return moment(data).locale('vi').format('LL')
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
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (data) => {
        if (data === 'THANH_CONG') {
          return 'Thành công'
        } else if (data === 'HUY') {
          return 'Hủy'
        } else if (data === 'DA_THUE_XONG') {
          return 'Đã thuê xong'
        } else {
          return 'Không thành công'
        }
      },
    },
    {
      title: 'Hình thức',
      dataIndex: 'typeBooking',
      key: 'typeBooking',
      render: (data) => {
        if (data === 'DAT_COC') {
          return 'Đặt cọc'
        } else {
          return 'Thanh toán trước'
        }
      },
    },
    {
      title: 'Email người đặt',
      dataIndex: 'email',
      key: 'email',
      render: (data, record) => {
        const today = dayjs()
        const dateFix = new Date(today)
        dateFix.setHours('00')
        dateFix.setMinutes('00')
        dateFix.setSeconds('00')
        dateFix.setMilliseconds('000')
        let isShowEmail =
          dayjs(Date(dateFix)).add(1, 'days').valueOf() >= record.startDate
        if (record.typeBooking === 'DAT_COC') {
          isShowEmail = true
        }

        return isShowEmail ? data : null
      },
    },
    {
      title: 'Tên người đặt',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Số điện thoại người đặt',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
      render: (data, record) => {
        const today = dayjs()
        const dateFix = new Date(today)
        dateFix.setHours('00')
        dateFix.setMinutes('00')
        dateFix.setSeconds('00')
        dateFix.setMilliseconds('000')
        let isShowPhoneNumber =
          dayjs(Date(dateFix)).add(1, 'days').valueOf() >= record.startDate
        if (record.typeBooking === 'DAT_COC') {
          isShowPhoneNumber = true
        }

        return isShowPhoneNumber ? data : null
      },
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
      render(str) {
        return formatCurrency((str * 100) / 111)
      },
    },
  ]
  const listFilter = [
    {
      name: 'Tất cả',
      value: '',
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
  const hanhdleSelect = (selectedValue) => {
    setValueSelect(selectedValue) // You can access the selected value here
  }
  const handleSearch = (value) => {
    setHomestayName(value)
  }
  const handleSearchBooking = (value) => {
    setNameBooking(value)
  }
  /**
   * export excel
   */
  const formattedData = booking?.map((item) => {
    // Kiểm tra nếu startDate là ngày trước đó và thời gian là từ 12 giờ trở đi thì hiển thị số điện thoại
    const isShowPhoneNumber = moment(item?.startDate).isBefore(
      moment().subtract(1, 'day'),
    )

    return {
      TenTaiKhoan: item.name,
      TenHomestay: item.homestay.name,
      NgayDat: moment(item.createdDate).locale('vi').format('LL'),
      TrangThai: item.status,
      EmailNguoiDat: isShowPhoneNumber ? item.user.email : '',
      TenNguoiDat: item.user.name,
      SoDienThoaiNguoiDat: isShowPhoneNumber ? item.user.phoneNumber : '',
      TongTien: formatCurrency((item.totalPrice * 100) / 111),
    }
  })

  const importAndAppendData = (data) => {
    const today = moment().format('YYYY-MM-DD')
    // Sample data
    const title = [`Thống kê lượt đặt phòng trong năm(ngày xuất file ${today})`]
    const header = ['Name', 'Age', 'City']

    const headers = Object.keys(data[0])
    const values = data.map((obj) => headers.map((key) => obj[key]))

    // Create a worksheet
    const ws = XLSX.utils.aoa_to_sheet([title, [], [], [...headers], ...values])

    // Apply styles to title
    const titleStyle = {
      font: { bold: true, size: 80, color: { rgb: 'FF0000' } }, // You can adjust the size and color as needed
      alignment: { horizontal: 'center' },
    }
    const titleCell = ws[XLSX.utils.encode_cell({ c: 0, r: 0 })] // Assuming the title is in cell A1
    XLSX.utils.format_cell(titleCell, titleStyle)

    // Apply styles to headers
    const headerStyle = {
      font: { bold: true },
      border: {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' },
      },
    }
    // Set column widths based on content
    headers.forEach((header, index) => {
      const maxColumnWidth = Math.max(
        ...values.map((row) => row[index].toString().length),
      )
      const columnWidth = Math.min(50, maxColumnWidth) // Set a maximum width for columns (50 is just an example)
      ws['!autofilter'] = {
        ref: `A1:${XLSX.utils.encode_col(headers.length - 1)}${
          values.length + 3
        }`,
      }
      ws['!cols'] = ws['!cols'] || []
      ws['!cols'][index] = { width: columnWidth + 2 } // Add some extra padding
    })

    // Apply styles to data cells
    // Apply styles to data cells
    const dataStyle = {
      border: {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' },
      },
    }
    values.forEach((row, rowIndex) => {
      row.forEach((cell, cellIndex) => {
        const cell_address = { c: cellIndex, r: rowIndex + 4 } // assuming data starts at row 4
        const cellStyle = Object.assign({}, dataStyle, {
          alignment: { horizontal: 'center' }, // Optional: Center-align the content
        })
        XLSX.utils.format_cell(ws[cell_address], cellStyle)
      })
    })

    // Create a workbook
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1')
    // Save the workbook to a file
    XLSX.writeFile(wb, `Thống_kê_đặt_phòng_TravelViVu_${today}.xlsx`)
  }

  // Example usage
  const exportExcel = () => {
    importAndAppendData(formattedData)
  }

  return (
    <div style={{ marginTop: '20px' }}>
      <Title level={2}>Quản trị đặt phòng</Title>
      {formattedData.length > 0 && (
        <div style={{ display: 'flex', marginBottom: 15 }}>
          <Title level={4}>Danh mục</Title>
          <Button
            style={{ marginLeft: 'auto' }}
            type='primary'
            onClick={exportExcel}
          >
            Xuất file thống kê đặt phòng
          </Button>
        </div>
      )}
      <Row>
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
          label='Tìm kiếm theo tên homestay'
          style={{ float: 'left', marginLeft: '30px' }}
        >
          <Input.Search
            placeholder='Tên homestay'
            allowClear
            size='medium'
            enterButton='search'
            onSearch={handleSearch}
          />
        </Form.Item>
        <Form.Item
          label='Tìm kiếm theo tên người đặt'
          style={{ float: 'left', marginLeft: ' 30px' }}
        >
          <Input.Search
            placeholder='Tên người đặt'
            allowClear
            size='medium'
            enterButton='search'
            onSearch={handleSearchBooking}
          />
        </Form.Item>
      </Row>
      <Row>
        <div style={{ marginLeft: 30 }}>
          <Form.Item
            label='Tìm kiếm theo tháng và năm'
            style={{ float: 'left', marginLeft: '30px' }}
          >
            <DatePicker onChange={onChangeMonth} picker='month' format='MM' />
          </Form.Item>
          <Form.Item
            label='Tìm kiếm theo năm'
            style={{ float: 'left', marginLeft: ' 50px' }}
          >
            <DatePicker
              style={{ marginLeft: 30 }}
              onChange={onChangeyear}
              picker='year'
              disabledDate={(current) =>
                current && current.year() > currentYear
              }
              defaultValue={dayjs(`${currentYear}-01-01`)}
            />
          </Form.Item>
        </div>
      </Row>
      <Table columns={columns} dataSource={booking} />
    </div>
  )
}
export default Booking
