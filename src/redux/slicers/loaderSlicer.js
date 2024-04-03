import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loader: false,
}

const loaderSlicer = createSlice({
  name: 'loader',
  initialState,
  reducers: {
    LOADER_ACTION(state, action) {
      state.loader = action.payload
    },
  },
})

export const { LOADER_ACTION } = loaderSlicer.actions
export default loaderSlicer.reducer
