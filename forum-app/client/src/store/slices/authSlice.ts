import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { User } from 'model';
import { RootState } from '../store';

export interface AuthState {
  loggedUser: User | null;
}

const initialState: AuthState = {
  loggedUser: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logIn: (state: AuthState, action: PayloadAction<User>): void => {
      state.loggedUser = action.payload;
    },
    logOut: (state: AuthState): void => {
      state.loggedUser = null;
    },
  },
});

export const { logIn, logOut } = authSlice.actions;

export const selectLoggedUser = (state: RootState): User | null =>
  state.auth.loggedUser;

export default authSlice;
