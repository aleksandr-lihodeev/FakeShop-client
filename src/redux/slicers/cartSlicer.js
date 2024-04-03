import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  cart: [],
  loading: false,
}

const cartSlicer = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    CART_ACTION(state, action) {
      state.loading = false
      state.cart = action.payload
    },
    CART_LOADING_ACTION(state) {
      state.loading = true
    },
  },
})

export const { CART_LOADING_ACTION, CART_ACTION } = cartSlicer.actions
export default cartSlicer.reducer
