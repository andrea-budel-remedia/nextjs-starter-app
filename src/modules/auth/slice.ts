import { RootState } from '@/utils/store';
import { createSlice } from '@reduxjs/toolkit';

enum AuthStatus {
  UN_AUTHENTICATED = 'UN_AUTHENTICATED',
  AUTHENTICATED = 'AUTHENTICATED',
}
type AuthProfile = {
  name?: string;
  email: string;
};
const initialState = {
  token: null,
  status: AuthStatus.UN_AUTHENTICATED,
  profile: null,
};
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signIn(state, action) {
      state.status = AuthStatus.AUTHENTICATED;
      state.profile = action.payload.profile;
      state.token = action.payload.token;
    },
    signOut(state) {
      state = initialState;
    },
  },
});

export const { signIn, signOut } = authSlice.actions;
export const selectSession = (state: RootState) =>
  state.auth ? state.auth : null;
export default authSlice.reducer;
