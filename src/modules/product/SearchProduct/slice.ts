import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  search: {
    query: '',
    skip: 0,
    limit: 10,
  },
  isOpen: false,
};
const slice = createSlice({
  name: 'commandPalette',
  initialState,
  reducers: {
    open(state) {
      state.isOpen = true;
      return state;
    },
    close(state) {
      state.isOpen = false;
    },
    search(state, action) {
      const { query = '', skip = 0, limit = 10 } = action.payload;
      state.search = {
        query,
        limit,
        skip,
      };
    },
  },
});

const { actions, reducer } = slice;

export { actions };
export default reducer;
