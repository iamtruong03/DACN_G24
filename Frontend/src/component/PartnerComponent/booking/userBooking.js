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
import { fetchTopUserBooking } from '../../../features/owner_homestay/statistical/statisticalThunk'
const { Title } = Typography

const BookingUser = () => {
  const dispatch = useDispatch()
  const userDetail = JSON.parse(localStorage.getItem('ownerDetail'))
  const UserID = userDetail?.data.id
  const userBooking = useSelector(
    (state) => state.statistical.statisticalTopBooking,
  )
  useEffect(() => {
    dispatch(fetchTopUserBooking(UserID))
  }, [])
  const formatCurrency = (value) => {
    // Sử dụng Intl.NumberFormat để định dạng giá trị tiền tệ
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(value)
  }

  const columns = [
    {
      title: 'Tên người đặt',
      dataIndex: 'name',
      key: 'name',
    },

    {
      title: 'Lượt đặt',
      dataIndex: 'soLuot',
      key: 'soLuot',
    },
    {
      title: 'Email liên hệ',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Giới tính',
      dataIndex: 'gender',
      key: 'gender',
      render(str) {
        return str == 'true' ? 'nam' : 'nữ'
      },
    },
    {
      title: 'Số điện thoại liên hệ',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
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
    // {
    //   name: 'Không thành công',
    //   value: 2,
    // },
  ]

  /**
   * export excel
   */

  return (
    <div style={{ marginTop: '20px' }}>
      <Title level={2}>Khách hàng thân thiết</Title>

      <Table columns={columns} dataSource={userBooking} />
    </div>
  )
}
export default BookingUser
