import React, { useEffect, useState } from 'react';
import {
    MDBBtn,
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBRow,
    MDBCol,
    MDBIcon,
    MDBInput
}
    from 'mdb-react-ui-kit';
import logotravel from "../../../assets/svg/Rectangle 16.svg"
import management from "../../../assets/svg/Business-Management-PNG-Image.png"
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginAdmin } from '../../../features/user/userThunk';
import { notification } from 'antd';

function LoginAdmin() {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const isAdmin = useSelector((state) => state.user.isAdmin);

    const [username, setUsername] = useState(''); // Thêm state cho username
    const [password, setPassword] = useState(''); // Thêm state cho password
    const [size, setSize] = useState('large');
    const openNotificationadmin = () => {
        notification.open({
            message: 'Thông báo',
            description:
                'chào mừng bạn đến với trang quản trị trang web',
            onClick: () => {
                console.log('Notification Clicked!');
            },
        });
    };
    const handleLogin = async () => {
        // Gọi loginUser thunk và truyền vào username và password
        dispatch(loginAdmin(username, password));
    };

    useEffect(() => {
        if (isAdmin) {
            navigate('/admin/createform')
            openNotificationadmin()
        }
    }, [isAdmin]);
    return (
        <MDBContainer className="my-5">

            <MDBCard>
                <MDBRow className='g-0'>

                    <MDBCol md='6'>
                        <img src={management} style={{ width: '100%' }} />
                    </MDBCol>

                    <MDBCol md='6'>
                        <MDBCardBody className='d-flex flex-column'>

                            <div className='d-flex flex-row mt-2'>
                                <img src={logotravel} />
                            </div>

                            <h5 className="fw-normal my-4 pb-3" style={{ letterSpacing: '1px' }}>Đăng nhập với tài khoản của bạn</h5>

                            <MDBInput wrapperClass='mb-4' label='Email address' id='formControlLg' type='email' size="lg" value={username}
                                onChange={(e) => setUsername(e.target.value)} />
                            <MDBInput wrapperClass='mb-4' label='Password' id='formControlLg' type='password' size="lg" value={password}
                                onChange={(e) => setPassword(e.target.value)} />

                            <MDBBtn className="mb-4 px-5" color='dark' size='lg' onClick={() => handleLogin()}>Đăng nhập</MDBBtn>
                        </MDBCardBody>
                    </MDBCol>

                </MDBRow>
            </MDBCard>

        </MDBContainer>
    );
}

export default LoginAdmin;