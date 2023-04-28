import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AuthDto } from '@shared/types';

import { RootState } from '../store';

export interface AuthState {
  loggedUser: AuthDto | null;
}

const initialState: AuthState = {
  loggedUser: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logIn: (state: AuthState, action: PayloadAction<AuthDto>): void => {
      state.loggedUser = action.payload;
    },
    logOut: (state: AuthState): void => {
      state.loggedUser = null;
    },
  },
});

export const { logIn, logOut } = authSlice.actions;

export const selectLoggedUser = (state: RootState): AuthDto | null =>
  state.auth.loggedUser;

export default authSlice;
