import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { AUTH_TOKEN_ACTION } from '../slicers/authSlicer'
import {
  ADD_PRODUCT_TO_CART_API,
  CART_API,
  FAVORITE_API,
  GET_CATEGORY_PRODUCT_API,
  GET_COCKTAILS_API,
  GET_PRODUCT_CART_API,
  GET_PRODUCT_FAVORITE_API,
  GET_PROFILE_API,
  LOGIN_API,
  PROFILE_DELETE_API,
  PROFILE_EDIT_API,
  REGISTER_API,
} from '../../config'
import { GET_PROFILE_ACTION } from '../slicers/profileSlicer'
import {
  COCKTAILS_ACTION,
  TOTAL_PAGE_ACTION,
  COCKTAIL_LOADING_ACTION,
  CATEGORY_COCKTAIL_ACTION,
} from '../slicers/cocktailSlicer'
import { CART_ACTION, CART_LOADING_ACTION } from '../slicers/cartSlicer'
import {
  FAVORITE_ACTION,
  FAVORITE_LOADING_ACTION,
} from '../slicers/favoriteSlicer'

export const REGISTER_ASYNC = createAsyncThunk(
  'auth/REGISTER_ASYNC',
  async (userData, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.post(REGISTER_API, userData)
      if (response.data.token) {
        dispatch(AUTH_TOKEN_ACTION(response.data.token))
      }
    } catch (e) {
      return rejectWithValue(e.message)
    }
  },
)

export const LOGIN_ASYNC = createAsyncThunk(
  'auth/LOGIN_ASYNC',
  async (userData, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.post(LOGIN_API, userData)
      if (response.data.token) {
        dispatch(AUTH_TOKEN_ACTION(response.data.token))
      }
    } catch (e) {
      return rejectWithValue(e.message)
    }
  },
)

export const PROFILE_ASYNC = createAsyncThunk(
  'profile/PROFILE_ASYNC',
  async (_, { rejectWithValue, dispatch, getState }) => {
    try {
      const { auth } = getState().auth
      const response = await axios.get(GET_PROFILE_API, {
        headers: {
          Authorization: `Bearer ${auth}`,
        },
      })
      dispatch(GET_PROFILE_ACTION(response.data.user))
    } catch (e) {
      return rejectWithValue(e.message)
    }
  },
)

export const PROFILE_EDIT_ASYNC = createAsyncThunk(
  'profile/PROFILE_EDIT_ASYNC',
  async (userData, { rejectWithValue, dispatch, getState }) => {
    try {
      const { auth } = getState().auth
      const response = await axios.patch(PROFILE_EDIT_API, userData, {
        headers: {
          Authorization: `Bearer ${auth}`,
        },
      })
      if (response.data.token) {
        dispatch(AUTH_TOKEN_ACTION(response.data.token))
        dispatch(GET_PROFILE_ACTION(response.data.updatedUser))
      }
      return response.data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  },
)

export const GET_COCKTAILS_ASYNC = createAsyncThunk(
  'cocktail/GET_COCKTAILS_ASYNC',
  async (obj, { rejectWithValue, dispatch, getState }) => {
    try {
      dispatch(COCKTAIL_LOADING_ACTION())

      const response = await axios.get(
        GET_COCKTAILS_API +
          `/?page=${obj.currentPage}&search=${obj.search}&category=${
            obj.setCategory === 'All' ? '' : obj.setCategory
          }`,
      )
      dispatch(COCKTAILS_ACTION(response.data.product))
      dispatch(TOTAL_PAGE_ACTION(response.data.pages))
    } catch (error) {
      return rejectWithValue(error.message)
    }
  },
)

export const GET_CATEGORY_ASYNC = createAsyncThunk(
  'cocktail/GET_CATEGORY_ASYNC',
  async (_, { rejectWithValue, dispatch, getState }) => {
    try {
      const response = await axios.get(GET_CATEGORY_PRODUCT_API)
      dispatch(CATEGORY_COCKTAIL_ACTION(response.data.categories))
    } catch (error) {
      return rejectWithValue(error.message)
    }
  },
)

export const ADD_PRODUCT_TO_CART_ASYNC = createAsyncThunk(
  'cart/ADD_PRODUCT_TO_CART',
  async (productId, { rejectWithValue, dispatch, getState }) => {
    try {
      const { auth } = getState().auth

      const response = await axios.post(
        CART_API + `add-to-cart/${productId}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${auth}`,
          },
        },
      )
      return response.data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  },
)

export const REMOVE_PRODUCT_FROM_CART_ASYNC = createAsyncThunk(
  'cart/REMOVE_PRODUCT_FROM_CART_ASYNC',
  async (productId, { rejectWithValue, dispatch, getState }) => {
    try {
      const { auth } = getState().auth

      const response = await axios.post(
        CART_API + `remove-from-cart/${productId}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${auth}`,
          },
        },
      )
      return response.data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  },
)

export const GET_PRODUCT_CART_ASYNC = createAsyncThunk(
  'cart/GET_PRODUCT_CART_ASYNC',
  async (_, { rejectWithValue, dispatch, getState }) => {
    try {
      dispatch(CART_LOADING_ACTION())

      const { auth } = getState().auth

      const response = await axios.get(GET_PRODUCT_CART_API, {
        headers: {
          Authorization: `Bearer ${auth}`,
        },
      })
      dispatch(CART_ACTION(response.data))
    } catch (error) {
      return rejectWithValue(error.message)
    }
  },
)

export const ADD_PRODUCT_TO_FAVORITE_ASYNC = createAsyncThunk(
  'favorite/ADD_PRODUCT_TO_FAVORITE',
  async (productId, { rejectWithValue, dispatch, getState }) => {
    try {
      const { auth } = getState().auth
      const response = await axios.post(
        FAVORITE_API + `toggle-favorite/${productId}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${auth}`,
          },
        },
      )
      return response.data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  },
)

export const GET_PRODUCT_FAVORITE_ASYNC = createAsyncThunk(
  'favorite/GET_PRODUCT_FAVORITE_ASYNC',
  async (_, { rejectWithValue, dispatch, getState }) => {
    try {
      dispatch(FAVORITE_LOADING_ACTION())

      const { auth } = getState().auth

      const response = await axios.get(GET_PRODUCT_FAVORITE_API, {
        headers: {
          Authorization: `Bearer ${auth}`,
        },
      })
      dispatch(FAVORITE_ACTION(response.data.items))
    } catch (error) {
      return rejectWithValue(error.message)
    }
  },
)

export const PROFILE_DELETE_ASYNC = createAsyncThunk(
  'auth/PROFILE_DELETE_ASYNC',
  async (_, { rejectWithValue, dispatch, getState }) => {
    try {
      const { auth } = getState().auth

      const response = await axios.delete(PROFILE_DELETE_API, {
        headers: {
          Authorization: `Bearer ${auth}`,
        },
      })
      return response.data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  },
)
