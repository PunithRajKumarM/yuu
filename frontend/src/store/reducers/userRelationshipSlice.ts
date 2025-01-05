import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUserRelationshipStateSlice } from '../../interfaces/interfaces';
import { TIDArray } from '../../types/types';

const initialState: IUserRelationshipStateSlice = {
  followers: [],
  followings: [],
};

const userRelationshipSlice = createSlice({
  name: 'userRelationship',
  initialState,
  reducers: {
    addUserRelationships: (state, action: PayloadAction<IUserRelationshipStateSlice>) => {
      state.followers = action.payload.followers;
      state.followings = action.payload.followings;
    },
  },
});

export const { addUserRelationships } = userRelationshipSlice.actions;
export default userRelationshipSlice.reducer;
