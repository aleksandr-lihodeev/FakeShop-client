import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  auth: localStorage.getItem('token') || null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    AUTH_TOKEN_ACTION(state, action) {
      state.auth = action.payload
      localStorage.setItem('token', action.payload)
    },
    REMOVE_TOKEN_ACTION(state, action) {
      state.auth = null
      localStorage.removeItem('token')
    },
  },
})

export const { AUTH_TOKEN_ACTION, REMOVE_TOKEN_ACTION } = authSlice.actions
export default authSlice.reducer
