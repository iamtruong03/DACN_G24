import { createAsyncThunk } from '@reduxjs/toolkit'
import { addproduct } from './productSlide'
import axios from 'axios'

// export const addProductAsync = createAsyncThunk(
//     'product/addProduct',
//     async (productData, { rejetWithValue }) => {
//         try {
//             const response = await axios.post('http://localhost:8080/api/product/addproduct', productData)
//             return response.data;
//         } catch (error) {
//             return rejetWithValue(error.message)
//         }
//     }
// )
export const addProductAsync = (productData) => async (dispatch) => {
  try {
    // Gọi API để thêm sản phẩm từ máy chủ (axios.post hoặc tương tự)
    const response = await axios.post(
      'http://localhost:8080/api/product/addproduct',
      productData,
    )

    // Nếu thêm thành công, dispatch action addProduct với dữ liệu sản phẩm mới
    dispatch(addproduct(response.data))
  } catch (error) {
    // Xử lý lỗi nếu cần
    console.error('Error creating product:', error)
  }
}
