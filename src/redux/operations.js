import { createAsyncThunk } from '@reduxjs/toolkit';

import { getUserInfo } from '../service/opencagedataApi';

export const getCurrentCurrency = createAsyncThunk(
  'currency/getCurrent',
  async ({ latitude, longitude }, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const { baseCurrency } = state.currency;
      if (baseCurrency) {
        return baseCurrency;
      }
      const { results } = await getUserInfo({
        latitude,
        longitude,
      });
      return results[0].annotations.currency.iso_code;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
