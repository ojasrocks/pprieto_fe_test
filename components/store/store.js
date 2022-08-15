import { configureStore } from '@reduxjs/toolkit'
import favsReducer from './storeFavs'

export default configureStore({
  reducer: {
    favs : favsReducer,
  },
})
