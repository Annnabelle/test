// import { createStore, combineReducers } from 'redux'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import clientReducer from './clientReducer'


// const rootReducer = combineReducers()

export const store = configureStore({
  reducer: {
    clients: clientReducer,
  }
})