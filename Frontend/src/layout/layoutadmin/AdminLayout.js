import { Outlet, useNavigate } from 'react-router-dom';
import HeaderAdmin from './headerAdmin';
import SiderAdmin from './siderAdmin';
import { Layout } from 'antd';
import { useEffect, useState } from 'react';
import { updateAxiosToken } from '../../app/axiosConfig';
import { useSelector } from 'react-redux';
import { LoadingOutlined } from '@ant-design/icons';
const { Header, Content } = Layout;


const AdminLayout = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate()
    const isAdmin = useSelector((state) => state.user.isAdmin);

    useEffect(() => {
        const storedToken = JSON.parse(localStorage.getItem('adminDetail'))?.data?.token;

        if (storedToken) {
            updateAxiosToken(storedToken);
        }

        // Simulate a 1-second loading delay
        const timeout = setTimeout(() => {
            setLoading(false);
        }, 1000);
        if (window.location.pathname.startsWith('/admin/') && !isAdmin) {
            navigate('/error-role')
        }
        // Cleanup the timeout to avoid memory leaks
        return () => clearTimeout(timeout);
    }, []);

    return (
        <div style={{ backgroundColor: '#f5f5f5' }}>
            {loading ? (
                // Loading screen
                <div style={{ display: 'grid', justifyContent: 'center', alignItems: 'center', marginTop: '20%', fontSize: 50 }}><LoadingOutlined /></div>
            ) : (
                // Content after loading
                <>
                    {/* Header của trang quản trị */}
                    <HeaderAdmin />

                    {/* Nội dung của trang quản trị */}
                    <div className="admin-content">
                        <Outlet />
                    </div>
                    {/* Footer của trang quản trị */}
                    <SiderAdmin />
                </>
            )}
        </div>
    );
};

export default AdminLayout;
