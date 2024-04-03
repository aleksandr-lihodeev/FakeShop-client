import { configureStore } from '@reduxjs/toolkit'
import authSlicer from './slicers/authSlicer'
import profileSlicer from './slicers/profileSlicer'
import cocktailSlicer from './slicers/cocktailSlicer'
import cartSlicer from './slicers/cartSlicer'
import loaderSlicer from './slicers/loaderSlicer'
import favoriteSlicer from './slicers/favoriteSlicer'

const store = configureStore({
  reducer: {
    auth: authSlicer,
    profile: profileSlicer,
    cocktail: cocktailSlicer,
    cart: cartSlicer,
    loader: loaderSlicer,
    favorite: favoriteSlicer,
  },
})

export default store
