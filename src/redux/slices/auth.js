import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  users: [],
  isLoading: false,
  isError: false,
  isAuthenticated: false,
  signupStatus: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  signupError: null,
};

export const signup = createAsyncThunk('signup', async ({ userData }) => {
  try {
    const response = await fetch('http://localhost:3000/api/todos/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error('Failed to add user');
    }

    const data = await response.json();
    return data.user;
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: 'Could not add user',
    };
  }
});

export const signin = createAsyncThunk('signin', async ({ userData }) => {
  try {
    const response = await fetch('http://localhost:3000/api/todos/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error('Failed to signin user');
    }

    const data = await response.json();
    return data.user;
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: 'Could not sign in user',
    };
  }
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state) => {
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.isAuthenticated = false;
    },
    signupStart: (state) => {
      state.signupStatus = 'loading';
      state.signupError = null;
    },
    signupSuccess: (state) => {
      state.signupStatus = 'succeeded';
      state.isAuthenticated = true; // Automatically log in after successful signup
    },
    signupFailure: (state, action) => {
      state.signupStatus = 'failed';
      state.signupError = action.payload;
    },
  },
  extraReducers: (builder) => {
    //sign up
    builder
      .addCase(signup.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.users = action.payload;
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(signup.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });

    //signin
    builder
      .addCase(signin.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(signin.fulfilled, (state, action) => {
        state.users = action.payload;
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(signin.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const { login, logout, signupStart, signupSuccess, signupFailure } = authSlice.actions;
export default authSlice.reducer;
