import { configureStore } from "@reduxjs/toolkit";
import { counterReducer } from "./CounterSlice";
import { categoriesReducer } from './CategorySlice';


const initialState = {
    cart: {
      counter: parseInt(localStorage.getItem('cartCount')) || 0,
    },
  };

// Store Waiting the reducer 
export let store =  configureStore({
    reducer:{
        counter:counterReducer, 
        categories:categoriesReducer
    },
    preloadedState:initialState
})