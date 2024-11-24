import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Button,
  Form,
  Image,
  Input,
  Modal,
  Rate,
  Row,
  Select,
  Space,
  Table,
  Typography,
  message,
} from 'antd'
import {
  CloseOutlined,
  CompassOutlined,
  DeleteOutlined,
  EyeOutlined,
  LoadingOutlined,
  RotateLeftOutlined,
  RotateRightOutlined,
  ShopOutlined,
  SwapOutlined,
  ZoomInOutlined,
  ZoomOutOutlined,
} from '@ant-design/icons'
import { useNavigate, useParams } from 'react-router-dom'
import moment from 'moment'
import dayjs from 'dayjs'
import { fetchBookingUserId } from '../../features/admin/adminThunk'
import { cancelBooking } from '../../features/product/productThunk'
import TextArea from 'antd/es/input/TextArea'
import * as Yup from 'yup'
import { MDBCardImage } from 'mdb-react-ui-kit'
import { addCommentByUser } from '../../features/owner_homestay/getbooking/commentThunk'

dayjs.locale('vi')
const { Title } = Typography
const { Search } = Input

const desc = ['Tệ', 'Không hài lòng', 'Bình thường', 'Hài lòng', 'Tuyệt vời']

export const BookingUser = () => {
  const navigate = useNavigate()

  const formatCurrency = (value) => {
    // Sử dụng Intl.NumberFormat để định dạng giá trị tiền tệ
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(value)
  }

  const { id } = useParams()
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchBookingUserId(id))
  }, [])
  const [isViewmodal, setIsviewmodal] = useState(false)
  const [isRefusalModal, setIsRefusalModal] = useState(false)
  const [isCommentModel, setIsCommentModel] = useState(false)
  const [node, setNode] = useState('')
  const [bookingDeatil, setBookingDeatil] = useState({})
  const [formErrors, setFormErrors] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [file, setFile] = useState([])
  const [selectedImages, setSelectedImages] = useState([])
  const [value, setValue] = useState(3)
  const [comment, setComment] = useState('')
  const [commentError, setCommentError] = useState('')
  const [commentErrorText, setCommentErrorText] = useState('')
  // const [Rate,setRate]=useState(5)
  const userDetail = JSON.parse(localStorage.getItem('userDetail'))
  const UserID = userDetail?.data.id

  const handleFileChange = (event) => {
    const files = event.target.files
    let selectedFile = event.target.files
    let fileList = [...selectedFile]
    const imagesArray = fileList.map((file) => ({
      name: file.name,
      url: URL.createObjectURL(file),
    }))

    setSelectedImages((prevImages) => [...prevImages, ...imagesArray])
    setFile(fileList)
    const filesArray = Array.from(files).map((file) => ({
      name: file.name,
      size: file.size,
      type: file.type,
    }))
  }

  const checkCancel = (booking) => {
    if (booking.status === 'HUY' || booking.status === 'DA_THUE_XONG') {
      return ''
    }
    const today = dayjs()
    const dateFix = new Date(today)
    dateFix.setHours('00')
    dateFix.setMinutes('00')
    dateFix.setSeconds('00')
    dateFix.setMilliseconds('000')
    const startDate = new Date(booking.startDate)
    startDate.setHours('00')
    startDate.setMinutes('00')
    startDate.setSeconds('00')
    startDate.setMilliseconds('000')
    const createdDate = new Date(booking.createdDate)
    createdDate.setHours('00')
    createdDate.setMinutes('00')
    createdDate.setSeconds('00')
    createdDate.setMilliseconds('000')
    if (booking.typeBooking === 'DAT_COC') {
      return 'Việc hủy phòng sẽ mất toàn bộ toàn bộ số tiền'
    }
    if (dayjs(createdDate).add(1, 'days') >= dayjs(startDate)) {
      return 'Việc hủy phòng sẽ mất toàn bộ toàn bộ số tiền'
    } else {
      if (dayjs(createdDate).add(1, 'days') >= dayjs(dateFix)) {
        return `Việc hủy phòng sẽ được miễn phí trước và trong ngày ${moment(
          dayjs(dateFix),
        )
          .add(1, 'day')
          .locale('vi')
          .format('LL')}`
      } else {
        return 'Việc hủy phòng sẽ mất toàn bộ toàn bộ số tiền'
      }
    }
  }
  const handleRemoveImage = (index) => {
    const newImages = [...selectedImages]
    file.splice(index, 1)
    newImages.splice(index, 1)
    setSelectedImages(newImages)
    // document.getElementById('image').value = null;
  }
  const showModalView = (booking) => {
    setBookingDeatil(booking)
    navigate(`/booking/homestay/detail/${booking.homestay.id}`)
  }
  const showModalComment = (booking) => {
    setBookingDeatil(booking)
    setIsCommentModel(true)
    setComment('')
    setFile([])
    setSelectedImages([])
  }
  const showRefusalView = (booking) => {
    if (userDetail.data.numberAccount === ""  || userDetail.data.numberAccount === undefined || userDetail.data.numberAccount === null) {
      message.info('Vui lòng cập nhật tài khoản ngân hàng của bạn tại "hồ sơ của tôi"!')
      return false
    }
    setBookingDeatil(booking)
    setIsRefusalModal(true)
  }
  const handleCancel = () => {
    setIsRefusalModal(false)
    setIsviewmodal(false)
    setIsCommentModel(false)
  }
  const calculateDate = (createdDate) => {
    return dayjs(createdDate).add(1, 'day')
  }
  /**
   * validate
   */

  const handleCancelBooking = async () => {
    if (!node || node.length <= 20) {
      setFormErrors('bạn cần nhập lý do từ chối và lý do nhiều hơn 20 ký tự')
    } else {
      setIsLoading(true)
      await message.info(
        'Đang tiến hành hủy bạn vui lòng đợi một vài giây nhé!',
        5,
      )
      await dispatch(cancelBooking(bookingDeatil.id, node))
      message.info('Hủy thành công', 5)
      setIsLoading(false)
      setIsRefusalModal(false)
      dispatch(fetchBookingUserId(id))
    }
  }
  /**
   *
   * @param {Comment} e
   */
  const handleComment = () => {
    setIsCommentModel(true)
  }
  const handleChangeNote = (e) => {
    setNode(e.target.value)
  }
  const addComment = async () => {
    if (!comment) {
      setCommentErrorText('Bạn cần nhập đánh giá')
    } else {
      setIsLoading(true)
      message.info(
        'Đang tiến hành đánh giá bạn vui lòng đợi một vài giây nhé!',
        5,
      )
      await dispatch(
        addCommentByUser(
          bookingDeatil.homestay.id,
          comment,
          UserID,
          file,
          value,
        ),
      )
      message.info('Đánh giá thành công!')
      setIsLoading(false)
      setIsCommentModel(false)
      setComment('')
      setFile([])
      setValue(3)
    }
  }

  const booking = useSelector((state) => state.admin.booking)

  return (
    <div
      className='site-layout'
      style={{
        padding: '0 100px',
        marginTop: '30px',
        color: 'black',
      }}
    >
      <div
        style={{
          paddingRight: 100,
          paddingBottom: 50,
          paddingLeft: 100,
          minHeight: 380,
        }}
      >
        <div style={{ marginTop: '30px' }}>
          <Title level={2}>Homestay bạn đã và đang thuê</Title>
          <Title level={4}>Danh mục</Title>
          {booking.length === 0 ? (
            <div style={{ textAlign: 'center', marginTop: 20 }}>
              Bạn chưa thuê homestay nào.
            </div>
          ) : (
            booking.map((booking) => {
              const averagePoint =
                booking.homestay.comment.reduce(
                  (sum, comment) => sum + comment.point,
                  0,
                ) / booking.homestay.comment.length
              const currentDate = new Date().getTime()
              const startDate = booking?.startDate?.valueOf()
              const endDate = booking?.endDate?.valueOf()
              const isCancelled = booking.status === 'HUY'
              const isPastEndDate = currentDate > endDate + 1
              // Check if the comment user id is different from UserID
              // const canComment = booking.homestay.comment.every(comment => (
              //   comment.user.id !== UserID && currentDate > endDate + 1
              // ));
              const canComment = currentDate > endDate + 1
              return (
                <div
                  style={{
                    width: '100%',
                    height: 210,
                    backgroundColor: '#ffffff',
                    borderRadius: 8,
                    boxShadow: '0 0 3px 1px #ACAEB1',
                    marginTop: 20,
                    padding: '2px 2px 2px 2px',
                    display: 'flex',
                  }}
                >
                  <div style={{ width: '30%' }}>
                    <img
                      src={booking.homestay.images[0]?.imgUrl}
                      style={{ borderRadius: 8, height: 150, width: 255 }}
                    />
                    <div style={{ marginTop: 8, display: 'flex' }}>
                      <img
                        src={booking.homestay.images[1]?.imgUrl}
                        style={{
                          borderRadius: 8,
                          height: 48,
                          marginRight: 6,
                          width: 80,
                        }}
                      />
                      <img
                        src={booking.homestay.images[2]?.imgUrl}
                        style={{
                          borderRadius: 8,
                          height: 48,
                          marginRight: 6,
                          width: 80,
                        }}
                      />
                      <img
                        src={booking.homestay.images[3]?.imgUrl}
                        style={{
                          borderRadius: 8,
                          height: 48,
                          marginRight: 6,
                          width: 80,
                        }}
                      />
                    </div>
                  </div>
                  <div style={{ width: '50%', marginRight: 50 }}>
                    <h1
                      style={{
                        fontSize: 18,
                        marginTop: 10,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        width: 250,
                      }}
                    >
                      {booking.homestay?.name}
                    </h1>
                    <Rate
                      allowHalf
                      disabled
                      defaultValue={averagePoint}
                      size='sm'
                    />
                    <br />
                    <div style={{ display: 'flex', marginTop: 10 }}>
                      <Title
                        style={{
                          fontSize: 16,
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          width: 250,
                          marginTop: 3,
                        }}
                      >
                        Đia chỉ : {booking.homestay?.address}
                      </Title>
                    </div>
                    <h1
                      style={{
                        width: '100%',
                        height: 20,
                        backgroundColor: 'rgb(242, 243, 243)',
                        borderRadius: 8,
                        fontSize: 14,
                        padding: '0 2px 0 2px',
                      }}
                    >
                      Ngày nhận phòng :{' '}
                      {moment(booking?.startDate).locale('vi').format('LL')}
                    </h1>
                    <h1
                      style={{
                        width: '100%',
                        height: 20,
                        backgroundColor: 'rgb(242, 243, 243)',
                        borderRadius: 8,
                        fontSize: 14,
                        padding: '0 2px 0 2px',
                      }}
                    >
                      Ngày trả phòng :{' '}
                      {moment(booking?.endDate).locale('vi').format('LL')}{' '}
                      <br />
                    </h1>
                  </div>
                  <div
                    style={{
                      marginLeft: 10,
                      borderLeft: '1px solid #ACAEB1',
                      padding: '8px 8px 2px 15px',
                      width: '25%',
                    }}
                  >
                    <div style={{ display: 'flex' }}>
                      {booking.status === 'HUY' ? (
                        <div style={{ color: 'red' }}>Homestay đã hủy</div>
                      ) : (
                        <div style={{ color: 'green' }}>Đã thanh toán</div>
                      )}
                    </div>
                    <div>
                      <div style={{ fontSize: 22, color: 'rgb(231, 9, 14)' }}>
                        {formatCurrency(booking.totalPrice)}
                      </div>
                      <div style={{ fontSize: 22 }}>
                        {isCancelled ? (
                          ''
                        ) : (
                          <React.Fragment>
                            {!isPastEndDate && (
                              <Button
                                style={{
                                  backgroundColor: 'rgb(231, 9, 14)',
                                  color: 'white',
                                  width: 180,
                                }}
                                onClick={() => showRefusalView(booking)}
                              >
                                Hủy homestay
                              </Button>
                            )}
                            {canComment && (
                              <Button
                                style={{
                                  backgroundColor: '#eda500',
                                  color: 'white',
                                  width: 180,
                                }}
                                onClick={() => showModalComment(booking)}
                              >
                                Đánh giá homestay
                              </Button>
                            )}
                          </React.Fragment>
                        )}
                        <Button
                          style={{
                            backgroundColor: 'green',
                            color: 'white',
                            width: 180,
                          }}
                          onClick={() => showModalView(booking)}
                        >
                          Xem chi tiết homestay
                        </Button>
                        <div style={{ fontSize: '14px' }}>
                          {checkCancel(booking)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </div>

      <Modal
        title='Hủy Homestay'
        open={isRefusalModal}
        onOk={() => handleCancelBooking()}
        onCancel={() => handleCancel()}
        maskClosable={false}
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
        <Form>
          <Form.Item
            label='Lý do hủy'
            name='node'
            validateStatus={formErrors ? 'error' : ''}
            help={formErrors}
          >
            <TextArea onChange={(data) => handleChangeNote(data)} />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title='Đánh giá homestay'
        open={isCommentModel}
        onOk={() => addComment()}
        onCancel={() => handleCancel()}
        okText='Thêm đánh giá'
        maskClosable={false}
        width={900}
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
        <Form>
          <div>
            <div style={{ display: 'flex', marginBottom: 20 }}>
              <MDBCardImage
                style={{ width: 60 }}
                src={bookingDeatil.homestay?.images[0].imgUrl}
                position='top'
                alt='...'
              />
              <Title level={5}>&emsp;{bookingDeatil.homestay?.name}</Title>
            </div>
          </div>
          <hr />
          <Form.Item
            label='Đánh giá'
            name='comment'
            validateStatus={commentErrorText ? 'error' : ''}
            help={commentErrorText}
          >
            <TextArea
              onChange={(e) => setComment(e.target.value)}
              value={comment}
            />
          </Form.Item>
          <div style={{ marginTop: 20 }}>
            <Space>
              <div>Chất lượng homestay</div>
              <Rate tooltips={desc} onChange={setValue} value={value} />
              {value ? <span>{desc[value - 1]}</span> : ''}
            </Space>
            <br />
            <br />
            <div style={{ display: 'flex' }}>
              <label htmlFor='image' style={{ marginTop: 5 }}>
                Tải các hình ảnh mà bạn được trải nghiệm ở homestay{' '}
              </label>
              &ensp;
              <label
                htmlFor='image'
                style={{
                  cursor: 'pointer',
                  border: '1px solid black',
                  borderRadius: 8,
                  padding: '6px 15px 6px 15px',
                }}
              >
                Chọn tệp
              </label>
              <input
                type='file'
                id='image'
                multiple
                accept='image/*'
                onChange={handleFileChange}
                style={{ display: 'none' }}
              />
              <div style={{ marginLeft: 8, marginTop: 5 }}>
                Đã có {selectedImages.length} file được chọn
              </div>
            </div>
            <div style={{ color: 'red' }}>{commentError}</div>
          </div>
          <div>
            {selectedImages.map((image, index) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  marginTop: 10,
                  border: '1px solid black',
                  borderRadius: 8,
                  width: '100%',
                  height: 100,
                  padding: 5,
                }}
              >
                <img
                  src={image.url}
                  alt={`selected-${index}`}
                  style={{ border: '1px solid white', borderRadius: 8 }}
                />
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: 30,
                  }}
                >{`File Name: ${image.name}`}</div>
                <div
                  style={{
                    marginLeft: 'auto',
                    display: 'flex',
                    justifyContent: 'center',
                    marginRight: 20,
                    marginTop: 30,
                  }}
                >
                  <DeleteOutlined onClick={() => handleRemoveImage(index)} />
                </div>
              </div>
            ))}
          </div>
        </Form>
      </Modal>
    </div>
  )
}
