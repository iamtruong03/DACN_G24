import React, { useEffect } from 'react'
import {
  Space,
  Typography,
  Button,
  Table,
  Popconfirm,
  Modal,
  Form,
  Input,
  Row,
  Col,
  message,
  Image,
  TimePicker,
  Upload,
  InputNumber,
  Skeleton,
} from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import {
  QuestionCircleOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  DownloadOutlined,
  SwapOutlined,
  RotateLeftOutlined,
  RotateRightOutlined,
  ZoomOutOutlined,
  ZoomInOutlined,
  ReloadOutlined,
  LoadingOutlined,
  UploadOutlined,
  CloseOutlined,
} from '@ant-design/icons'
import { useState } from 'react'
import {
  EditHomestay,
  UpdateStatus,
  UpdateStatusToUpdating,
  addHomestay,
  fetchHomestay,
} from '../../../features/owner_homestay/homestayThunk'
import { fetchConvenient } from '../../../features/owner_homestay/convenientThunk'
import { Checkbox, DatePicker, Select } from 'antd'
import moment from 'moment'
import 'moment/locale/vi'
import { fetchProvince } from '../../../features/owner_homestay/region/provinceThunk'
import axios from 'axios'
import * as Yup from 'yup'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import {
  addImgUpload,
  deleteImg,
  fetchBaseImg,
} from '../../../features/owner_homestay/getbooking/bookingThunk'
dayjs.extend(customParseFormat)
const { RangePicker } = DatePicker
const { TextArea } = Input
const { Option } = Select
const { Title } = Typography

const HomeStayProduct = () => {
  const [checkedValues, setCheckedValues] = useState([])
  const formatCurrency = (value) => {
    // Sử dụng Intl.NumberFormat để định dạng giá trị tiền tệ
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(value)
  }

  const handleButtonClick = () => {
    setCheckedValues([])
  }

  const handleChange = (values) => {
    setCheckedValues(values)
  }
  const [cities, setCities] = useState([])
  const [selectedCity, setSelectedCity] = useState('')
  const [districts, setDistricts] = useState([])
  const [selectedDistrict, setSelectedDistrict] = useState('')
  const [wards, setWards] = useState([])
  const [selectedWard, setSelectedWard] = useState('')
  const [valueselect, setValueSelect] = useState('')
  const [isLoadingImg, setIsLoadingImg] = useState(false)
  const dateFormat = 'YYYY/MM/DD'
  const isBeforeToday = (current) => {
    return current && current.isBefore(moment().startOf('day'))
  }
  const disabledEndDate = (current) => {
    // Kiểm tra xem ngày hiện tại có trước ngày bắt đầu không
    if (current < startDate) {
      return true
    }
    return false // Bỏ điều kiện không cho chọn ngày lớn hơn ngày hiện tại
  }
  const handlePriceChange = (value) => {
    // You can perform any additional formatting or validation here
    setprice(value)
  }
  const handlePriceChangeWeb = (value) => {
    // You can perform any additional formatting or validation here
    setprice((value * 100) / 111)
  }
  useEffect(() => {
    dispatch(fetchHomestay(valueselect))
    dispatch(fetchConvenient())
    // dispatch(fetchProvince());
  }, [valueselect])
  const dispatch = useDispatch()
  const products = useSelector((state) => state.ownerHomestay.homestays)
  const convenients = useSelector((state) => state.convenient.convenients)
  const imghomestay = useSelector((state) => state.booking.imguploads)

  const onChangeConvenients = (checkedValues) => {
    setconvenient(checkedValues.join(','))
    setCheckedValues(checkedValues)
    setCheckedList(checkedValues)
  }

  const [file, setFile] = useState([])
  const [selectedImages, setSelectedImages] = useState([])
  const [idHomestay, setIdHomestay] = useState('')

  const handleFileChange = async (event) => {
    const files = event.target.files
    let selectedFile = event.target.files
    let fileList = [...selectedFile]

    const imagesArray = fileList.map((file) => ({
      name: file.name,
      url: URL.createObjectURL(file),
    }))

    setSelectedImages((prevImages) => [...prevImages, ...imagesArray])

    // Use the callback function to ensure the most up-to-date state
    setFile((prevFileList) => [...prevFileList, ...fileList])

    const filesArray = Array.from(files).map((file) => ({
      name: file.name,
      size: file.size,
      type: file.type,
    }))

    if (!isAddFrom) {
      setIsLoadingImg(true)
      message.info(
        'Đang tiến hành tải ảnh lên máy chủ bạn vui lòng đợi một vài giây nhé!',
        5,
      )

      await dispatch(addImgUpload(idHomestay, fileList))
      dispatch(fetchBaseImg(idHomestay))
      setIsLoadingImg(false)
    }
  }

  const handleRemoveImage = (index) => {
    const newImages = [...selectedImages]
    file.splice(index, 1)
    newImages.splice(index, 1)
    setSelectedImages(newImages)
    // document.getElementById('image').value = null;
  }

  // const handleFileChange = (e) => {
  //   console.log(e)
  //   // let selectedFile = e.target.files;
  //   // let fileList = [...selectedFile];
  //   // setFile(fileList);
  // };
  //modal
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isViewmodal, setIsviewmodal] = useState(false)
  const [isAddFrom, setIsAddForm] = useState(true)
  const showModalView = (record) => {
    setIsviewmodal(true)
    setname(record.name)
    setdesc(record.desc)
    setprice(record.price)
    setnumberPerson(record.numberPerson)
    setaddressView(record.address)
    setprice(record.price)
    setstartDate(record.startDate)
    setendDate(record.endDate)
    setIamge(record.images)
    settimeCheckIn(record.timeCheckIn)
    settimeCheckOut(record.timeCheckOut)
    setviewEditConvennient(record.detailHomestays)
    setcancellationPolicy(record.cancellationPolicy)
    setacreage(record.acreage)
    setroomNumber(record.roomNumber)
  }

  const showModal = () => {
    setIsModalOpen(true)
    setIsAddForm(true)
    setname('')
    setdesc('')
    setprice(null)
    setnumberPerson(null)
    // setaddress('')
    setprice(null)
    setcancellationPolicy(0)
    setacreage(0)
    setroomNumber(0)
    setstartDate(null)
    setendDate(null)
    settimeCheckIn(null)
    settimeCheckOut(null)
    setSelectedCity('')
    setSelectedDistrict('')
    setSelectedWard('')
    setCheckedValues([])
    setFile([])
    setAddressDetail('')
    setviewEditConvennient([])
    setconvenient('')
    const fileInput = document.getElementById('image')
    if (fileInput) {
      fileInput.value = null
    }
    setSelectedImages([])
  }
  const handleOk = () => {
    setIsModalOpen(false)
  }
  const handleCancel = () => {
    setIsModalOpen(false)
    setIsviewmodal(false)
  }
  const columns = [
    {
      title: 'Tên homestay',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Địa chỉ homestay',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Giá thuê homestay 1 đêm',
      dataIndex: 'price',
      key: 'price',
      align: 'center',
      render(str) {
        return formatCurrency(str)
      },
    },
    {
      title: 'Trạng thái của homestay',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      render(str) {
        if (str === 'CHO_DUYET') {
          return 'Chờ duyệt'
        } else if (str === 'HOAT_DONG') {
          return 'Hoạt động'
        } else {
          return 'Ngừng hoạt động'
        }
      },
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_, record) => (
        <Space size='middle'>
          <a onClick={() => showModalView(record)}>
            <EyeOutlined />
          </a>
          {record.status !== 'HOAT_DONG' && (
            <a onClick={() => handleEditRow(record)}>
              <EditOutlined />
            </a>
          )}
          {record.status === 'HOAT_DONG' && (
            <Popconfirm
              title='Cập nhật mục này'
              description='Bạn chắc chắn muốn cập nhật homestay thành không hoạt động không?'
              icon={<ReloadOutlined />}
              cancelText='Hủy'
              okText='Cập nhật'
              onConfirm={() => handleSubmitStatus(record)}
            >
              <a>
                <ReloadOutlined />
              </a>
            </Popconfirm>
          )}
          {record.status === 'KHONG_HOAT_DONG' && (
            <Popconfirm
              title='Cập nhật mục này'
              description='Bạn chắc chắn muốn cập nhật homestay thành chờ duyệt không?'
              icon={<ReloadOutlined />}
              cancelText='Hủy'
              okText='Cập nhật'
              onConfirm={() => handleSubmitStatusToUpdating(record)}
            >
              <a>
                <ReloadOutlined />
              </a>
            </Popconfirm>
          )}
        </Space>
      ),
    },
  ]

  //

  //
  const [viewEditConvennient, setviewEditConvennient] = useState([])
  const [convenientvir, setconvenient] = useState('')
  const [name, setname] = useState('')
  const [formErrors, setFormErrors] = useState({})
  const [acreage, setacreage] = useState(0)
  const [roomNumber, setroomNumber] = useState(0)
  const [cancellationPolicy, setcancellationPolicy] = useState(0)
  const [timeCheckIn, settimeCheckIn] = useState(null)
  const [addressDetail, setAddressDetail] = useState('')

  const listFilter = [
    {
      name: 'Tất cả',
      value: '',
    },
    {
      name: 'Chờ duyệt',
      value: 1,
    },
    {
      name: 'Hoạt động',
      value: 0,
    },
    {
      name: 'Không hoạt động',
      value: 2,
    },
  ]
  const hanhdleSelect = (selectedValue) => {
    setValueSelect(selectedValue) // You can access the selected value here
  }

  const handleTimeChangestart = (time, timeString) => {
    settimeCheckIn(timeString)
  }
  const [timeCheckOut, settimeCheckOut] = useState(null)
  const handleTimeChangeend = (time, timeString) => {
    settimeCheckOut(timeString)
  }
  const [startDate, setstartDate] = useState(null)
  const handleDateChangestart = (dates) => {
    const dateFix = new Date(dates)
    dateFix.setHours('00')
    dateFix.setMinutes('00')
    dateFix.setSeconds('00')
    dateFix.setMilliseconds('000')
    setstartDate(dateFix.valueOf())
  }
  const [endDate, setendDate] = useState(null)
  const handleDateChangeend = (dates) => {
    // setendDate(moment(dates).valueOf());
    const dateFix = new Date(dates)
    dateFix.setHours('00')
    dateFix.setMinutes('00')
    dateFix.setSeconds('00')
    dateFix.setMilliseconds('000')
    setendDate(dateFix.valueOf())
  }
  const [desc, setdesc] = useState('')
  const [price, setprice] = useState(0)
  const [numberPerson, setnumberPerson] = useState(0)
  const [totalBathroom, setTotalBathroom] = useState(0)
  const [totalbedroom, setTotalbedroom] = useState(0)
  const [address, setaddress] = useState('')
  const [sumDesc, setSumdesc] = useState('')
  const [addressView, setaddressView] = useState('')
  const updateAddress = () => {
    const selectedCityName =
      cities.find((city) => city.Id === selectedCity)?.Name || ''
    const selectedDistrictName =
      districts.find((district) => district.Id === selectedDistrict)?.Name || ''
    const selectedWardName =
      wards.find((ward) => ward.Id === selectedWard)?.Name || ''

    const newAddress = `${addressDetail}, ${selectedWardName}, ${selectedDistrictName}, ${selectedCityName}`
    setaddress(newAddress)
  }
  // Use useEffect to call updateAddress whenever the selectedCity, selectedDistrict, or selectedWard changes
  const updateDesc = () => {
    const newDesc = `Có ${totalBathroom} phòng tắm, có ${totalbedroom} phòng ngủ, ${desc}`
    setSumdesc(newDesc)
  }

  useEffect(() => {
    updateDesc()
  }, [totalBathroom, totalbedroom, desc])

  useEffect(() => {
    updateAddress()
  }, [selectedCity, selectedDistrict, selectedWard, addressDetail])

  const [isLoading, setIsLoading] = useState(false)

  const [recordid, setRecordid] = useState('')
  const [image, setIamge] = useState([])
  //getuserid
  const userDetail = JSON.parse(localStorage.getItem('ownerDetail'))
  const UserID = userDetail?.data.id
  //
  const parsedAcreage = parseFloat(acreage).toFixed(2)
  const homestay = {
    name: name,
    timeCheckIn: timeCheckIn,
    timeCheckOut: timeCheckOut,
    // cancellationPolicy: parseFloat(cancellationPolicy),
    startDate: startDate?.valueOf(),
    endDate: endDate?.valueOf(),
    desc: sumDesc,
    price: parseFloat(price),
    numberPerson: parseInt(numberPerson),
    address: address,
    acreage: Number(parsedAcreage),
    ownerHomestay: UserID,
    roomNumber: parseInt(roomNumber),
    phonenumber: userDetail?.data.phoneNumber,
    email: userDetail?.data.email,
  }
  //validateform
  const [errorFile, setErrorFile] = useState('')
  const [erorrAddress, setErrorAddress] = useState('')
  const [erorrDesc, setErorrDesc] = useState('')
  const [erorrDescDetail, setErorrDescDetail] = useState('')
  const [erorrBedRoom, setErorrBedRoom] = useState('')
  const [erorrBathRoom, setErorrBathRoom] = useState('')
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .trim() // Remove leading and trailing whitespaces
      .min(1, 'Vui lòng nhập ít nhất một ký tự cho tên homestay')
      .required('Vui lòng nhập tên homestay'),
    price: Yup.number()
      .required('Vui lòng nhập giá homestay')
      .typeError('Vui lòng nhập giá homestay')
      .positive('Giá phải là số dương')
      .min(1000, 'Giá homestay phải lớn hơn 1000'),
    file: Yup.array()
      .min(5, 'Vui lòng chọn ít nhất 5 file')
      .max(20, 'Vui lòng chọn tối đa 20 file')
      .test('fileSize', 'File phải nhỏ hơn hoặc bằng 5MB', (value) => {
        if (!value) return true // Allow empty array
        const maxSize = 5 * 1024 * 1024 // 5MB
        return value.every((file) => file.size <= maxSize)
      }),
    numberPerson: Yup.number()
      .required('Vui lòng nhập số lượng người')
      .typeError('Vui lòng nhập số lượng người')
      .positive('Số lượng người phải là số dương'),
    address: Yup.string()
      .transform((value) => (value ? value.replace(/,/g, '') : value))
      .test('notEmpty', 'Vui lòng chọn đầy đủ địa chỉ của bạn', (value) => {
        return value && value.trim().length > 0
      }),
    timeCheckIn: Yup.string().required('Vui lòng chọn thời gian nhận phòng'),
    timeCheckOut: Yup.string().required('Vui lòng chọn thời gian trả phòng'),
    roomNumber: Yup.number()
      .required('Vui lòng nhập số phòng')
      .typeError('Vui lòng nhập số phòng')
      .positive('Số lượng phòng phải lớn hơn 0'),
    // province: Yup.string().required('Vui lòng chọn thành phố homestay'),
    startDate: Yup.number().required('Vui lòng chọn ngày bắt đầu'),
    endDate: Yup.number()
      .typeError('Vui lòng chọn ngày kết thúc')
      .required('Vui lòng chọn ngày kết thúc')
      .test(
        'endDate',
        'Ngày kết thúc phải lớn hơn ngày bắt đầu',
        function (value) {
          const { startDate } = this.parent

          // Kiểm tra nếu giá trị là số (datelong)
          if (typeof value === 'number') {
            return value > startDate
          }

          return false // Trả về false nếu không phải là số
        },
      ),
    acreage: Yup.number()
      .required('Vui lòng nhập diện tích')
      .typeError('Vui lòng nhập diện tích')
      .positive('Diện tích phòng phải lớn hơn 0'),
  })
  const handleSubmitStatus = async (record) => {
    await message.info(
      'Đang tiến hành sửa trạng thái bạn vui lòng đợi một vài giây nhé!',
    )
    await dispatch(UpdateStatus(record.id))
    dispatch(fetchHomestay(''))
  }
  /**
   *
   * @param {delete img} index
   */
  const handleDeleteImage = async (id, index) => {
    await dispatch(deleteImg(id))
    dispatch(fetchBaseImg(idHomestay))
    message.info('Xóa ảnh thành công!')
  }
  const handleSubmitStatusToUpdating = async (record) => {
    await message.info(
      'Đang tiến hành sửa trạng thái bạn vui lòng đợi một vài giây nhé!',
    )
    await dispatch(UpdateStatusToUpdating(record.id))
    dispatch(fetchHomestay(''))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await validationSchema.validate(homestay, { abortEarly: false })
      if (isAddFrom) {
        // File validation only when isAddFrom is false
        if (file.length < 5) {
          setErrorFile('Vui lòng chọn ít nhất 5 file')
          throw new Yup.ValidationError(
            'Vui lòng chọn ít nhất 5 file',
            file,
            'file',
          )
        }
        if (file.length >= 20) {
          setErrorFile('Vui lòng chọn dưới 20 file')
          throw new Yup.ValidationError(
            'Vui lòng chọn ít nhất 5 file',
            file,
            'file',
          )
        }
        const maxSize = 10 * 1024 * 1024 // 5MB
        if (!file.every((file) => file.size <= maxSize)) {
          setErrorFile('File phải nhỏ hơn hoặc bằng 5MB')
          throw new Yup.ValidationError(
            'File phải nhỏ hơn hoặc bằng 5MB',
            file,
            'file',
          )
        }
      }
      if (addressDetail == '') {
        setErrorAddress('Vui lòng nhập địa chỉ hoặc chọn địa chỉ')
        throw new Error('Vui lòng nhập địa chỉ hoặc chọn địa chỉ')
      }

      if (!totalBathroom || isNaN(totalBathroom) || totalBathroom <= 0) {
        setErorrBathRoom('Vui lòng nhập số phòng tắm hợp lệ (lớn hơn 0)')
        throw new Error('Vui lòng nhập số phòng tắm hợp lệ (lớn hơn 0)')
      }

      // Tiếp tục kiểm tra totalBedroom
      if (!totalbedroom || isNaN(totalbedroom) || totalbedroom <= 0) {
        setErorrBedRoom('Vui lòng nhập số phòng ngủ hợp lệ (lớn hơn 0)')
        throw new Error('Vui lòng nhập số phòng ngủ hợp lệ (lớn hơn 0)')
      }
      if (desc == '') {
        setErorrDescDetail('Vui lòng nhập mô tả')
        throw new Error('Vui lòng nhập mô tả')
      }
      if (isAddFrom) {
        setIsLoading(true)
        message.info(
          'Đang tiến hành thêm bạn vui lòng đợi một vài giây nhé!',
          10,
        )
        await dispatch(addHomestay(homestay, file, convenientvir))
        message.info('Thêm thành công')
        await setIsLoading(false)
        await setIsModalOpen(false)
        setname('')
        setprice(0)
        setdesc('')
        setnumberPerson(0)
        setcancellationPolicy(0)
        setnumberPerson(0)
        setacreage(0)
        setFile([])
        setstartDate(null)
        setendDate(null)
        settimeCheckIn(null)
        settimeCheckOut(null)
        setSelectedCity('')
        setSelectedDistrict('')
        setSelectedWard('')
        setAddressDetail('')
        setTotalBathroom(0)
        setTotalbedroom(0)
      } else {
        setIsLoading(true)
        await message.info(
          'Đang tiến hành sửa bạn vui lòng đợi một vài giây nhé!',
          10,
        )
        await dispatch(EditHomestay(homestay, file, recordid, convenientvir))
        await setIsLoading(false)
        await setIsModalOpen(false)
        message.info('Sửa thành công')
      }
      dispatch(fetchHomestay(''))
      setFormErrors({})
      setErrorFile('')
      setErrorAddress('')
      setErorrBathRoom('')
      setErorrBedRoom('')
      setTotalBathroom(0)
      setTotalbedroom(0)
    } catch (errors) {
      const errorObject = {}
      errors.inner?.forEach((error) => {
        errorObject[error.path] = error.message
      })
      setFormErrors(errorObject)
      setIsLoading(false)
    }
  }

  const handleEditRow = (record) => {
    dispatch(fetchBaseImg(record.id))
    setIsModalOpen(true)
    setIsAddForm(false)
    setRecordid(record.id)
    setIdHomestay(record.id)
    setname(record.name)
    setdesc(record.desc)
    setprice(record.price)
    setnumberPerson(record.numberPerson)
    setaddress(record.address)
    setprice(record.price)
    setstartDate(record.startDate)
    setendDate(record.endDate)
    setIamge(record.images)
    setcancellationPolicy(record.cancellationPolicy)
    setroomNumber(record.numberPerson)
    setacreage(record.acreage)
    settimeCheckIn(record.timeCheckIn)
    settimeCheckOut(record.timeCheckOut)
    setconvenient(
      record.detailHomestays?.map((items) => items.convenientHomestay.id),
    )

    setFile([])
    setviewEditConvennient(record.detailHomestays)
    const fileInput = document.getElementById('image')
    if (fileInput) {
      fileInput.value = null
    }
    setSelectedImages([])
    //
    setFormErrors({})

    const detailDesc = record.desc.split(',')
    setdesc(record.desc.substring(record.desc.indexOf('ủ') + 3))
    const bathroom = detailDesc[0]
    const bedroom = detailDesc[1]
    setTotalBathroom(bathroom.substring(bathroom.indexOf('ó') + 2, bathroom.indexOf('p') - 1))
    setTotalbedroom(bedroom.substring(bedroom.indexOf('ó') + 2, bedroom.indexOf('p') - 1))

    const addressParts = record.address.split(', ')
    const selectedWardName = addressParts[1] // Lấy tên phường/xã từ địa chỉ
    const selectedDistrictName = addressParts[2] // Lấy tên quận/huyện từ địa chỉ
    const selectedCityName = addressParts[3]
    setAddressDetail(addressParts[0])
    const selectedCityData = cities.find(
      (city) => city.Name === selectedCityName,
    )
    if (selectedCityData) {
      setSelectedCity(selectedCityData.Id)
    }

    if (selectedCityData && selectedDistrictName) {
      const selectedDistrictData = selectedCityData.Districts.find(
        (district) => district.Name === selectedDistrictName,
      )
      if (selectedDistrictData) {
        setDistricts(selectedCityData.Districts)
        setSelectedDistrict(selectedDistrictData.Id)
      }
    }

    if (selectedDistrictName && selectedWardName) {
      const selectedDistrictData = districts.find(
        (district) => district.Name === selectedDistrictName,
      )
      if (selectedDistrictData) {
        setWards(selectedDistrictData.Wards)
        const selectedWardData = selectedDistrictData.Wards.find(
          (ward) => ward.Name === selectedWardName,
        )
        if (selectedWardData) {
          setSelectedWard(selectedWardData.Id)
        }
      }
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json',
        )
        setCities(response.data)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    if (selectedCity) {
      const selectedCityData = cities.find((city) => city.Id === selectedCity)
      if (selectedCityData) {
        setDistricts(selectedCityData.Districts)
      }
    }
  }, [selectedCity, cities])

  useEffect(() => {
    if (selectedDistrict) {
      const selectedDistrictData = districts.find(
        (district) => district.Id === selectedDistrict,
      )
      if (selectedDistrictData) {
        setWards(selectedDistrictData.Wards)
      }
    }
  }, [selectedDistrict, districts])
  const [checkedList, setCheckedList] = useState(null)
  useEffect(() => {
    setCheckedList(
      viewEditConvennient?.map((item) => item.convenientHomestay?.id),
    )
  }, [viewEditConvennient])
  const [fileList, setFileList] = useState([])
  const [uploading, setUploading] = useState(false)
  const handleUpload = () => {
    const formData = new FormData()
    fileList.forEach((file) => {
      formData.append('files[]', file)
    })
    setUploading(true)
    // You can use any AJAX library you like
    fetch('https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188', {
      method: 'POST',
      body: formData,
    })
      .then((res) => res.json())
      .then(() => {
        setFileList([])
        message.success('Upload successfully.')
      })
      .catch(() => {
        message.error('Upload failed.')
      })
      .finally(() => {
        setUploading(false)
      })
  }

  return (
    <>
      <Title style={{ marginTop: '20px' }}>Quản lý Homestay</Title>
      <div style={{ marginBottom: 20, float: 'right', display: 'flex' }}>
        <Form.Item label='Trạng thái'>
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
        <Button style={{ marginLeft: 20 }} type='primary' onClick={showModal}>
          Thêm mới Homestay
        </Button>
      </div>
      <Modal
        title={
          isAddFrom == true ? (
            <div style={{ fontSize: 24 }}>Thêm homestay </div>
          ) : (
            <div style={{ fontSize: 24 }}>Sửa homestay</div>
          )
        }
        open={isModalOpen}
        onCancel={handleCancel}
        width={1100}
        okText={isAddFrom == true ? 'Thêm homestay' : 'Sửa homestay'}
        cancelText='Hủy'
        onOk={handleSubmit}
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
        <Form
          name='basic'
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 24,
          }}
          style={{
            maxWidth: 1100,
          }}
          initialValues={{
            remember: true,
          }}
          autoComplete='off'
        >
          <Row gutter={24} style={{ marginLeft: 1 }}>
            {/* Trường thứ nhất */}
            <Col span={12}>
              <Form.Item
                label={
                  <Title level={5} style={{ marginTop: 5 }}>
                    Tên homestay
                  </Title>
                }
                validateStatus={formErrors.name ? 'error' : ''} // Hiển thị lỗi cho trường name nếu có
                help={formErrors.name} // Hiển thị thông báo lỗi cho trường name nếu có
              >
                <Input value={name} onChange={(e) => setname(e.target.value)} />
              </Form.Item>
            </Col>
            {/* Trường thứ hai */}
            <Col span={12}>
              <Form.Item
                label={
                  <Title level={5} style={{ marginTop: 5 }}>
                    Giá homestay
                  </Title>
                }
                validateStatus={formErrors.price ? 'error' : ''}
                help={formErrors.price}
              >
                <InputNumber
                  style={{ width: 335 }}
                  value={price}
                  onChange={handlePriceChange}
                  formatter={(value) =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
                  }
                  parser={(value) => {
                    // Remove non-numeric characters and parse as a float
                    const numericValue = parseFloat(value.replace(/\D/g, ''))
                    return isNaN(numericValue) ? null : numericValue
                  }}
                  addonAfter='VNĐ'
                />
              </Form.Item>
              {price !== null && (
                <span style={{ marginLeft: 60 }}>
                  Giá thực tế được đăng trên website{' '}
                  {formatCurrency(price + (price * 11) / 100)}
                  <br />
                </span>
              )}
            </Col>
          </Row>

          <Row gutter={24} style={{ marginLeft: 3 }}>
            <Col span={12}>
              <Form.Item
                label={
                  <Title level={5} style={{ marginTop: 5 }}>
                    Số người ở
                  </Title>
                }
                validateStatus={formErrors.numberPerson ? 'error' : ''}
                help={formErrors.numberPerson}
              >
                <Input
                  value={numberPerson}
                  onChange={(e) => setnumberPerson(e.target.value)}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label={
                  <Title level={5} style={{ marginTop: 5 }}>
                    Diện tích
                  </Title>
                }
                validateStatus={formErrors.acreage ? 'error' : ''}
                help={formErrors.acreage}
              >
                <Input
                  value={acreage}
                  onChange={(e) => setacreage(e.target.value)}
                  addonAfter='m2'
                  defaultValue='0.0'
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24} style={{ marginLeft: 4 }}>
            <Col span={12}>
              <Form.Item
                label={
                  <Title level={5} style={{ marginTop: 5 }}>
                    Ngày bắt đầu
                  </Title>
                }
              >
                <DatePicker
                  onChange={handleDateChangestart}
                  style={{ width: '100%' }}
                  value={
                    startDate
                      ? dayjs(
                          dayjs(startDate).locale('vi').format('YYYY-MM-DD'),
                          'YYYY-MM-DD',
                        )
                      : null
                  }
                  disabledDate={isBeforeToday}
                  allowClear={true}
                />
                <div style={{ color: 'red' }}>{formErrors.startDate}</div>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label={
                  <Title level={5} style={{ marginTop: 5 }}>
                    Ngày kết thúc
                  </Title>
                }
              >
                <DatePicker
                  onChange={handleDateChangeend}
                  style={{ width: '100%' }}
                  value={
                    endDate
                      ? dayjs(
                          dayjs(endDate).locale('vi').format('YYYY-MM-DD'),
                          'YYYY-MM-DD',
                        )
                      : null
                  }
                  disabledDate={isBeforeToday}
                  allowClear={true}
                />
                <div style={{ color: 'red' }}>{formErrors.endDate}</div>
              </Form.Item>
            </Col>
          </Row>

          {/* time bắt đầu */}
          <Row gutter={24} style={{ marginLeft: 4 }}>
            <Col span={12}>
              <Form.Item
                label={
                  <Title level={5} style={{ marginTop: 5 }}>
                    Thời gian nhận phòng
                  </Title>
                }
                validateStatus={formErrors.timeCheckIn ? 'error' : ''}
                help={formErrors.timeCheckIn}
              >
                <TimePicker
                  onChange={handleTimeChangestart}
                  value={timeCheckIn && dayjs(timeCheckIn, 'HH:mm:ss')} // Fix here
                  style={{ width: '100%', float: 'right' }}
                  allowClear={true}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label={
                  <Title level={5} style={{ marginTop: 5 }}>
                    Thời gian trả phòng
                  </Title>
                }
                validateStatus={formErrors.timeCheckOut ? 'error' : ''}
                help={formErrors.timeCheckOut}
              >
                <TimePicker
                  onChange={handleTimeChangeend}
                  value={timeCheckOut && dayjs(timeCheckOut, 'HH:mm:ss')} // Fix here
                  style={{ width: '100%', float: 'right' }}
                  allowClear={true}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24} style={{ marginLeft: 4 }}>
            <Col span={12}>
              <Form.Item
                label={
                  <Title level={5} style={{ marginTop: 5 }}>
                    Tổng số phòng
                  </Title>
                }
                validateStatus={formErrors.roomNumber ? 'error' : ''}
                help={formErrors.roomNumber}
              >
                <Input
                  style={{ width: '100%', float: 'right' }}
                  value={roomNumber}
                  onChange={(e) => setroomNumber(e.target.value)}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label={
                  <Title level={5} style={{ marginTop: 5 }}>
                    Số phòng ngủ
                  </Title>
                }
                validateStatus={erorrBedRoom ? 'error' : ''}
                help={erorrBedRoom}
              >
                <Input
                  style={{ width: '100%', float: 'right' }}
                  value={totalbedroom}
                  onChange={(e) => setTotalbedroom(e.target.value)}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24} style={{ marginLeft: 4 }}>
            <Col span={12}>
              <Form.Item
                label={
                  <Title level={5} style={{ marginTop: 5 }}>
                    Số phòng tắm
                  </Title>
                }
                validateStatus={erorrBathRoom ? 'error' : ''}
                help={erorrBathRoom}
              >
                <Input
                  style={{ width: '100%', float: 'right' }}
                  value={totalBathroom}
                  onChange={(e) => setTotalBathroom(e.target.value)}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={24} style={{ marginLeft: 40 }}>
              <Title level={5} style={{ marginTop: 5 }}>
                Tiện ích homestay
              </Title>
              <div>
                <Checkbox.Group
                  options={convenients.map((item) => ({
                    label: item.name,
                    value: item.id,
                  }))}
                  defaultValue={convenientvir}
                  onChange={onChangeConvenients}
                />
              </div>
            </Col>
          </Row>
          <Row
            gutter={24}
            style={{ marginTop: 10, marginBottom: 20, marginLeft: 20 }}
          >
            {/* <DatePicker /> */}
            <div style={{ display: 'flex' }}>
              <div style={{ marginRight: 30, marginLeft: 20 }}>
                <Title level={5} style={{ marginTop: 5 }}>
                  Tỉnh/Thành phố:
                </Title>
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  style={{ borderRadius: 5, height: 30, width: 200 }}
                >
                  <option value=''>Chọn tỉnh/thành phố</option>
                  {cities.map((city) => (
                    <option key={city.Id} value={city.Id}>
                      {city.Name}
                    </option>
                  ))}
                </select>
                <div style={{ color: 'red' }}>{formErrors.address}</div>
              </div>
              <div style={{ marginRight: 30 }}>
                <Title level={5} style={{ marginTop: 5 }}>
                  Quận/Huyện:
                </Title>
                <select
                  value={selectedDistrict}
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                  style={{ borderRadius: 5, height: 30, width: 200 }}
                >
                  <option value=''>Chọn quận/huyện</option>
                  {districts.map((district) => (
                    <option key={district.Id} value={district.Id}>
                      {district.Name}
                    </option>
                  ))}
                </select>
                <div style={{ color: 'red' }}>{formErrors.address}</div>
              </div>
              <div>
                <Title level={5} style={{ marginTop: 5 }}>
                  Phường/Xã:
                </Title>
                <select
                  value={selectedWard}
                  onChange={(e) => setSelectedWard(e.target.value)}
                  style={{ borderRadius: 5, height: 30, width: 200 }}
                >
                  <option value=''>Chọn phường/xã</option>
                  {wards.map((ward) => (
                    <option key={ward.Id} value={ward.Id}>
                      {ward.Name}
                    </option>
                  ))}
                </select>
                <div style={{ color: 'red' }}>{formErrors.address}</div>
              </div>
            </div>
          </Row>
          <Row gutter={24}>
            <Col span={24} style={{ marginLeft: 40 }}>
              <Title level={5} style={{ marginTop: 5 }}>
                Địa chỉ chi tiết homestay
              </Title>
              <TextArea
                style={{ width: '1000px' }}
                value={addressDetail}
                onChange={(e) => setAddressDetail(e.target.value)}
              />
              <div style={{ color: 'red' }}>{erorrDescDetail}</div>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={24} style={{ marginLeft: 40 }}>
              <Title level={5} style={{ marginTop: 5 }}>
                Mô tả homestay
              </Title>
              <TextArea
                style={{ width: '1000px' }}
                value={desc}
                onChange={(e) => setdesc(e.target.value)}
              />
              <div style={{ color: 'red' }}>{erorrDesc}</div>
            </Col>
          </Row>
        </Form>
        <form onSubmit={handleSubmit} style={{ marginTop: 20 }}>
          <div style={{ marginLeft: 40 }}>
            {imghomestay.length <= 20 && (
              <div style={{ display: 'flex' }}>
                <label htmlFor='image' style={{ marginTop: 5 }}>
                  Chọn ảnh(Chọn ít nhất 5 ảnh và tối đa 20 ảnh)
                  <br />
                </label>
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
                  multiple
                  accept='image/*'
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                />
                <div style={{ marginLeft: 8, marginTop: 5 }}>
                  Đã có {selectedImages.length} file được chọn
                </div>
              </div>
            )}
            <div style={{ marginLeft: 8, marginTop: 5 }}>
              {imghomestay.length > 20 && (
                <span style={{ color: 'red', marginLeft: 8 }}>
                  (Bạn đã chọn đủ tối đa 20 ảnh)
                </span>
              )}
            </div>
            {isAddFrom == true ? (
              <span />
            ) : (
              <div style={{ color: 'red' }}>
                Ảnh sẽ được cập nhật ngay khi bạn tải ảnh lên hoặc xóa ảnh đi
              </div>
            )}
            {isAddFrom == true ? (
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
                      <DeleteOutlined
                        onClick={() => handleRemoveImage(index)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div />
            )}

            {/* {isAddFrom == true ? (
              ''
            ) : (
              <div style={{ color: 'red' }}>
                *(lưu ý khi chỉnh sửa chúng tôi sẽ chèn vào ảnh cũ của bạn)
              </div>
            )} */}
          </div>
          <div style={{ color: 'red' }}>{errorFile}</div>
        </form>
        {isAddFrom == true ? (
          ''
        ) : (
          <div style={{ marginTop: 10 }}>
            {imghomestay?.map((imageurl, index) => (
              <div key={index} style={{ position: 'relative' }}>
                <Image
                  src={imageurl.imgUrl}
                  alt={`Homestay Image ${index}`}
                  style={{
                    maxWidth: '200px',
                    margin: '0 10px 10px 0',
                  }}
                  preview={{
                    toolbarRender: (_, { transform: { scale }, actions }) => (
                      <Space className='toolbar-wrapper'>
                        <SwapOutlined rotate={90} onClick={actions.onFlipY} />
                        <SwapOutlined onClick={actions.onFlipX} />
                        <RotateLeftOutlined onClick={actions.onRotateLeft} />
                        <RotateRightOutlined onClick={actions.onRotateRight} />
                        <ZoomOutOutlined
                          disabled={scale === 1}
                          onClick={actions.onZoomOut}
                        />
                        <ZoomInOutlined
                          disabled={scale === 50}
                          onClick={actions.onZoomIn}
                        />
                      </Space>
                    ),
                  }}
                />
                {imghomestay.length > 5 && (
                  <Popconfirm
                    title='Bạn có muốn xóa ảnh này?'
                    onConfirm={() => handleDeleteImage(imageurl.id, index)}
                    okText='có'
                    cancelText='không'
                    placement='topRight'
                  >
                    <CloseOutlined
                      style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        cursor: 'pointer',
                      }}
                    />
                  </Popconfirm>
                )}
              </div>
            ))}
            {isLoadingImg == true ? <Skeleton.Image active /> : ''}
          </div>
        )}
      </Modal>
      <Modal
        title={
          <div style={{ fontSize: '22px' }}>Xem thông tin chi tiết homstay</div>
        }
        open={isViewmodal}
        onCancel={handleCancel}
        onOk={handleCancel}
        width={1100}
        style={{ fontSize: '40px' }}
      >
        <div style={{ fontSize: 18, fontWeight: 600 }}>
          <table>
            <tr>
              <td style={{ width: 600 }}>
                <div style={{ display: 'flex' }}>
                  <div style={{ width: 200 }}>Tên homestay </div> : {name}
                </div>
                <br />
              </td>
              <td style={{ width: 500 }}>
                <div style={{ display: 'flex' }}>
                  <div style={{ width: 200 }}>Diện tích phòng</div> : {acreage}{' '}
                  (m2)
                </div>
                <br />
              </td>
            </tr>
            <tr>
              <td style={{ width: 600 }}>
                <div style={{ display: 'flex' }}>
                  <div style={{ width: 200 }}>Giá trên mỗi đêm</div> :{' '}
                  {formatCurrency(price)}
                </div>
                <br />
              </td>
              <td style={{ width: 600 }}>
                <div style={{ display: 'flex' }}>
                  <div style={{ width: 200 }}>Giá thực tế được đăng</div> :{' '}
                  {formatCurrency(price + (price * 11) / 100)}
                </div>
                <br />
              </td>
            </tr>
            <tr>
              <td style={{ width: 600 }}>
                <div style={{ display: 'flex' }}>
                  <div style={{ width: 200 }}>Số phòng</div> : {roomNumber}
                </div>
                <br />
              </td>
              {/* <td style={{ width: 500 }}>
                <div style={{ display: 'flex' }}>
                  <div style={{ width: 200 }}>Chính sách hủy phòng </div> :{' '}
                  {cancellationPolicy}
                </div>
                <br />
              </td> */}
              <td style={{ width: 500 }}>
                <div style={{ display: 'flex' }}>
                  <div style={{ width: 200 }}>Số lượng người </div> :{' '}
                  {numberPerson} (Người)
                </div>
                <br />
              </td>
            </tr>
            <tr>
              <td style={{ width: 600 }}>
                <div style={{ display: 'flex' }}>
                  <div style={{ width: 200 }}>Thời gian nhận phòng </div> :{' '}
                  {timeCheckIn}
                </div>
                <br />
              </td>
              <td style={{ width: 500 }}>
                <div style={{ display: 'flex' }}>
                  <div style={{ width: 200 }}>Thời gian trả phòng </div> :{' '}
                  {timeCheckOut}
                </div>
                <br />
              </td>
            </tr>
            <tr>
              <td style={{ width: 600 }}>
                <div style={{ display: 'flex' }}>
                  <div style={{ width: 200 }}>Ngày bắt đầu</div> :{' '}
                  {moment(startDate).locale('vi').format('LL')}
                </div>
                <br />
              </td>
              <td style={{ width: 500 }}>
                <div style={{ display: 'flex' }}>
                  <div style={{ width: 200 }}>Ngày kết thúc</div> :{' '}
                  {moment(endDate).locale('vi').format('LL')}
                </div>
                <br />
              </td>
            </tr>
          </table>

          <div style={{ display: 'flex' }}>
            <div style={{ width: 200 }}>Tiện ích </div> :{' '}
            {viewEditConvennient.map((items, index) => (
              <React.Fragment key={index}>
                <div>&nbsp;{items.convenientHomestay?.name}</div>
                {index !== viewEditConvennient.length - 1 && <span>,</span>}
              </React.Fragment>
            ))}
          </div>
          <br />
          <div style={{ display: 'flex' }}>
            <div style={{ width: 200 }}>Mô tả </div> : {desc}
          </div>
          <br />
          <div style={{ display: 'flex' }}>
            <div style={{ width: 200 }}>Địa chỉ </div> : {addressView}
          </div>
          <br />
          <div>
            Ảnh homstay :<br />
            <div
              style={{
                width: 1030,
                padding: 20,
                flexWrap: 'wrap',
                borderRadius: 10,
                display: 'flex',
                justifyContent: 'center',
                border: '1px solid black',
              }}
            >
              {image.map((imageurl, index) => (
                <Image
                  key={index}
                  src={imageurl.imgUrl}
                  alt={`Homestay Image ${index}`}
                  style={{
                    maxWidth: '200px', // Đảm bảo ảnh không vượt quá chiều rộng của phần tử cha
                    margin: '0 10px 10px 0', // Thêm khoảng cách giữa các ảnh
                  }}
                  preview={{
                    toolbarRender: (
                      _,
                      {
                        transform: { scale },
                        actions: {
                          onFlipY,
                          onFlipX,
                          onRotateLeft,
                          onRotateRight,
                          onZoomOut,
                          onZoomIn,
                        },
                      },
                    ) => (
                      <Space className='toolbar-wrapper'>
                        <SwapOutlined rotate={90} onClick={onFlipY} />
                        <SwapOutlined onClick={onFlipX} />
                        <RotateLeftOutlined onClick={onRotateLeft} />
                        <RotateRightOutlined onClick={onRotateRight} />
                        <ZoomOutOutlined
                          disabled={scale === 1}
                          onClick={onZoomOut}
                        />
                        <ZoomInOutlined
                          disabled={scale === 50}
                          onClick={onZoomIn}
                        />
                      </Space>
                    ),
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </Modal>
      <Table columns={columns} dataSource={products} rowKey='key' />
    </>
  )
}
export default HomeStayProduct
