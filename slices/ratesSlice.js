import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const ratesAdapter = createEntityAdapter();

const initialState = ratesAdapter.getInitialState();

export const fetchInitialData = createAsyncThunk(
  'rates/fetchAll',
  async () => {
    const  { data }  = await axios.get(`https://api.coindesk.com/v1/bpi/currentprice.json`);
    console.log(data)
    return data;
  }, 
);

const ratesSlice = createSlice({
  name: 'rates',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchInitialData.fulfilled, ratesAdapter.setOne)
  },
});

export const { actions } = ratesSlice;
export const selectors = ratesAdapter.getSelectors((state) => state.rates);
export default ratesSlice.reducer;
