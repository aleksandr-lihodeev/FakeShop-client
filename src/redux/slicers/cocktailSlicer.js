import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  cocktail: [],
  totalPage: 0,
  loading: false,
  search: '',
  category: [],
}

const cocktailSlicer = createSlice({
  name: 'cocktail',
  initialState,
  reducers: {
    COCKTAILS_ACTION(state, action) {
      state.loading = false
      state.cocktail = action.payload
    },
    TOTAL_PAGE_ACTION(state, action) {
      state.totalPage = action.payload
    },
    COCKTAIL_LOADING_ACTION(state) {
      state.loading = true
    },
    SEARCH_COCKTAIL_ACTION(state, action) {
      state.search = action.payload
    },
    CATEGORY_COCKTAIL_ACTION(state, action) {
      state.category = ['All', ...action.payload]
    },
  },
})

export const {
  CATEGORY_COCKTAIL_ACTION,
  SEARCH_COCKTAIL_ACTION,
  COCKTAIL_LOADING_ACTION,
  COCKTAILS_ACTION,
  TOTAL_PAGE_ACTION,
} = cocktailSlicer.actions
export default cocktailSlicer.reducer
