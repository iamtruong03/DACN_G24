import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ partnerOnly, adminOnly, userOnly, ...rest }) => {
    const [isLoading, setIsLoading] = useState(true);

    const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
    const isAdmin = useSelector((state) => state.user.isAdmin);
    const isPartner = useSelector((state) => state.user.ispartner);

    useEffect(() => {
        setIsLoading(false);
    }, []);

    if (isLoading) {
        return null; // Render nothing while loading
    }

    if (window.location.pathname.includes('/user/propreties') && !isLoggedIn) {
        return <Navigate to="/login" replace />;
    }

    if (adminOnly && !isAdmin) {
        return <Navigate to="/error-role" replace />;
    }
    if (partnerOnly && !isPartner) {
        return <Navigate to="/error-role" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
