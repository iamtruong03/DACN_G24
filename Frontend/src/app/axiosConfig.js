import axios from 'axios';
import { useEffect } from 'react';

const instance = axios.create({
    baseURL: 'http://localhost:8080', // Đặt URL cơ sở của API của bạn
});
const updateAxiosToken = (token) => {
    instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export { instance, updateAxiosToken };

