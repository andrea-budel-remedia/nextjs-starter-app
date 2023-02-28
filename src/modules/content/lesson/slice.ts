import { RootState } from '@/utils/store';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  list: [],
};

export const lessonSlice = createSlice({
  name: 'lessons',
  initialState,
  reducers: {},
});

export default lessonSlice.reducer;
export const selectLessons = (state: RootState) => state.lessons.list;
