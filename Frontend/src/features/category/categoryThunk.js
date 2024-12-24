import { fetchCategorysStart, fetchCategorysSuccess, fetchCategorysFailure } from './categorySlides'
import axios from 'axios';

export const fetchCategory = () => async (dispatch) => {
    dispatch(fetchCategorysStart);
    try {
        const response = await axios.get('http://localhost:8080/api/category/getall');
        dispatch(fetchCategorysSuccess(response.data));
    } catch (error) {
        dispatch(fetchCategorysFailure(error.message));
    }
};