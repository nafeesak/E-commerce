import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define base URL for your backend API
const API_URL = 'http://localhost:5000/api/products'; // Ensure this matches your backend port

// Async Thunk for fetching all products
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || error.message);
    }
  }
);

// Async Thunk for fetching a single product
export const fetchProductDetails = createAsyncThunk(
  'products/fetchProductDetails',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`<span class="math-inline">\{API\_URL\}/</span>{id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || error.message);
    }
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState: {
    allProducts: [],
    productDetails: {},
    loading: false,
    error: null,
  },
  reducers: {
    // You can add sync reducers here if needed
  },
  extraReducers: (builder) => {
    builder
      // Handle fetchProducts
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.allProducts = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle fetchProductDetails
      .addCase(fetchProductDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.productDetails = {}; // Clear previous details
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.productDetails = action.payload;
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.productDetails = {};
      });
  },
});

export default productSlice.reducer;
