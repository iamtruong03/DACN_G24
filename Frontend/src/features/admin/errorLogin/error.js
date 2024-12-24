import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Result } from 'antd';
import { useSelector } from 'react-redux';
import { updateAxiosToken } from '../../../app/axiosConfig';
const ErrorLogin = () => {
    const navigate = useNavigate(); // Use the useNavigate hook

    const navigatetologin = () => {
        navigate('/'); // Use navigate to go to the /login route
    }
    useEffect(() => {
        const storedToken = JSON.parse(localStorage.getItem('ownerDetail'))?.data?.token;
        updateAxiosToken(storedToken);
        const storedTokenAdmin = JSON.parse(localStorage.getItem('adminDetail'))?.data?.token;
        updateAxiosToken(storedTokenAdmin);
    }, []);
    const ispartner = useSelector((state) => state.user.ispartner);
    const isAdmin = useSelector((state) => state.user.isAdmin);
    useEffect(() => {
        if (ispartner) {
            navigate('/partner/homestay')
            // openNotificationpartner()
        }
        if (isAdmin) {
            navigate('/admin/createform')
        }
    }, [ispartner, isAdmin]);

    return (
        <Result
            status="403"
            title="403"
            subTitle="Xin lỗi,bạn không có quyền truy cập cập vào trang này"
            extra={<Button type="primary" onClick={navigatetologin}>Quay lại trang chủ</Button>}
        />
    )
}
export default ErrorLogin;