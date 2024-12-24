import { CheckCircleOutlined } from "@ant-design/icons"
import { Button, Row } from "antd"
import { Content } from "antd/es/layout/layout"
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { comfirmMailActiveAcc } from "../../../features/user/confirmMailThunk";


const ComfirmMail = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');
    const dispatch = useDispatch();

    const activeEmail = () => {
        dispatch(comfirmMailActiveAcc(id));
    }
    return (
        <>
            <Content
                className="site-layout"
                style={{
                    padding: '0 100px',
                    marginTop: '30px',
                    color: 'black'
                }}
            >

                <div style={{ backgroundColor: 'white', height: '500px', marginTop: '100px', marginBottom: '100px' }}>
                    <Row style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}><CheckCircleOutlined style={{ marginTop: '70px', fontSize: '100px', color: 'green' }} /></Row>
                    <Row style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>
                        <h4>Đăng ký thành công</h4>
                    </Row>
                    <Row style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>
                        <div style={{ fontSize: '20px' }}>
                            Bạn hãy nhấn nút bên dưới để kích hoạt tài khoản
                        </div>
                    </Row>
                    <Row style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>
                        <div style={{ fontSize: '20px' }}>Cảm ơn bản đã tin tưởng TraivelVivu</div>
                    </Row>
                    <Row style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>
                        <Button style={{ fontSize: '20px', width: '300px', height: '50px', fontWeight: '700', backgroundColor: '#008B8B', color: 'white' }} onClick={activeEmail}>Kích hoạt tài khoản</Button>
                    </Row>
                </div>
            </Content>
        </>
    )
}
export default ComfirmMail