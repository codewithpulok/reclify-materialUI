'use client';

const { createSlice } = require('@reduxjs/toolkit');

const counterSlice = createSlice({
  name: 'counterSlice',
  initialState: {
    count: 0,
  },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export default counterSlice;
