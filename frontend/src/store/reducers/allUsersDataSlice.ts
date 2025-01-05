import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUserData, TUserDataSlice } from '../../interfaces/interfaces';

const initialState: TUserDataSlice = {
  value: null,
};

export const allUsersDataSlice = createSlice({
  name: 'allUsersData',
  initialState,
  reducers: {
    addAllUsersData: (state, action: PayloadAction<IUserData[]>) => {
      state.value = action.payload;
    },
  },
});

export const { addAllUsersData } = allUsersDataSlice.actions;

export default allUsersDataSlice.reducer;
