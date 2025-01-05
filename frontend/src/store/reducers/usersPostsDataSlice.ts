import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUserPostDataSlice } from '../../interfaces/interfaces';
import { TUsersPosts } from '../../types/types';

const initialState: IUserPostDataSlice = {
  value: null,
};

export const usersPostsDataSlice = createSlice({
  name: 'postData',
  initialState,
  reducers: {
    addusersPostsData: (state, action: PayloadAction<TUsersPosts[]>) => {
      state.value = action.payload;
    },
  },
});

export const { addusersPostsData } = usersPostsDataSlice.actions;

export default usersPostsDataSlice.reducer;
