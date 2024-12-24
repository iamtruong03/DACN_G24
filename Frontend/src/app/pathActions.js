import { Navigate } from 'react-router-dom';

export const redirectToLogin = () => {
    return Navigate('/login');
};

export const redirectToAdmin = () => {
    return Navigate('/admin');
};