import React, { useEffect, useState } from 'react'; // Đảm bảo bạn đã import useState
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, logoutUser } from '../../features/user/userThunk';
import "./Login.css";
import { Typography, Button } from 'antd';
import { FacebookOutlined, TwitterOutlined, GoogleOutlined, InstagramOutlined } from '@ant-design/icons'
import {
    MDBContainer,
    MDBCol,
    MDBRow,
    MDBBtn,
    MDBIcon,
    MDBInput,
    MDBCheckbox
}
    from 'mdb-react-ui-kit';
import { Link, useNavigate } from 'react-router-dom';
import { notification } from 'antd';

const { Title } = Typography

const Context = React.createContext({
    name: 'Default',
});

function LoginComponent() {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
    const isAdmin = useSelector((state) => state.user.isAdmin);
    const issupperAdmin = useSelector((state) => state.user.issupperAdmin);


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
        dispatch(loginUser(username, password));
    };

    useEffect(() => {
        if (isLoggedIn) {
            navigate('/')
        }
    }, [isLoggedIn]);

    return (
        <div>
            <MDBContainer fluid className="p-3 my-5">

                <MDBRow>

                    <MDBCol col='10' md='6'>
                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg" class="img-fluid" alt="Phone image" />
                    </MDBCol>

                    <MDBCol col='4' md='6'>
                        <div>
                            <Title level={2}>Đăng nhập</Title>
                            <Title level={4}>Để đảm bảo an toàn, xin vui lòng đăng nhập để truy cập vào thông tin</Title><br />
                        </div>
                        <MDBInput wrapperClass='mb-4' label='Tài khoản' id='formControlLg' type='email' size="lg" value={username}
                            onChange={(e) => setUsername(e.target.value)} />
                        <MDBInput wrapperClass='mb-4' label='Mật khẩu' id='formControlLg' type='password' size="lg" value={password}
                            onChange={(e) => setPassword(e.target.value)} />


                        <div className="d-flex justify-content-between mx-4 mb-4">
                            <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
                            <Link to={'/changePasswordUser'}>
                                <div style={{ cursor: 'pointer' }}>Quên mật khẩu?</div>
                            </Link>
                        </div>

                        <Button type="primary" style={{ width: '100%', height: 45 }} onClick={() => handleLogin()}>Đăng nhập</Button>


                    </MDBCol>

                </MDBRow>

            </MDBContainer>
        </div>

    );
}

export default LoginComponent;