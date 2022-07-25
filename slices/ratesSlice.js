import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const ratesAdapter = createEntityAdapter();

const initialState = ratesAdapter.getInitialState();

export const fetchInitialData = createAsyncThunk(
  'rates/fetchAll',
  async () => {
    const  { data }  = await axios.get(`https://api.coingecko.com/api/v3/coins/`);
    return data;
  }, 
);

const ratesSlice = createSlice({
  name: 'rates',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchInitialData.pending, (state) => {
      state.loading = 'loading';
    })
      .addCase(fetchInitialData.fulfilled, ratesAdapter.setMany)
      
  },
});

export const { actions } = ratesSlice;
export const selectors = ratesAdapter.getSelectors((state) => state.rates);
export default ratesSlice.reducer;
