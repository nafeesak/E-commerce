
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/users'; // Ensure this matches your backend port

// Get user info from localStorage if it exists
const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const initialState = {
  userInfo: userInfoFromStorage,
  loading: false,
  error: null,
  success: false, // For registration success message
};

// Async Thunk for user login
export const login = createAsyncThunk(
  'user/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const response = await axios.post(`${API_URL}/login`, { email, password }, config);
      localStorage.setItem('userInfo', JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || error.message);
    }
  }
);

// Async Thunk for user registration
export const register = createAsyncThunk(
  'user/register',
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const response = await axios.post(`${API_URL}/register`, { name, email, password }, config);
      localStorage.setItem('userInfo', JSON.stringify(response.data)); // Auto-login after register
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || error.message);
    }
  }
);

// Async Thunk for updating user profile
export const updateUserProfile = createAsyncThunk(
  'user/updateProfile',
  async (user, { getState, rejectWithValue }) => {
    try {
      const { user: { userInfo } } = getState(); // Get token from current state

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const response = await axios.put(`${API_URL}/profile`, user, config);
      localStorage.setItem('userInfo', JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || error.message);
    }
  }
);


const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('userInfo'); // Clear localStorage
      state.userInfo = null;
      state.loading = false;
      state.error = null;
      state.success = false;
    },
    clearUserError: (state) => {
        state.error = null;
    },
    clearUserSuccess: (state) => {
        state.success = false;
    }
  },
  extraReducers: (builder) => {
    builder
      // Handle login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
        state.error = null; // Clear any previous errors
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.userInfo = null; // Clear user info on login failure
      })
      // Handle register
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
        state.success = true; // Indicate successful registration/login
        state.error = null;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.userInfo = null;
        state.success = false;
      })
      // Handle update profile
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
        state.success = true; // Indicate successful update
        state.error = null;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

export const { logout, clearUserError, clearUserSuccess } = userSlice.actions; // Export sync actions
export default userSlice.reducer;
