import HeaderUser from './headeruser'
import FooterUser from './footeruser'
import { Layout, message } from 'antd'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { updateAxiosToken } from '../../app/axiosConfig'
import { useSelector } from 'react-redux'

const { Header, Content } = Layout

const UserLayout = ({ children }) => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn)
  const navigate = useNavigate()
  const storedToken = JSON.parse(localStorage.getItem('userDetail'))?.data
    ?.token
  const storedTokenAccept = JSON.parse(
    localStorage.getItem('userDetail'),
  )?.success
  useEffect(() => {
    updateAxiosToken(storedToken)

    const basePaths = [
      '/user/propreties',
      '/homestay/booking',
      '/review/booking',
      '/booking',
      '/shopingcart',
      '/userComment',
    ]

    const currentPath = window.location.pathname

    // Check if the current path matches any of the base paths
    const isProtectedPath = basePaths.some((basePath) => {
      const regex = new RegExp(`^${basePath}(\/|$)`)
      return regex.test(currentPath)
    })

    if (isProtectedPath && storedTokenAccept !== true) {
      navigate('/login')
      message.info('Bạn cần đăng nhập để thực hiện chức năng này')
    }
  }, [window.location.pathname, storedToken])

  return (
    <Layout>
      <HeaderUser />
      {/* Nội dung của trang quản trị */}
      <div className='admin-content'>
        <Outlet />
      </div>
      {/* Footer của trang quản trị */}
      <FooterUser /> {/* Sử dụng AdminFooter */}
    </Layout>
  )
}

export default UserLayout
