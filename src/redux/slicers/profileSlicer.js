import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  profile: {},
  avatar: '',
}

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    GET_PROFILE_ACTION(state, action) {
      state.profile = action.payload
    },
    GET_AVATAR_ACTION(state, action) {
      state.avatar = action.payload
    },
  },
})

export const { GET_PROFILE_ACTION, GET_AVATAR_ACTION } = profileSlice.actions
export default profileSlice.reducer
