import { DatePicker, Table, Tabs, Typography } from 'antd'
import { Column } from '@ant-design/plots'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import {
  fetchStatisticalByDay,
  fetchStatisticalByMonth,
  fetchStatisticalByTop5,
  fetchStatisticalByYear,
  fetchStatisticalByYears,
} from '../../../features/admin/statistical/statisticalThunk'
import imgchart from '../../../assets/img/Tochartstatical.png'
import imgyellowchart from '../../../assets/img/yellowtoChart.png'
import imgBluechart from '../../../assets/img/blueimg.png'
import imgRedchart from '../../../assets/img/redimg.png'
import dayjs from 'dayjs'
const { Title } = Typography
const Statistical = () => {
  const dispatch = useDispatch()
  const statistical = useSelector(
    (state) => state.statisticalAdmin.statisticalByYear,
  )
  const statisticalByMonth = useSelector(
    (state) => state.statisticalAdmin.statisticalByMonth,
  )
  const statisticalByDay = useSelector(
    (state) => state.statisticalAdmin.statisticalByDay,
  )
  const statisticalByYears = useSelector(
    (state) => state.statisticalAdmin.statisticalByYears,
  )
  const statisticalByTop5 = useSelector(
    (state) => state.statisticalAdmin.statisticalByTop5,
  )

  const booking = useSelector((state) => state.booking.bookings)
  const userDetail = JSON.parse(localStorage.getItem('ownerDetail'))
  const UserID = userDetail?.data.id
  const currentDate = new Date()
  const formatCurrency = (value) => {
    // Sử dụng Intl.NumberFormat để định dạng giá trị tiền tệ
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(value)
  }
  // Lấy thông tin về tháng và năm từ ngày hiện tại
  const currentMonth = currentDate.getMonth() + 1 // Tháng bắt đầu từ 0
  const currentYear = new Date().getFullYear()
  const currentDateTime = new Date().getDate()
  const [statisticalByYear, setStatisticalByYear] = useState([])
  const [namebooking, setNameBooking] = useState('')
  const [valueselect, setValueSelect] = useState('1')
  const [year, setYear] = useState(new Date().getFullYear())
  const onChange = (dateString) => {
    setYear(new Date(dateString).getFullYear())
    dispatch(fetchStatisticalByYear(new Date(dateString).getFullYear()))
    dispatch(fetchStatisticalByYears(new Date(dateString).getFullYear()))
    dispatch(
      fetchStatisticalByDay(
        currentDateTime,
        currentMonth,
        new Date(dateString).getFullYear(),
      ),
    )
    dispatch(
      fetchStatisticalByMonth(currentMonth, new Date(dateString).getFullYear()),
    )
    dispatch(fetchStatisticalByTop5(new Date(dateString).getFullYear()))
  }
  useEffect(() => {
    dispatch(fetchStatisticalByYear(year))
    dispatch(fetchStatisticalByYears(year))
    dispatch(fetchStatisticalByDay(currentDateTime, currentMonth, currentYear))
    dispatch(fetchStatisticalByMonth(currentMonth, currentYear))
    dispatch(fetchStatisticalByTop5(year))
  }, [])

  const convertDataForChart = (data) => {
    if (!data || data.length === 0) {
      return []
    }

    // Chuyển đổi dữ liệu thành định dạng phù hợp cho biểu đồ
    return data.map((item, index) => ({
      date: getMonthName(index + 1), // Hàm này sẽ cần được định nghĩa để trả về tên tháng dựa trên số thứ tự
      doanhSo: item.doanhSo,
      tongSoTien: item.tongSoTien - (item.tongSoTien * 100) / 111,
      type: 'register', // Set a default type or determine it based on your requirements
    }))
  }

  // Hàm để lấy tên tháng dựa trên số thứ tự (1-12)
  const getMonthName = (monthNumber) => {
    const monthNames = [
      'Tháng 1',
      'Tháng 2',
      'Tháng 3',
      'Tháng 4',
      'Tháng 5',
      'Tháng 6',
      'Tháng 7',
      'Tháng 8',
      'Tháng 9',
      'Tháng 10',
      'Tháng 11',
      'Tháng 12',
    ]

    return monthNames[monthNumber - 1]
  }

  const convertedData = convertDataForChart(statistical)

  const formattedData = convertedData.map((item) => ({
    date: item.date,
    tongSoTien: parseInt(item.tongSoTien),
  }))
  const config = {
    data: formattedData,
    xField: 'date',
    yField: 'tongSoTien',
    label: {
      position: 'middle',
      style: {
        fill: '#FFFFFF',
        opacity: 0.6,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    yAxis: {
      label: {
        formatter: (value) => formatCurrency(value),
      },
    },
    tooltip: {
      customContent: (title, items) => {
        const formattedItems = items.map((item) => ({
          name: item.name,
          value: formatCurrency(item.value),
        }))

        return `
                    <div class="g2-tooltip">
                        <div class="g2-tooltip-title">${title}</div>
                        <ul class="g2-tooltip-list">
                            ${formattedItems
                              .map(
                                (item) =>
                                  `<li class="g2-tooltip-list-item">${item.name}: ${item.value}</li>`,
                              )
                              .join('')}
                        </ul>
                    </div>
                `
      },
    },
    meta: {
      date: {
        alias: 'Ngày',
      },
      tongSoTien: {
        alias: 'Tổng Số Tiền',
      },
    },
  }

  // table
  const columns = [
    {
      title: 'Tên Homestay',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Số phòng',
      dataIndex: 'roomNumber',
      key: 'roomNumber',
    },
    {
      title: 'Số lượng đặt phòng',
      dataIndex: 'doanhSo',
      key: 'doanhSo',
    },
    {
      title: 'Tổng số tiền hoa hồng',
      dataIndex: 'tongSoTien',
      key: 'tongSoTien',
      render(str) {
        return formatCurrency(str - (str * 100) / 111)
      },
    },
    {
      title: 'Địa chỉ homestay',
      dataIndex: 'address',
      key: 'address',
    },
  ]

  return (
    <div>
      <Title style={{ marginTop: '20px' }}>Thống kê doanh thu</Title>
      <div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div
            style={{
              width: '25%',
              height: 200,
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
              {statisticalByDay.tongSoTien -
                (statisticalByDay.tongSoTien * 100) / 111 ==
              null
                ? 0
                : formatCurrency(
                    statisticalByDay.tongSoTien -
                      (statisticalByDay.tongSoTien * 100) / 111,
                  )}
            </Title>
            <Title
              style={{ marginTop: '1px', color: 'white', fontWeight: 600 }}
              level={5}
            >
              {' '}
              Doanh thu ngày hôm nay
            </Title>
            <img src={imgchart} style={{ width: '100%' }} />
          </div>
          <div
            style={{
              width: '25%',
              height: 200,
              backgroundColor: '#3399ff',
              padding: 25,
              marginRight: 60,
              borderRadius: 8,
            }}
          >
            <Title
              style={{ marginTop: '1px', color: 'white', fontWeight: 600 }}
              level={3}
            >
              {statisticalByMonth.tongSoTien -
                (statisticalByMonth.tongSoTien * 100) / 111 ==
              null
                ? 0
                : formatCurrency(
                    statisticalByMonth.tongSoTien -
                      (statisticalByMonth.tongSoTien * 100) / 111,
                  )}
            </Title>
            <Title
              style={{ marginTop: '1px', color: 'white', fontWeight: 600 }}
              level={5}
            >
              {' '}
              Doanh thu tháng này{' '}
            </Title>
            <img src={imgBluechart} style={{ width: '100%' }} />
          </div>
          <div
            style={{
              width: '25%',
              height: 200,
              backgroundColor: '#f9b115',
              padding: 25,
              marginRight: 60,
              borderRadius: 8,
            }}
          >
            <Title
              style={{ marginTop: '1px', color: 'white', fontWeight: 600 }}
              level={3}
            >
              {statisticalByYears.tongSoTien -
                (statisticalByYears.tongSoTien * 100) / 111 ==
              null
                ? 0
                : formatCurrency(
                    statisticalByYears.tongSoTien -
                      (statisticalByYears.tongSoTien * 100) / 111,
                  )}
            </Title>
            <Title
              style={{ marginTop: '1px', color: 'white', fontWeight: 600 }}
              level={5}
            >
              {' '}
              Doanh thu năm {year}{' '}
            </Title>
            <img
              src={imgyellowchart}
              style={{ width: '100%', marginTop: 10 }}
            />
          </div>
          <div
            style={{
              width: '25%',
              height: 200,
              backgroundColor: '#e55353',
              padding: 25,
              borderRadius: 8,
            }}
          >
            <Title
              style={{ marginTop: '1px', color: 'white', fontWeight: 600 }}
              level={3}
            >
              {' '}
              {statisticalByYears.doanhSo == null
                ? 0
                : statisticalByYears.doanhSo}{' '}
              lượt
            </Title>
            <Title
              style={{ marginTop: '1px', color: 'white', fontWeight: 600 }}
              level={5}
            >
              Số lượt đã đặt phòng trong năm {year}
            </Title>
            <img src={imgRedchart} style={{ width: '100%', marginTop: 1 }} />
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', marginTop: '20px' }}>
        <Title level={5} style={{ marginTop: '20px' }}>
          Biểu đồ thống kê doanh thu theo năm
        </Title>
        <DatePicker
          onChange={onChange}
          picker='year'
          style={{
            marginLeft: 'auto',
            width: 300,
            height: 40,
            marginTop: '20px',
          }}
          disabledDate={(current) => current && current.year() > currentYear}
          defaultValue={dayjs(`${currentYear}-01-01`)}
        />
      </div>
      <Column {...config} />
      <div style={{ marginTop: '40px' }}>
        <Title level={3}>Top 5 homestay có doanh thu cao nhất</Title>
        <Table columns={columns} dataSource={statisticalByTop5} />
      </div>
    </div>
  )
}
export default Statistical
