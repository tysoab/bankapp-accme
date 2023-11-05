import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: false,
  changed: false
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    replaceUserData(state, action){
      state.user = action.payload
    },
    linkAccount(state){
      state.changed = true;
    }
  }

  
});

export default userSlice.reducer;

export const userActions = userSlice.actions;
