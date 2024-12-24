import './App.css'
import ProductList from './component/product/ProductList'
import LoginComponent from './component/login/Login'
import LoginDetail from './component/login/LoginDetail'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ProtectedRoute from './app/ProtectedRoute'
import AdminLayout from './layout/layoutadmin/AdminLayout'
import UserLayout from './layout/layoutuser/UserLayout'
import Register from './component/login/register'
import Hotel from './component/user/hotelcomponent/hotel'
import ErrorLogin from './features/admin/errorLogin/error'
import Endow from './component/user/endow/endow'
import HomePartner from './component/PartnerComponent/homepartner'
import LoginPartner from './component/PartnerComponent/login/partnerlogin'
import { useDispatch, useSelector } from 'react-redux'
import LoginAdmin from './component/admin/login/loginadmin'
import PartnerLayout from './layout/layoutpartner/partnerlayout'
import { DetailHomestay } from './component/user/hotelcomponent/detailHomestay'
import { BookingHomestay } from './component/user/hotelcomponent/bookingHomestay'
import { BookingReviewHomestay } from './component/user/hotelcomponent/bookingReview'
import PartnerRegister from './component/PartnerComponent/login/partnerregister'
import { BookingSuccess } from './component/user/hotelcomponent/bookigSucces'
import { useEffect } from 'react'
import { CartUser } from './component/user/cart/cart'
import { BookingUser } from './component/user/booking'
import ComfirmMail from './component/user/cofirmMail/confirm'
import ComfirmMailUser from './component/user/cofirmMail/confirmUser'
import ResetPassWordOwner from './component/PartnerComponent/login/resetPassword'
import { checkToken, checkTokenAdmin, checkTokenUser } from './app/middleware'
import ForgortPasswordOwner from './component/PartnerComponent/login/fogotPassword'
import ForgortPasswordUser from './component/login/forgotPassword'
import RulesWhile from './component/user/siderheader/ruleswhile'
import SupportedUser from './component/user/siderheader/supporteduser'
import UserComment from './component/user/siderheader/userComment'
import { BookingFailed } from './component/user/hotelcomponent/bookingFailed'
import { BookingSuccessVnpay } from './component/user/hotelcomponent/bookingSuccesVnpay'
import { DetailHomestayBooking } from './component/user/hotelcomponent/detailBookingHomestay'

function App() {
  //map component user
  const items = [
    { path: '', element: <ProductList /> },
    { path: 'user/propreties', element: <LoginDetail /> },
    { path: 'login', element: <LoginComponent /> },
    { path: 'register', element: <Register /> },
    { path: 'home-stay', element: <Hotel /> },
    { path: 'error-role', element: <ErrorLogin /> },
    { path: 'phieu-giam-gia', element: <Endow /> },
    { path: 'hop-tac', element: <HomePartner /> },
    { path: 'hop-tac/login', element: <LoginPartner /> },
    { path: 'login-admin', element: <LoginAdmin /> },
    { path: 'homestay/detail/:id', element: <DetailHomestay /> },
    { path: 'homestay/booking/:id', element: <BookingHomestay /> },
    { path: 'review/booking/:id', element: <BookingReviewHomestay /> },
    { path: 'hop-tac/register', element: <PartnerRegister /> },
    { path: 'successBooking', element: <BookingSuccess /> },
    { path: 'booking/:id', element: <BookingUser /> },
    { path: 'shopingcart', element: <CartUser /> },
    { path: 'changePassword', element: <ResetPassWordOwner /> },
    { path: 'changePasswordUser', element: <ForgortPasswordUser /> },
    { path: 'RulesWhile', element: <RulesWhile /> },
    { path: 'supporteduser', element: <SupportedUser /> },
    { path: 'userComment', element: <UserComment /> },
    { path: 'failedBooking', element: <BookingFailed /> },
    { path: 'bookingSuccess', element: <BookingSuccessVnpay /> },
    { path: 'booking/homestay/detail/:id', element: <DetailHomestayBooking /> },
  ]
  useEffect(() => {
    window.scrollTo(0, 0) // Cuộn lên đầu trang khi path thay đổi
  }, [window.location.pathname])
  //
  const dispatch = useDispatch()

  useEffect(() => {
    // Lấy token từ localStorage, Redux state, hoặc nơi khác
    const token = JSON.parse(localStorage.getItem('ownerDetail'))?.data?.token
    const storedTokenAdmin = JSON.parse(localStorage.getItem('adminDetail'))
      ?.data?.token
    const storedTokenUser = JSON.parse(localStorage.getItem('userDetail'))?.data
      ?.token

    // Gọi middleware để kiểm tra token
    dispatch(checkToken(token))
    dispatch(checkTokenAdmin(storedTokenAdmin))
    dispatch(checkTokenUser(storedTokenUser))
  }, [dispatch])
  return (
    <>
      <Router>
        <Routes>
          {/* guest component */}
          <Route path='/*' element={<UserLayout />}>
            {items.map((item) => (
              <Route path={item.path} element={item.element} />
            ))}
          </Route>
          {/* map quyen voi url admin */}
          <Route path='/user/comfirmmail' element={<ComfirmMailUser />} />
          <Route path='/owner/comfirmmail' element={<ComfirmMail />} />
          <Route
            path='/api/v2/login/reset-password/:id'
            element={<ForgortPasswordOwner />}
          />
          <Route path='/*' element={<PartnerLayout />}>
            <Route path='partner/*' element={<ProtectedRoute partnerOnly />} />
          </Route>
          <Route path='/*' element={<AdminLayout />}>
            <Route path='admin/*' element={<ProtectedRoute adminOnly />} />
            {/* <Route path="*" element={<Navigate to="/error-role" replace />} /> */}
            <Route path='error-role' element={<ErrorLogin />} />
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
