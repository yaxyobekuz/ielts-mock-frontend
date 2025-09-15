import { createSlice } from "@reduxjs/toolkit";

// Initial state
const initialState = { answers: {}, modules: {}, userInfo: {}, contents: {} };

export const storeSlice = createSlice({
  initialState,
  name: "store",
  reducers: {
    updatePropertyFromStore: (state, action) => {
      const { name, property, value } = action.payload;
      if (!state[name]) return;
      state[name][property] = value;
    },

    resetDataFromStore: (state, action) => {
      const { name } = action.payload;
      if (!state[name]) return;
      state[name] = initialState[name];
    },
  },
});

// Export actions
export const { updatePropertyFromStore, resetDataFromStore } =
  storeSlice.actions;

// Export reducer
export default storeSlice.reducer;
