import React from 'react'
import { Breadcrumb, Layout, Menu } from 'antd'
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  PayCircleOutlined,
  UserOutlined,
  AreaChartOutlined,
  CommentOutlined,
  StockOutlined,
  HeartOutlined,
} from '@ant-design/icons'
import { Link, Route, Routes, useNavigate } from 'react-router-dom' // Import thư viện Link và Route
import HomeStayProduct from '../../component/PartnerComponent/page/homestayProduct'
import HomeStayAdd from '../../component/PartnerComponent/page/homestayAdd'
import ChangePassword from '../../component/PartnerComponent/login/changePassword'
import Booking from '../../component/PartnerComponent/booking/booking'
import StatisticalHomestay from '../../component/PartnerComponent/page/statisticalHomestay'
import Promotion from '../../component/PartnerComponent/promotion/promotion'
import UserCommment from '../../component/PartnerComponent/commentbyUser/usercomment'
import BookingUser from '../../component/PartnerComponent/booking/userBooking'
const { Header, Content, Sider } = Layout

function getItem(label, key, icon, route) {
  return {
    key,
    icon,
    label,
    route,
  }
}

const items = [
  {
    label: 'Quản lý Homestay',
    key: '1',
    icon: <PieChartOutlined />,
    route: 'partner/homestay',
    component: <HomeStayProduct />,
  },
  {
    label: 'Quản lý đặt phòng',
    key: '2',
    icon: <PayCircleOutlined />,
    route: 'partner/booking',
    component: <Booking />,
  },
  {
    label: 'Khách hàng thân thiết',
    key: '7',
    icon: <HeartOutlined />,
    route: 'partner/userBooking',
    component: <BookingUser />,
  },
  {
    label: 'Quản lý thống kê',
    key: '3',
    icon: <AreaChartOutlined />,
    route: 'partner/statistical',
    component: <StatisticalHomestay />,
  },
  {
    label: 'Quản lý khuyến mại',
    key: '4',
    icon: <DesktopOutlined />,
    route: 'partner/promotion',
    component: <Promotion />,
  },
  {
    label: 'Đánh giá,nhận xét từ khách hàng',
    key: '5',
    icon: <CommentOutlined />,
    route: 'partner/commentUser',
    component: <UserCommment />,
  },
  {
    label: 'Quản lý tài khoản',
    key: '6',
    icon: <UserOutlined />,
    route: 'partner/managementAccount',
    component: <ChangePassword />,
  },
]

const Siderpartner = () => {
  return (
    <Content
      style={{
        padding: '0 10px',
      }}
    >
      <Layout
        style={{
          padding: '12px 0',
          background: 'colorBgContainer',
        }}
      >
        <Sider
          style={{
            background: 'colorBgContainer',
          }}
          width={250}
        >
          <Menu
            mode='inline'
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{
              height: '100%',
            }}
          >
            {items.map((item) => (
              <Menu.Item key={item.key} icon={item.icon}>
                <Link to={item.route} style={{ textDecoration: 'none' }}>
                  {item.label}
                </Link>
              </Menu.Item>
            ))}
          </Menu>
        </Sider>
        <Content
          style={{
            padding: '0 24px',
            minHeight: '88vh',
            backgroundColor: '#ffffff',
            marginLeft: '10px',
          }}
        >
          <Routes>
            {items.map((item) => (
              <Route
                key={item.key}
                path={item.route}
                element={item.component}
              />
            ))}
          </Routes>
        </Content>
      </Layout>
    </Content>
  )
}

export default Siderpartner
