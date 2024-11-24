import { useDispatch, useSelector } from 'react-redux'
import {
  Avatar,
  DatePicker,
  Tabs,
  Typography,
  message,
  notification,
} from 'antd'
import {
  UserOutlined,
  FileProtectOutlined,
  LogoutOutlined,
  BellOutlined,
  RedoOutlined,
  BankOutlined,
} from '@ant-design/icons'
import { useState } from 'react'
import { MDBBtn, MDBCol, MDBInput, MDBRow } from 'mdb-react-ui-kit'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'
import { logoutUser } from '../../features/user/userThunk'
import {
  ChangePasswordByPass,
  ChangePasswordByPassUser,
} from '../../features/owner_homestay/changePassword/changPassword'
import { instance } from '../../app/axiosConfig'
import dayjs from 'dayjs'

const { Title } = Typography
const { TabPane } = Tabs
const LoginDetail = () => {
  const navigate = useNavigate()
  const userDetail = JSON.parse(localStorage.getItem('userDetail'))
  const namelocal = userDetail?.data.name
  const dataUser = useSelector((state) => state.user.userData)
  const [name, setname] = useState(userDetail?.data?.name)
  const [birthday, setbirthday] = useState(856345)
  const [gender, setgender] = useState(true)
  const [address, setaddress] = useState(userDetail?.data?.address)
  const [phoneNumber, setphoneNumber] = useState(userDetail?.data?.phoneNumber)
  const [email, setemail] = useState(userDetail?.data?.email)
  const [username, setusername] = useState('')
  const [numberBank, setNumberBank] = useState(userDetail?.data?.numberAccount)
  const [nameBank, setNameBank] = useState(userDetail?.data?.nameBack)
  const [nameAccountBank, setNameAccountBank] = useState(
    userDetail?.data?.nameAccount,
  )
  const [password, setpassword] = useState('')
  const [identificationNumber, setidentificationNumber] = useState('')
  const [loading, setLoading] = useState(false)
  const handleDateChangestart = (dates) => {
    setidentificationNumber(dates.valueOf())
  }

  const [newpassword, setnewpassword] = useState('')
  const [confirmpassword, setconfirmpassword] = useState('')
  const formChangePass = {
    currentPassword: password,
    newPassword: newpassword,
    confirmationPassword: confirmpassword,
  }

  const [file, setFile] = useState([])
  const [selectedImage, setSelectedImage] = useState([])
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0]

    if (selectedFile) {
      const imageObject = {
        name: selectedFile.name,
        url: URL.createObjectURL(selectedFile),
      }

      setSelectedImage(imageObject)
      setFile(selectedFile)
    }
  }
  const openNotification = () => {
    notification.open({
      message: 'Thông báo',
      description: 'Cập nhật thông tin thành công',
      onClick: () => {
        console.log('Notification Clicked!')
      },
    })
  }
  const openNotificationChangePass = () => {
    notification.open({
      message: 'Thông báo',
      description: 'Mật khẩu mới và mật khẩu xác nhận phải giống nhau',
      onClick: () => {
        console.log('Notification Clicked!')
      },
    })
  }
  const handleSubmitchange = async (e) => {
    e.preventDefault()
    if (newpassword !== confirmpassword) {
      openNotificationChangePass()
      return
    }
    try {
      // Assuming ChangePasswordByPass function takes an object with a 'password' property
      await ChangePasswordByPassUser(formChangePass)
      openNotification()
    } catch (error) {
      console.error('Password change failed:', error)
    }
  }

  const customerData = {
    name: name,
    gender: gender,
    address: address,
    phoneNumber: phoneNumber,
    email: email,
    birthday: new Date(identificationNumber).valueOf(),
    username: dataUser?.data?.username,
  }
  const dispatch = useDispatch()
  const logout = () => {
    dispatch(logoutUser())
    navigate('/login')
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true) // Set loading to true when submitting

    const formData = new FormData()
    formData.append('name', name)
    formData.append('gender', gender)
    formData.append('address', address)
    formData.append('phoneNumber', phoneNumber)
    formData.append('email', email)
    formData.append(
      'birthday',
      identificationNumber || dataUser.data?.birthday.valueOf(),
    )
    formData.append('username', dataUser?.data?.username)

    if (file && file.size > 0) {
      formData.append('avatar', file)
    }

    message.info('Đang tiến hành sửa bạn vui lòng đợi một vài giây nhé!', 5)
    instance
      .put(
        `http://localhost:8080/api/v1/customer/update-information-customer?id=${userDetail?.data.id}`,
        formData,
      )
      .then((response) => {
        setLoading(false) // Set loading to false after a successful request
        message.info(
          'Sửa thông tin thành công những thay đổi sẽ được áp dụng cho lần đăng nhập tới!',
          5,
        )
      })
      .catch((error) => {
        // console.error('Error:', error)

        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          const errorMessage = error.response.data.message
          //   console.error('Error Message:', errorMessage)

          // Do something with the error message, such as displaying it to the user
          message.error(errorMessage, 5)
        }

        setLoading(false) // Set loading to false if the request fails
      })
  }
  const handleSubmitBank = (e) => {
    e.preventDefault()
    setLoading(true) // Set loading to true when submitting

    const formData = new FormData()
    formData.append('name', name)
    formData.append('gender', gender)
    formData.append('address', address)
    formData.append('phoneNumber', phoneNumber)
    formData.append('email', email)
    formData.append(
      'birthday',
      identificationNumber || dataUser.data?.birthday.valueOf(),
    )
    formData.append('username', dataUser?.data?.username)

    if (file.length > 0) {
      formData.append('avatar', file)
    }

    formData.append('nameBack', nameBank)
    formData.append('nameAccount', nameAccountBank)
    formData.append('numberAccount', numberBank)
    message.info('Đang tiến hành sửa bạn vui lòng đợi một vài giây nhé!', 5)
    instance
      .put(
        `http://localhost:8080/api/v1/customer/update-information-customer?id=${userDetail?.data.id}`,
        formData,
      )
      .then((response) => {
        localStorage.setItem('ownerDetail', JSON.stringify(response))
        setLoading(false) // Set loading to false after a successful request
        message.info(
          'Sửa thông tin thành công những thay đổi sẽ được áp dụng cho lần đăng nhập tới!',
          5,
        )
      })
      .catch((error) => {
        // console.error('Error:', error)

        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          const errorMessage = error.response.data.message
          //   console.error('Error Message:', errorMessage)

          // Do something with the error message, such as displaying it to the user
          message.error(errorMessage, 5)
        }

        setLoading(false) // Set loading to false if the request fails
      })
  }
  const isBeforeToday = (current) => {
    return current && current.isAfter(moment().startOf('day'))
  }
  const [activeTab, setActiveTab] = useState('1')
  const items = [
    {
      key: '1',
      label: (
        <div style={{ display: 'flex' }}>
          <BellOutlined style={{ fontSize: 25 }} />
          <Title level={5} style={{ marginTop: 2 }}>
            Thông báo email
          </Title>
        </div>
      ),
      children: (
        <div
          style={{
            width: '100%',
            height: 200,
            border: '1px solid #b0b0b0',
            borderRadius: 8,
            padding: '10px 20px 10px 20px',
            backgroundColor: 'rgba(255,255,255,1.00)',
          }}
        >
          <Title level={4}>Thông báo email</Title>
          <div>
            Tùy chọn email:chúng tôi sẽ gửi các thông báo về thanh toán,đổi mật
            khẩu quên mật khẩu vào email:{' '}
            <Title level={5}>{userDetail?.data.email}</Title>
          </div>
        </div>
      ),
    },
    {
      key: '2',
      label: (
        <div style={{ display: 'flex' }}>
          <UserOutlined style={{ fontSize: 25 }} />
          <Title level={5} style={{ marginTop: 2 }}>
            Quản lý tài khoản
          </Title>
        </div>
      ),
      children: (
        <div>
          <div>
            <Title level={4}>Thông tin tài khoản</Title>
          </div>
          <div
            style={{
              width: '100%',
              height: 500,
              border: '1px solid #b0b0b0',
              borderRadius: 8,
              padding: '10px 20px 10px 20px',
              backgroundColor: 'rgba(255,255,255,1.00)',
            }}
          >
            <div>
              <Title level={4}>Dữ liệu cá nhân</Title>
            </div>
            <form onSubmit={handleSubmit}>
              <MDBRow>
                <MDBCol col='6'>
                  <MDBInput
                    wrapperClass='mb-4'
                    label='Họ và Tên'
                    id='name'
                    type='text'
                    onChange={(e) => setname(e.target.value)}
                    defaultValue={dataUser?.data?.name}
                    required
                  />
                </MDBCol>
                <MDBCol col='6'>
                  <MDBInput
                    wrapperClass='mb-4'
                    label='Địa chỉ'
                    id='address'
                    type='text'
                    required
                    defaultValue={dataUser?.data?.address}
                    onChange={(e) => setaddress(e.target.value)}
                  />
                </MDBCol>
              </MDBRow>
              <MDBInput
                wrapperClass='mb-4'
                required
                label='Email'
                id='email'
                type='email'
                defaultValue={dataUser?.data?.email}
                onChange={(e) => setemail(e.target.value)}
              />
              <MDBInput
                wrapperClass='mb-4'
                label='Số điện thoại'
                id='phoneNumber'
                type='number'
                required
                defaultValue={dataUser?.data?.phoneNumber}
                onChange={(e) => setphoneNumber(e.target.value)}
              />
              {/* <MDBInput
                wrapperClass='mb-4'
                label='Ngày sinh'
                id='birthday'
                type='date'
                required
                defaultValue={
                  dataUser?.data?.birthday
                    ? dayjs(
                        dayjs(dataUser?.data?.birthday)
                          .locale('vi')
                          .format('YYYY-MM-DD'),
                        'YYYY-MM-DD',
                      )
                    : null
                }
                onChange={(e) => setidentificationNumber(e.target.value)}
              /> */}
              <DatePicker
                label='Ngày sinh'
                id='birthday'
                type='date'
                required
                defaultValue={
                  dataUser?.data?.birthday
                    ? dayjs(
                        dayjs(dataUser?.data?.birthday)
                          .locale('vi')
                          .format('YYYY-MM-DD'),
                        'YYYY-MM-DD',
                      )
                    : null
                }
                onChange={handleDateChangestart}
                style={{ width: '100%', marginBottom: 15 }}
                disabledDate={isBeforeToday}
              />

              <MDBRow>
                <MDBCol col='6'>
                  Giới tính &emsp;&emsp;
                  <label>
                    <input
                      type='radio'
                      name='gender'
                      value={true}
                      defaultChecked={true}
                      checked={gender === true}
                      onChange={() => setgender(true)}
                    />
                    Nam
                  </label>
                  &emsp;
                  <label>
                    <input
                      type='radio'
                      name='gender'
                      value={false}
                      checked={gender === false}
                      onChange={() => setgender(false)}
                    />
                    Nữ
                  </label>
                </MDBCol>
              </MDBRow>
              <Title level={5}>Tải lên hình đại diện</Title>
              <div style={{ display: 'flex' }}>
                <label
                  htmlFor='image'
                  style={{
                    cursor: 'pointer',
                    border: '1px solid black',
                    borderRadius: 8,
                    padding: '6px 15px 6px 15px',
                    marginLeft: 10,
                  }}
                >
                  Chọn tệp
                </label>
                <input
                  type='file'
                  id='image'
                  accept='image/*'
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                />
                <div style={{ marginLeft: 8, marginTop: 5 }}>
                  {selectedImage ? (
                    <div>
                      <img
                        src={selectedImage.url}
                        style={{ width: 50, marginRight: 5 }}
                      />
                      {selectedImage.name}
                    </div>
                  ) : (
                    'Chưa có file được chọn'
                  )}
                </div>
              </div>
              <MDBBtn
                type='submit'
                className='w-100 mb-4'
                size='md'
                style={{ marginTop: 10 }}
                disabled={loading}
              >
                {loading ? 'Đang lưu...' : 'Lưu'}
              </MDBBtn>
            </form>
          </div>
        </div>
      ),
    },
    {
      key: '6',
      label: (
        <div style={{ display: 'flex' }}>
          <BankOutlined style={{ fontSize: 25 }} />
          <Title level={5} style={{ marginTop: 2 }}>
            Thông tin tài khoản
          </Title>
        </div>
      ),
      children: (
        <div>
          <Title level={3}>Cập nhật thông tin tài khoản ngân hàng</Title>
          <form>
            <MDBInput
              wrapperClass='mb-4'
              label='Số tài khoản'
              id='numberBank'
              type='numberBank'
              required
              defaultValue={userDetail?.data?.numberAccount}
              onChange={(e) => setNumberBank(e.target.value)}
            />
            <MDBInput
              wrapperClass='mb-4'
              label='Tên ngân hàng'
              id='nameBank'
              type='nameBank'
              required
              defaultValue={userDetail?.data?.nameBack}
              onChange={(e) => setNameBank(e.target.value)}
            />
            <MDBInput
              wrapperClass='mb-4'
              label='Tên tài khoản'
              id='nameAccountBank'
              type='nameAccountBank'
              required
              defaultValue={userDetail?.data?.nameAccount}
              onChange={(e) => setNameAccountBank(e.target.value)}
            />
            <MDBBtn
              className='w-100 mb-4'
              size='md'
              style={{ marginTop: 10 }}
              onClick={handleSubmitBank}
            >
              Cập nhật thông tin tài khoản ngân hàng
            </MDBBtn>
          </form>
        </div>
      ),
    },
    {
      key: '3',
      label: (
        <div style={{ display: 'flex' }}>
          <FileProtectOutlined style={{ fontSize: 25 }} />
          <Title level={5} style={{ marginTop: 2 }}>
            Điều khoản và chính sách
          </Title>
        </div>
      ),
      children: (
        <div
          style={{
            width: '100%',
            height: '100%',
            border: '1px solid #b0b0b0',
            borderRadius: 8,
            padding: '10px 20px 10px 20px',
            backgroundColor: 'rgba(255,255,255,1.00)',
          }}
        >
          <Title level={3}>Điều khoản và Chính sách</Title>
          <Title level={4}>1. Điều khoản sử dụng</Title>
          <div>
            1.1 Điều khoản tổng quan Chào mừng bạn đến với trang web thuê
            homestay của chúng tôi. Việc sử dụng trang web này phải tuân theo
            các điều khoản và điều kiện sau đây. Bằng cách sử dụng trang web,
            bạn đồng ý và chấp nhận các điều khoản này mà không có bất kỳ giới
            hạn hay điều kiện nào.
            <br />
            1.2 Điều khoản đặt phòng Khi bạn thực hiện đặt phòng trên trang web,
            bạn cam kết rằng tất cả thông tin bạn cung cấp là chính xác và đầy
            đủ. Chúng tôi có quyền từ chối đặt phòng hoặc hủy bỏ bất kỳ đặt
            phòng nào nếu chúng tôi phát hiện thông tin không chính xác hoặc
            gian lận.
          </div>
          <Title level={4}>2. Chính sách bảo mật</Title>
          <div>
            2.1 Thu thập thông tin Chúng tôi thu thập thông tin cá nhân từ bạn
            chỉ khi bạn cung cấp thông tin đó một cách tự nguyện thông qua quá
            trình đặt phòng hoặc tạo tài khoản. Chúng tôi cam kết bảo vệ thông
            tin cá nhân của bạn và không chia sẻ thông tin này với bất kỳ bên
            thứ ba nào mà không có sự đồng ý của bạn.
            <br />
            2.2 An toàn thông tin Chúng tôi sử dụng biện pháp bảo mật công nghệ
            để bảo vệ thông tin cá nhân của bạn. Tuy nhiên, chúng tôi không thể
            đảm bảo an ninh tuyệt đối và không chịu trách nhiệm cho bất kỳ mất
            mát thông tin nào do sự không cố ý hoặc truy cập trái phép.
          </div>
          <Title level={4}>3. Chính sách hủy và hoàn tiền</Title>
          <div>
            3.1 Hủy đặt phòng Chính sách hủy đặt phòng được áp dụng theo từng
            homestay cụ thể và sẽ được hiển thị rõ trước khi bạn hoàn tất quá
            trình đặt phòng. Hãy kiểm tra và hiểu rõ chính sách hủy trước khi
            thực hiện đặt phòng. <br />
            3.2 Hoàn tiền Quy định về hoàn tiền cũng phụ thuộc vào chính sách
            của homestay cụ thể và sẽ được thông báo trong quá trình đặt phòng.
            Hãy đảm bảo bạn đã đọc và hiểu rõ các điều khoản về hoàn tiền.
          </div>
        </div>
      ),
    },
    {
      key: '4',
      label: (
        <div style={{ display: 'flex' }}>
          <RedoOutlined style={{ fontSize: 25 }} />
          <Title level={5} style={{ marginTop: 2 }}>
            Đổi mật khẩu
          </Title>
        </div>
      ),
      children: (
        <div>
          <Title level={3}>Đặt lại mật khẩu</Title>
          <form>
            <MDBInput
              wrapperClass='mb-4'
              label='Mật khẩu cũ'
              id='password'
              type='password'
              required
              onChange={(e) => setpassword(e.target.value)}
            />
            <MDBInput
              wrapperClass='mb-4'
              label='Mật khẩu mới'
              id='newpassword'
              type='password'
              required
              onChange={(e) => setnewpassword(e.target.value)}
            />
            <MDBInput
              wrapperClass='mb-4'
              label='Xác nhận mật khẩu'
              id='confirmpassword'
              type='password'
              required
              onChange={(e) => setconfirmpassword(e.target.value)}
            />
            <MDBBtn
              className='w-100 mb-4'
              size='md'
              style={{ marginTop: 10 }}
              onClick={handleSubmitchange}
            >
              Đổi mật khẩu
            </MDBBtn>
          </form>
        </div>
      ),
    },
    {
      key: '5',
      label: (
        <div style={{ display: 'flex' }}>
          <LogoutOutlined style={{ fontSize: 25 }} />
          <Title level={5} style={{ marginTop: 2 }}>
            Đăng xuất
          </Title>
        </div>
      ),
      children: (
        <button
          type='button'
          className='btn btn-primary'
          style={{ color: 'black' }}
          onClick={logout}
        >
          <LogoutOutlined /> Đăng xuất
        </button>
      ),
    },
  ]
  const handleTabChange = (key) => {
    setActiveTab(key)
  }
  const [tabPosition, setTabPosition] = useState('left')
  const activeItem = items.find((item) => item.key === activeTab)
  return (
    <section style={{ padding: '50px 270px 270px 270px', display: 'flex' }}>
      <div
        style={{
          width: '30%',
          height: '100%',
          border: '1px solid #b0b0b0',
          borderRadius: 8,
          padding: '10px 0px 10px 0px',
          backgroundColor: 'rgba(255,255,255,1.00)',
        }}
      >
        <div style={{ display: 'flex', padding: '0px 15px 0px 20px' }}>
          {userDetail?.data?.avataUrl == null ? (
            <Avatar size={64} icon={<UserOutlined />} />
          ) : (
            <Avatar size={64} src={<img src={userDetail?.data?.avataUrl} />} />
          )}

          <Title level={4} style={{ marginLeft: 20, marginTop: 20 }}>
            {namelocal}
          </Title>
        </div>
        <hr />
        <div style={{ display: 'flex', padding: '0px 0px 0px 20px' }}>
          <Tabs
            tabPosition={tabPosition}
            activeKey={activeTab}
            onChange={handleTabChange}
          >
            {items.map((item) => (
              <TabPane tab={item.label} key={item.key}>
                {item.content}
              </TabPane>
            ))}
          </Tabs>
        </div>
      </div>
      <div style={{ marginTop: '20px', marginLeft: 50, width: '100%' }}>
        <Title level={4}>Cài đặt</Title>
        {activeItem?.children}
      </div>
    </section>
  )
}
export default LoginDetail
