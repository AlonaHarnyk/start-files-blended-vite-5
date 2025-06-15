import { createSlice } from '@reduxjs/toolkit';
import { getCurrentCurrency } from './operations';

const currencySlice = createSlice({
  name: 'currency',
  initialState: {
    currency: {
      baseCurrency: '',
    },
  },
  reducers: {
    setDefaultBaseCurrency(state, { payload }) {
      state.currency.baseCurrency = payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(getCurrentCurrency.fulfilled, (state, { payload }) => {
      state.currency.baseCurrency = payload;
    });
  },
});

export const { setDefaultBaseCurrency } = currencySlice.actions;
export default currencySlice.reducer;
