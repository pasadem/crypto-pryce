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
      .addCase(fetchInitialData.fulfilled, ratesAdapter.addOne)
  },
});

export const { actions } = ratesSlice;
export const selectors = ratesAdapter.getSelectors((state) => state.rates);
export default ratesSlice.reducer;


/* {
    "time": {
        "updated":"Jul 22, 2022 06:41:00 UTC","updatedISO":"2022-07-22T06:41:00+00:00","updateduk":"Jul 22, 2022 at 07:41 BST"
    },
    "disclaimer":"This data was produced from the CoinDesk Bitcoin Price Index (USD). Non-USD currency data converted using hourly conversion rate from openexchangerates.org","chartName":"Bitcoin",
    "bpi":{
        "USD":{
            "code":"USD","symbol":"&#36;","rate":"23,151.6955","description":"United States Dollar","rate_float":23151.6955
        },
        "GBP":{
            "code":"GBP","symbol":"&pound;","rate":"19,345.3716","description":"British Pound Sterling","rate_float":19345.3716
        },
        "EUR":{
            "code":"EUR","symbol":"&euro;","rate":"22,553.1316","description":"Euro","rate_float":22553.1316
        }
    }
} */