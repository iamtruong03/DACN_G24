import axios from 'axios';
import { instance } from '../../app/axiosConfig';
import { fetchProductsFailure, fetchProductsSuccess } from '../product/productSlide';
import { denineProducts } from '../product/productThunk';
import { addConvenientFailed, fetchBookingSuccess, fetchConvenientSuccess, fetchConvenientTypeSuccess } from './adminSlice';
import { message } from 'antd';

const BASE_URL = '/homestay/get-all?size=999';

export const aproveHomestay = (data) => async (dispatch) => {
  try {
    const response = await instance.put('http://localhost:8080/api/v3/homestay/approve', data);
  } catch (error) {
    dispatch(addConvenientFailed(error.message));
  }
};

export const disAgreeHomestay = (data) => async (dispatch) => {
  try {
    const response = await instance.put('http://localhost:8080/api/v3/homestay/refuse', data);
  } catch (error) {
    dispatch(addConvenientFailed(error.message));
  }
};

export const getConvenient = () => async (dispatch) => {
  try {
    const response = await instance.get('http://localhost:8080/api/v3/convenient-homestay?size=99');
    dispatch(fetchConvenientSuccess(response.data.data.data)); // Lấy dữ liệu từ response.data.data
  } catch (error) {
    dispatch(addConvenientFailed(error.message));
  }
};

export const getConvenientType = () => async (dispatch) => {
  try {
    const response = await instance.get('http://localhost:8080/api/v3/convenient-homestay/type?size=99');
    dispatch(fetchConvenientTypeSuccess(response.data.data.data)); // Lấy dữ liệu từ response.data.data
  } catch (error) {
    dispatch(addConvenientFailed(error.message));
  }
};

export const addConvenient = (data) => async (dispatch) => {
  try {
    const response = await instance.post('http://localhost:8080/api/v3/convenient-homestay/add-convenient', data);
    message.success('Thêm thành công');
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      const errorMessage = error.response.data.message;
      // Do something with the error message, such as displaying it to the user
      message.error(errorMessage);
    }
  }
};

export const addType = (data) => async (dispatch) => {
  try {
    const response = await instance.post('http://localhost:8080/api/v3/convenient-homestay/add-convenient-type', data);
    message.success('Thêm thành công')
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      const errorMessage = error.response.data.message;
      // Do something with the error message, such as displaying it to the user
      message.error(errorMessage);
    }
  }
};

export const updateType = (data) => async (dispatch) => {
  try {
    const response = await instance.put('http://localhost:8080/api/v3/convenient-homestay/update-convenient-type', data);
    message.success('Sửa thành công')
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      const errorMessage = error.response.data.message;
      // Do something with the error message, such as displaying it to the user
      message.error(errorMessage);
    }
  }
};

export const getBooking = (status) => async (dispatch) => {
  try {
    const response = await instance.get('http://localhost:8080/api/v3/booking?size=99&statusBooking=' + status);
    dispatch(fetchBookingSuccess(response.data.data.data)); // Lấy dữ liệu từ response.data.data

  } catch (error) {
    dispatch(addConvenientFailed(error.message));
  }
};

export const searchBooking = (status, homestayName, userName, statusPayUser, statusPayOwner) => async (dispatch) => {
  try {
    const response = await instance.get(
      'http://localhost:8080/api/v3/booking?size=99&statusBooking='
      + status + '&homestayName=' + homestayName + '&userName=' + userName + '&statusPayUser=' + statusPayUser + '&statusPayOwner=' + statusPayOwner
    );
    dispatch(fetchBookingSuccess(response.data.data.data)); // Lấy dữ liệu từ response.data.data

  } catch (error) {
    dispatch(addConvenientFailed(error.message));
  }
};
export const getBookingByNameHomestay = (name) => async (dispatch) => {
  try {
    const response = await instance.get('http://localhost:8080/api/v3/booking?size=99&homestayName=' + name);
    dispatch(fetchBookingSuccess(response.data.data.data)); // Lấy dữ liệu từ response.data.data

  } catch (error) {
    dispatch(addConvenientFailed(error.message));
  }
};
export const fetchBookingUserId = (id) => async (dispatch) => {
  try {
    const response = await instance.get(`http://localhost:8080/api/v1/booking?userId=${id}&size=99`);
    dispatch(fetchBookingSuccess(response.data.data.data)); // Lấy dữ liệu từ response.data.data
  } catch (error) {
    dispatch(addConvenientFailed(error.message));
  }
};

export const getBookingByPhoneNumber = (sdt) => async (dispatch) => {
  try {
    const response = await instance.get('http://localhost:8080/api/v3/booking?size=99&sdtUser=' + sdt);
    dispatch(fetchBookingSuccess(response.data.data.data)); // Lấy dữ liệu từ response.data.data

  } catch (error) {
    dispatch(addConvenientFailed(error.message));
  }
};

export const getBookingByName = (name) => async (dispatch) => {
  try {
    const response = await instance.get('http://localhost:8080/api/v3/booking?size=99&nameBooking=' + name);
    dispatch(fetchBookingSuccess(response.data.data.data)); // Lấy dữ liệu từ response.data.data

  } catch (error) {
    dispatch(addConvenientFailed(error.message));
  }
};

export const updateConvenient = (data) => async (dispatch) => {
  try {
    const response = await instance.put('http://localhost:8080/api/v3/convenient-homestay/update-convenient', data);
    message.success('Sửa thành công')
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      const errorMessage = error.response.data.message;
      // Do something with the error message, such as displaying it to the user
      message.error(errorMessage);
    }
  }
};

export const deleteCommentHomestay = (id) => async (dispatch) => {
  try {
    await instance.delete('http://localhost:8080/api/v3/comment/delete?commentId=' + id);
    const response = await instance.get('/api/v3/homestay?size=99&statusHomestay=0')
    dispatch(fetchProductsSuccess(response.data.data.data))
  } catch (error) {
    dispatch(addConvenientFailed(error.message));
  }
};

export const adminTranCodeBooking = (id, code) => async (dispatch) => {
  try {
    await instance.put(`http://localhost:8080/api/v3/booking/update-admin-trancode?id=${id}&adminTransactionCode=${code}`);
    const response = await instance.get('http://localhost:8080/api/v3/booking?size=99&statusBooking=');
    dispatch(fetchBookingSuccess(response.data.data.data))
  } catch (error) {
    dispatch(addConvenientFailed(error.message));
  }
};

export const userTranCodeBooking = (id, code) => async (dispatch) => {
  try {
    await instance.put(`http://localhost:8080/api/v3/booking/update-cancell-trancode?id=${id}&cancellTransactionCode=${code}`);
    const response = await instance.get('http://localhost:8080/api/v3/booking?size=99&statusBooking=');
    dispatch(fetchBookingSuccess(response.data.data.data))
  } catch (error) {
    dispatch(addConvenientFailed(error.message));
  }
};


