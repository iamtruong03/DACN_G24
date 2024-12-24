import { Typography, message } from "antd"
import axios from "axios"
import { MDBBtn, MDBInput, MDBSpinner } from "mdb-react-ui-kit"
import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

const { Title } = Typography
const ForgortPasswordUser = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [userName, setUsername] = useState('');
    const { id } = useParams();

    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        setIsLoading(true)
        e.preventDefault();
        try {
            // Gửi POST request tới API
            message.info(
                'Đang tiến hành đặt lại mật khẩu bạn vui lòng đợi một vài giây nhé!', 2
            );
            const response = await axios.post(`http://localhost:8080/api/v1/login/forget-password?username=${userName}`);

            // Kiểm tra trạng thái thành công từ API
            if (response.status === 200) {
                setIsLoading(false)
                message.success('Đặt lại mật khẩu thành công bạn vui lòng check email để nhận lại mật khẩu');
                navigate('/login');
                // Thực hiện các bước tiếp theo sau khi đăng ký thành công
            } else {
                // Xử lý các trường hợp lỗi khác nếu cần
                message.error(response.data.message || 'Đã có lỗi xảy ra');
            }
        } catch (error) {
            // Xử lý lỗi từ request
            setIsLoading(false)
            console.error('Error during registration:', error);
            message.error(error.response.data.message || 'Tài khoản không đúng');
        }
    };


    return (
        <section style={{ display: 'flex', justifyContent: 'center', marginTop: 100, marginBottom: 100 }}>
            <div style={{ border: '1px solid #b2b2b2', width: 500, height: '100%', borderRadius: 5, padding: 15 }}>
                <Title level={3}>
                    Quên mật khẩu?</Title>
                <div style={{ fontWeight: '500', color: '#363535', fontSize: 16 }}>
                    Nhập tài khoản đã đăng ký của bạn</div><br />
                <div style={{ fontWeight: '500', color: '#363535', fontSize: 16 }}>
                    Tài khoản</div>
                <MDBInput
                    wrapperClass='mb-4'
                    label='Tài khoản'
                    id='username'
                    type='text'
                    onChange={(e) => setUsername(e.target.value)}
                    require
                />
                <MDBBtn
                    type="submit"
                    className='w-100 mb-4'
                    size='md'
                    onClick={handleSubmit}
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <>
                            <MDBSpinner role='status' size='sm'>
                                <span className='visually-hidden'>Loading...</span>
                            </MDBSpinner>
                            {' Đang tiến hành đặt lại mật khẩu...'}
                        </>
                    ) : (
                        'Đặt lại mật khẩu'
                    )}
                </MDBBtn>
            </div>
        </section >
    )
}
export default ForgortPasswordUser