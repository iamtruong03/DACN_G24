import React from 'react'
import { Breadcrumb, Layout, Menu } from 'antd'
import {
  AreaChartOutlined,
  BuildOutlined,
  CommentOutlined,
  DesktopOutlined,
  FileOutlined,
  HomeOutlined,
  PayCircleOutlined,
  PieChartOutlined,
  ProfileOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { Link, Route, Routes, useNavigate } from 'react-router-dom' // Import thư viện Link và Route
import AddProductForm from '../../component/product/productadd'
import CategoryList from '../../component/admin/category/categorylist'
import BookingForm from '../../component/admin/booking/booking'
import CategoryType from '../../component/admin/category/categoryType'
import { useSelector } from 'react-redux'
import Statistical from '../../component/admin/statistical/statistical'
import Comment from '../../component/admin/comment/comment'
import User from '../../component/admin/user/user'
import Owner from '../../component/admin/owner/owner'
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
    label: 'Homestay',
    key: '1',
    icon: <PieChartOutlined />,
    route: 'admin/createform',
    component: <AddProductForm />,
  },
  {
    label: 'Booking',
    key: '2',
    icon: <PayCircleOutlined />,
    route: 'admin/booking',
    component: <BookingForm />,
  },
  {
    label: 'Tiện nghi',
    key: '3',
    icon: <BuildOutlined />,
    route: 'admin/category',
    component: <CategoryList />,
  },
  {
    label: 'Loại tiện nghi',
    key: '4',
    icon: <ProfileOutlined />,
    route: 'admin/category/type',
    component: <CategoryType />,
  },
  {
    label: 'Đánh giá của khách hàng',
    key: '5',
    icon: <CommentOutlined />,
    route: 'admin/comment',
    component: <Comment />,
  },
  {
    label: 'Thống kê',
    key: '6',
    icon: <AreaChartOutlined />,
    route: 'admin/statistical',
    component: <Statistical />,
  },
  {
    label: 'Tài khoản',
    key: '7',
    icon: <UserOutlined />,
    route: 'admin/owner',
    component: <User />,
  },
  {
    label: 'Tài khoản chủ homestay',
    key: '8',
    icon: <HomeOutlined />,
    route: 'admin/ownerHomestay',
    component: <Owner />,
  },
]

const SiderAdmin = () => {
  const Navigate = useNavigate()
  const isPartner = useSelector((state) => state.user.isAdmin)

  if (!isPartner) {
    return <Navigate to='/error-role' replace />
  }
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

export default SiderAdmin
