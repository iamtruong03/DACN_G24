// src/app/store.js
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import productReducer from '../features/product/productSlide'
import userReducer from '../features/user/userSlice'
import addproductReducer from '../features/product/createproductslice'
import ownerHomestayReducer from '../features/owner_homestay/onwerHomestaySlice'
import convenientReducer from '../features/owner_homestay/convenientSlice'
import { AuthMiddleware } from './authMiddleware'
import categoryReducer from '../features/category/categorySlides'
import provinceReducer from '../features/owner_homestay/region/provinceSlice'
import adminReducer from '../features/admin/adminSlice'
import bookingReducer from '../features/owner_homestay/getbooking/bookingSlice'
import statisticalReducer from '../features/owner_homestay/statistical/statisticalSlice'
import statisticalSliceAdmin from '../features/admin/statistical/statisticalSlice'
import shoppingCartSlice from '../features/user/shoppingCartSlice'
import userSlice from '../features/admin/user/userSlice'
const middleware = [...getDefaultMiddleware(), AuthMiddleware]

export const store = configureStore({
  reducer: {
    user: userReducer,
    product: productReducer,
    category: categoryReducer,
    addproduct: addproductReducer,
    ownerHomestay: ownerHomestayReducer,
    convenient: convenientReducer,
    province: provinceReducer,
    admin: adminReducer,
    booking: bookingReducer,
    statistical: statisticalReducer,
    statisticalAdmin: statisticalSliceAdmin,
    shoppingcart: shoppingCartSlice,
    userAdmin: userSlice
  },
  middleware: (getDefaultMiddleware) => [...getDefaultMiddleware()],
})
