import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  favorite: [],
  loading: false,
}

const favoriteSlicer = createSlice({
  name: 'favorite',
  initialState,
  reducers: {
    FAVORITE_ACTION(state, action) {
      state.loading = false
      state.favorite = action.payload
    },
    FAVORITE_LOADING_ACTION(state) {
      state.loading = true
    },
  },
})

export const { FAVORITE_ID_ACTION, FAVORITE_ACTION, FAVORITE_LOADING_ACTION } =
  favoriteSlicer.actions
export default favoriteSlicer.reducer
