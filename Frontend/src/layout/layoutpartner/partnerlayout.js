import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import Headerpartner from './headerpartner'
import Siderpartner from './siderpartner'
import { Layout } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { updateAxiosToken } from '../../app/axiosConfig'
import { checkToken } from '../../app/middleware'
import { LoadingOutlined } from '@ant-design/icons'
const { Header, Content } = Layout

const PartnerLayout = ({ children }) => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const isPartner = useSelector((state) => state.user.ispartner)
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('ownerDetail'))?.data?.token
    dispatch(checkToken(token))

    // Simulate loading for 1 second
    const loadingTimer = setTimeout(() => {
      setLoading(false)
    }, 1000)

    // Cleanup the timer to avoid memory leaks
    return () => clearTimeout(loadingTimer)
  }, [dispatch])

  useEffect(() => {
    const storedToken = JSON.parse(localStorage.getItem('ownerDetail'))?.data
      ?.token
    if (window.location.pathname.startsWith('/partner/') && !isPartner) {
      navigate('/error-role')
    }
    if (storedToken) {
      updateAxiosToken(storedToken)
    }
  }, [])

  // Render loading screen while loading is true
  if (loading) {
    return (
      <div
        style={{
          display: 'grid',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '20%',
          fontSize: 50,
        }}
      >
        <LoadingOutlined />
      </div>
    ) // You can replace this with your own loading component
  }

  // Render the actual layout when loading is false
  return (
    <div style={{ backgroundColor: '#f5f5f5' }}>
      <Headerpartner />
      <div className='admin-content'>
        <Outlet />
      </div>
      <Siderpartner />
    </div>
  )
}

export default PartnerLayout
