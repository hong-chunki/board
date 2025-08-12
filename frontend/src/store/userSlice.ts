import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type User = {
  id: string;
  nickname: string;
};

type UserState = {
  user: User | null;
  isLoggedIn: boolean;
  hydrated: boolean;
};

const initialState: UserState = {
  user: null,
  isLoggedIn: false,
  hydrated: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
    },
    hydrateFromStorage: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
      state.isLoggedIn = !!action.payload;
      state.hydrated = true;
    },
  },
});

export const { login, logout, hydrateFromStorage } = userSlice.actions;
export default userSlice.reducer;