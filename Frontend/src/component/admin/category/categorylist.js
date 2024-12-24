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
  updateConvenient,
} from '../../../features/admin/adminThunk'
const { Title } = Typography

const CategoryList = () => {
  const columns = [
    {
      title: 'Tên',
      dataIndex: 'name',
    },
    {
      title: 'Loại',
      dataIndex: 'convenientHomestayType',
      render: (data) => {
        return data?.name
      },
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_, record) => (
        <Space size='middle'>
          <a onClick={() => updateData(record)}>
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
  const categorylist = useSelector((state) => state.admin.category)
  const listType = useSelector((state) => state.admin.categoryType)
  const err = useSelector((state) => state.admin.error)
  console.log(listType)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [nameUpdate, setNameupdate] = useState('')
  const [typeUpdate, setTypeUpdate] = useState('')
  const [idUpdate, setIdUpdate] = useState('')
  const [isUpdate, setIsUpdate] = useState(false)
  const [modalType, setModalType] = useState(false)
  const [convenient, setConvenient] = useState({
    name: '',
    desc: 'mo ta',
    idType: '',
  })
  const [convenientType, setConvenientType] = useState({
    nameType: '',
    descType: '',
  })
  const handleChangeConvenientType = (data) => {
    setConvenientType({ ...convenientType, nameType: data.target.value })
  }
  const handleChangeConvenientTypeDesc = (data) => {
    setConvenientType({ ...convenientType, descType: data.target.value })
  }
  const handleChangeType = (data) => {
    setConvenient({ ...convenient, idType: data })
  }
  const handleChangeTypeUpdate = (data) => {
    setTypeUpdate(data)
  }
  const handleChangeNameUpdate = (data) => {
    setNameupdate(data.target.value)
  }
  const handleChangeName = (data) => {
    setConvenient({ ...convenient, name: data.target.value })
  }
  const showModal = () => {
    setIsModalOpen(true)
  }
  const showTypeModal = () => {
    setModalType(true)
  }
  const convenientAdd = async () => {
    if (convenient.name.trim().length === 0) {
      message.error('Tên không được trống')
      return false
    }
    if (convenient.idType.trim().length === 0) {
      message.error('Loại không được trống')
      return false
    }
    await dispatch(addConvenient(convenient))
    await dispatch(getConvenient())
    setIsModalOpen(false)
  }
  const addConvenientType = async () => {
    if (convenientType.nameType.trim().length === 0) {
      message.error('Tên không được trống!')
      return false
    }
    await dispatch(addType(convenientType))
    await dispatch(getConvenientType())
    setModalType(false)
  }
  const handleCancel = () => {
    setIsModalOpen(false)
  }
  const handleCancelUpdate = () => {
    setIsUpdate(false)
  }
  const handleTypeModalCancel = () => {
    setModalType(false)
  }
  const updateData = (data) => {
    setTypeUpdate(data.convenientHomestayType?.id)
    setNameupdate(data.name)
    setIdUpdate(data.id)
    setIsUpdate(true)
  }
  const update = async () => {
    if (nameUpdate.trim().length === 0) {
      message.error('Tên không được trống')
      return false
    }
    if (typeUpdate.trim().length === 0) {
      message.error('Loại không được trống')
      return false
    }
    await dispatch(
      updateConvenient({ idType: typeUpdate, name: nameUpdate, id: idUpdate }),
    )
    await dispatch(getConvenient())
    setIsUpdate(false)
  }
  return (
    <>
      <div style={{ marginTop: '30px' }}>
        <Title level={2}>Quản trị tiện nghi homestay</Title>
        <Title level={4}>Danh mục</Title>
        <Button
          type='primary'
          style={{ float: 'right', marginBottom: '20px' }}
          onClick={showModal}
        >
          Thêm
        </Button>
        <Button
          type='primary'
          style={{ float: 'right', marginBottom: '20px', marginRight: '10px' }}
          onClick={showTypeModal}
        >
          Thêm loại tiện nghi
        </Button>
        <Table columns={columns} dataSource={categorylist} />
      </div>
      <Modal
        title='Thêm tiện nghi'
        open={isModalOpen}
        onOk={convenientAdd}
        onCancel={handleCancel}
      >
        <Form>
          <Form.Item
            label='Tên tiện nghi'
            name='name'
            rules={[
              {
                required: true,
                message: 'Vui lòng điền tên',
              },
            ]}
          >
            <Input
              value={convenient?.name}
              onChange={(data) => handleChangeName(data)}
            />
          </Form.Item>
          <Form.Item label='Loại tiện nghi' name='type'>
            <Select
              style={{ width: 143 }}
              onChange={(data) => handleChangeType(data)}
              options={listType.map((filter) => ({
                value: filter.id,
                label: filter.name,
              }))}
            />
          </Form.Item>
        </Form>
      </Modal>
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
              value={convenientType?.nameType}
              onChange={(data) => handleChangeConvenientType(data)}
            />
          </Form.Item>
          <Form.Item label='Mô tả tiện nghi' name='desc'>
            <Input
              value={convenientType?.descType}
              onChange={(data) => handleChangeConvenientTypeDesc(data)}
            />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title='Sửa tiện nghị'
        open={isUpdate}
        onOk={update}
        onCancel={handleCancelUpdate}
      >
        <Form>
          <Form.Item
            label='Tên tiện nghi'
            name='nameUpdate'
            rules={[
              {
                required: true,
                message: 'Vui lòng điền tên',
              },
            ]}
          >
            <Input
              value={nameUpdate}
              onChange={(data) => handleChangeNameUpdate(data)}
            />{' '}
            <br />
          </Form.Item>
          <Form.Item label='Loại tiện nghi'>
            <Select
              style={{ width: 143 }}
              onChange={(data) => handleChangeTypeUpdate(data)}
              options={listType.map((filter) => ({
                value: filter.id,
                label: filter.name,
              }))}
              value={typeUpdate}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}
export default CategoryList
