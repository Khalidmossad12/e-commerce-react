import { createSlice } from "@reduxjs/toolkit";



let initialState = {counter: parseInt(localStorage.getItem('cartCount')) || 0,  userName:''}

let counterSlice = createSlice({
    name : 'counterSlice',
    initialState,
    reducers:{ 
        increase:(state , action)=>{
            state.counter +=1
            localStorage.setItem('cartCount', state.counter);
        },
        decrease:(state , action)=>{
            state.counter -=1
            localStorage.setItem('cartCount', state.counter);
        },
        increaseByAmount:(state,action)=>{
            state.counter +=action.payload
        }
    }
})

export let counterReducer = counterSlice.reducer
export let {increase , decrease , increaseByAmount} = counterSlice.actions