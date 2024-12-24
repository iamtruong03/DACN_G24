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
  Select,
  message,
} from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import {
  CheckOutlined,
  DeleteOutlined,
  DeleteTwoTone,
  EditOutlined,
  EditTwoTone,
  QuestionCircleOutlined,
} from '@ant-design/icons'
import { useState } from 'react'
import {
  addConvenient,
  addType,
  getConvenient,
  getConvenientType,
  updateType,
} from '../../../features/admin/adminThunk'
import { update } from 'react-spring'
const { Title } = Typography

const CategoryType = () => {
  const columns = [
    {
      title: 'Tên',
      dataIndex: 'name',
    },
    {
      title: 'Mô tả',
      dataIndex: 'desc',
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_, record) => (
        <Space size='middle'>
          <a onClick={() => showUpdateTypeModal(record)}>
            <EditTwoTone />
          </a>
        </Space>
      ),
    },
  ]

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getConvenient())
    dispatch(getConvenientType())
  }, [])
  const listType = useSelector((state) => state.admin.categoryType)
  const [modalType, setModalType] = useState(false)
  const [modalTypeUpdate, setModalTypeUpdate] = useState(false)
  const [idUpdate, setIdUpdate] = useState('')
  const [nameUpdate, setNameUpdate] = useState('')
  const [descUpdate, setDescUpdate] = useState('')

  const [convenientType, setConvenientType] = useState({
    nameType: '',
    descType: '',
  })
  const handleChangeConvenientType = (data) => {
    setConvenientType({ ...convenientType, nameType: data.target.value })
  }
  const handleChangeDesc = (data) => {
    setConvenientType({ ...convenientType, descType: data.target.value })
  }
  const handleChangeNameUpdate = (data) => {
    setNameUpdate(data.target.value)
  }
  const handleChangeDescUpdate = (data) => {
    setDescUpdate(data.target.value)
  }
  const showTypeModal = () => {
    setModalType(true)
  }
  const showUpdateTypeModal = (value) => {
    setNameUpdate(value.name)
    setIdUpdate(value.id)
    setDescUpdate(value.desc)
    setModalTypeUpdate(true)
  }

  const addConvenientType = async () => {
    if (convenientType.nameType.trim().length === 0) {
      message.error('Tên không được trống')
      return false
    }
    await dispatch(addType(convenientType))
    await dispatch(getConvenientType())
    setModalType(false)
  }
  const updateConvenientType = async () => {
    if (nameUpdate.trim().length === 0) {
      message.error('Tên không được trống')
      return false
    }
    await dispatch(
      updateType({ id: idUpdate, nameType: nameUpdate, descType: descUpdate }),
    )
    await dispatch(getConvenientType())
    setModalTypeUpdate(false)
  }
  const handleTypeModalCancel = () => {
    setModalType(false)
    setModalTypeUpdate(false)
  }

  return (
    <>
      <div style={{ marginTop: '30px' }}>
        <Title level={2}>Quản trị thê loại tiện nghi homestay</Title>
        <Title level={4}>Danh mục</Title>
        <Button
          type='primary'
          style={{ float: 'right', marginBottom: '20px' }}
          onClick={showTypeModal}
        >
          Thêm loại tiện nghi
        </Button>
        <Table columns={columns} dataSource={listType} />
      </div>
      <Modal
        title='Thêm loại tiện nghi'
        open={modalType}
        onOk={addConvenientType}
        onCancel={handleTypeModalCancel}
      >
        <Form>
          <Form.Item
            label='Tên loại tiện nghi'
            name='name'
            rules={[
              {
                required: true,
                message: 'Vui lòng điền tên',
              },
            ]}
          >
            <Input
              value={convenientType.nameType}
              onChange={(data) => handleChangeConvenientType(data)}
            />
          </Form.Item>
          <Form.Item label='Mô tả loại tiện nghi' name='type'>
            <Input
              value={convenientType.descType}
              onChange={(data) => handleChangeDesc(data)}
            />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title='Sửa loại tiện nghi'
        open={modalTypeUpdate}
        onOk={updateConvenientType}
        onCancel={handleTypeModalCancel}
      >
        <Form>
          <Form.Item label='Tên loại tiện nghi'>
            <Input
              value={nameUpdate}
              onChange={(data) => handleChangeNameUpdate(data)}
            />
          </Form.Item>
          <Form.Item label='Mô tả loại tiện nghi'>
            <Input
              value={descUpdate}
              onChange={(data) => handleChangeDescUpdate(data)}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}
export default CategoryType
