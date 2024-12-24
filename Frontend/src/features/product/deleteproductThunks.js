import axios from 'axios'
import { deleteProduct } from './productSlide'

export const removeProduct = (productId) => async (dispatch) => {
  try {
    // Gọi API xóa sản phẩm từ máy chủ (axios.delete hoặc tương tự)
    await axios.delete(`http://localhost:8080/api/product/delete/${productId}`)

    // Nếu xóa thành công, dispatch action deleteProduct với productId
    dispatch(deleteProduct(productId))
  } catch (error) {
    // Xử lý lỗi nếu cần
    console.error('Error deleting product:', error)
  }
}
