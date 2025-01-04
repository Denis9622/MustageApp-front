import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCampers = createAsyncThunk(
  'vehicles/fetchCampers',
  async ({ filters, page = 1 }, { rejectWithValue }) => {
    const formattedFilters = {
      'filter[AC]': filters.ac || undefined,
      'filter[TV]': filters.tv || undefined,
      page,
    };

    Object.keys(formattedFilters).forEach(key => {
      if (formattedFilters[key] === undefined) {
        delete formattedFilters[key];
      }
    });

    try {
      const response = await axios.get(
        'https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers',
        { params: formattedFilters }
      );
      const data = response.data;
      return { data: Array.isArray(data) ? data : data.items || [], page };
    } catch (error) {
      return rejectWithValue(error.message || 'Network error');
    }
  }
);

export const fetchCamperDetails = createAsyncThunk(
  'vehicles/fetchCamperDetails',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers/${id}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || 'Network error');
    }
  }
);

const vehiclesSlice = createSlice({
  name: 'vehicles',
  initialState: {
    list: [],
    camperDetails: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchCampers.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCampers.fulfilled, (state, action) => {
        const { data, page } = action.payload;
        state.list = page === 1 ? data : [...state.list, ...data];
        state.loading = false;
      })
      .addCase(fetchCampers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Ошибка при загрузке данных';
      })
      .addCase(fetchCamperDetails.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCamperDetails.fulfilled, (state, action) => {
        state.camperDetails = action.payload;
        state.loading = false;
      })
      .addCase(fetchCamperDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Ошибка при загрузке данных';
      });
  },
});

export default vehiclesSlice.reducer;
