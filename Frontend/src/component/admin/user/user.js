import { Avatar, Button, Form, Input, Modal, Pagination, Rate, Row, Table, Typography, message } from "antd"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CheckOutlined, CloseOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { MDBCard, MDBCardBody, MDBCardImage, MDBCol, MDBContainer, MDBIcon, MDBRow, MDBSwitch, MDBTypography } from "mdb-react-ui-kit";
import { getAllHomestayByHomestayName, getAllHomestayByNameOwner, getAllHomestayByStatus } from "../../../features/product/productThunk";
import moment from 'moment';
import { deleteCommentHomestay } from "../../../features/admin/adminThunk";
import { approveUser, fetchAllUser, fetchAllUserByName, getCommentByUserId, refuseUser } from "../../../features/admin/user/userThunk";

const { Title } = Typography
const { Search } = Input;

const User = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalApprove, setModalApprove] = useState(false);
  const [modalRefuse, setModalRefuse] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState('');
  const [current, setCurrent] = useState(1);
  const [userId, setUserId] = useState('');
  const onChangePage = (page) => {
    setCurrent(page);
  };
  const showModal = (record) => {
    dispatch(getCommentByUserId(' ', record.id))
    setUserId(record.id)
    setIsModalOpen(true);
  };
  const showModalAprove = (record) => {
    setModalApprove(true);
    setUserId(record.id);
  };
  const showModalDenie = (record) => {
    setModalRefuse(true);
    setUserId(record.id);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false)
    setModalApprove(false)
    setModalRefuse(false)
  };
  const approvedUser = async () => {
    message.info(
      'Đang tiến hành bạn vui lòng đợi một vài giây nhé!',
      10,
    )
    setModalApprove(false)
    await dispatch(approveUser(userId))
    message.info(
      'Mở hoạt động thành công',
      2,
    )
  }
  const refusedUser = async () => {
    setModalRefuse(false)
    message.info(
      'Đang tiến hành bạn vui lòng đợi một vài giây nhé!',
      10,
    )
    await dispatch(refuseUser(userId))
    message.info(
      'Hủy thành công',
      2,
    )
  }
  const deleteComment = (id) => {
    dispatch(deleteCommentHomestay(id));
    setDeleteConfirm(false)
    setIsModalOpen(false);
    dispatch(getAllHomestayByStatus(0));
  }
  const openConfirmDelete = (id) => {
    setDeleteConfirm(true);
    setDeleteId(id);
  }

  const onSearchUsername = (value, _e, info) => {
    dispatch(fetchAllUserByName(value));
  }
  const products = useSelector((state) => state.userAdmin.user.data);
  const comment = useSelector((state) => state.userAdmin.comment.data);

  const getCommentByHomestayName = (value, _e, info) => {
    dispatch(getCommentByUserId(value, userId))
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllUser());
  }, [])

  const columns = [
    {
      title: 'Tên khách hàng',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status'
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: 'phoneNumber',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
    },
    {
      title: 'Xem đánh giá',
      key: 'action',
      align: 'center',
      render: (_, record) => (
        <>
          <Button style={{ border: 'none' }} onClick={() => showModal(record)}>
            <EyeOutlined />
          </Button>
          <Button style={{ border: 'none' }} onClick={() => showModalAprove(record)}>
            <CheckOutlined />
          </Button>
          <Button style={{ border: 'none' }} onClick={() => showModalDenie(record)}>
            <CloseOutlined />
          </Button>
        </>
      )
    }
  ];
  return (
    <div style={{ marginTop: '20px' }}>
      <Title level={2}>Quản trị tài khoản khách hàng</Title>
      <Row>
        <Form.Item label="Tìm kiếm theo tên" style={{ float: 'left', marginLeft: ' 50px' }}>
          <Search
            placeholder="Tên khách hàng"
            allowClear
            size="medium"
            enterButton="search"
            onSearch={onSearchUsername}
          />
        </Form.Item>
      </Row>
      <Table dataSource={products} columns={columns} />;

      <Modal title="Đánh giá của khách hàng" width={900} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <section style={{ backgroundColor: "#f7f6f6" }}>
          <MDBContainer className="py-5 text-dark" style={{ maxWidth: "1000px" }}>
            <MDBRow className="justify-content-center">
              <MDBCol md="12" lg="10" xl="8">
              <Row>
              <Form.Item label="Tìm kiếm theo tên" style={{ float: 'left', marginLeft: ' 50px' }}>
                <Search
                  placeholder="Tên hometsay"
                  allowClear
                  size="medium"
                  enterButton="search"
                  onSearch={getCommentByHomestayName}
                />
              </Form.Item>
            </Row>
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <MDBTypography tag="h4" className="text-dark mb-0">
                    Có tất cả ({comment?.length}) đánh giá
                  </MDBTypography>
                </div>
                {comment?.map((items) =>
                  <MDBCard className="mb-3">
                    <MDBCardBody>
                      <div className="d-flex flex-start">
                        <Avatar
                          style={{
                            backgroundColor: '#f56a00',
                            verticalAlign: 'middle',
                            width: 40,
                            height: 40
                          }}
                          size="large"
                        >
                          {items.user?.name ? items.user.name.charAt(0).toUpperCase() : ''}
                        </Avatar>

                        <div className="w-100" style={{ marginLeft: 10 }}>
                          <div className="d-flex justify-content-between align-items-center mb-3">
                            <MDBTypography
                              tag="h6"
                              className="text-primary fw-bold mb-0"
                            >
                              {items.user?.name}<br />
                              <Rate disabled defaultValue={items.point} /><br /><br />
                              <span className="text-dark ">
                                {items.comment}
                              </span>
                            </MDBTypography>
                            {items.homestay?.name}<br />
                            <p className="mb-0">{moment(items.createdDate).fromNow()}</p>
                            <Button className="mb-0" style={{ border: 'none' }} onClick={() => openConfirmDelete(items.id)}><DeleteOutlined /></Button>

                          </div>

                        </div>
                      </div>
                    </MDBCardBody>
                  </MDBCard>
                )}
                <div style={{ float: 'right', marginTop: 20 }}>
                  <Pagination current={current} onChange={onChangePage} total={comment?.length} />
                </div>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </section>
      </Modal>

      <Modal
        title="Xóa comment"
        open={deleteConfirm}
        okText="Xóa"
        cancelText="Hủy"
        onCancel={() => setDeleteConfirm(false)}
        onOk={() => deleteComment(deleteId)}
      >
        Bạn có chắc chắn muốn xóa comment này !
      </Modal>
      <Modal
        title="Hủy hoạt động tài khoản"
        open={modalRefuse}
        okText="Hủy"
        cancelText="Cancel"
        onCancel={() => setModalRefuse(false)}
        onOk={() => refusedUser()}
      >
        Bạn có chắc chắn muốn hủy hoạt động tài khoản này này !
      </Modal>
      <Modal
        title="Mở hoạt động tài khoản"
        open={modalApprove}
        okText="Ok"
        cancelText="Cancel"
        onCancel={() => setModalApprove(false)}
        onOk={() => approvedUser()}
      >
        Bạn có chắc chắn muốn xóa mở hoạt động này !
      </Modal>
    </div>

  )
}
export default User