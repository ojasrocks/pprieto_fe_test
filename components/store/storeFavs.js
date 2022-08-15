import { createSlice } from '@reduxjs/toolkit'

export const storeFavs = createSlice({
  name: 'favs',
  initialState: {
    value: [],
  },
  reducers: {
    increment: (state, action) => {
      state.value = state.value.concat(action.payload)
    },
    decrement: (state, action) => {
        console.log('state.value',state.value);
      state.value = state.value.filter(el => el !== action.payload)
    },
    initialize: (state, action) => {
      state.value = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { increment, decrement, initialize } = storeFavs.actions

export default storeFavs.reducer