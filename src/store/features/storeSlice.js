import { createSlice } from "@reduxjs/toolkit";

// Initial state
const initialState = { answers: {} };

export const storeSlice = createSlice({
  initialState,
  name: "store",
  reducers: {
    updatePropertyFromStore: (state, action) => {
      const { name, property, value } = action.payload;
      if (!state[name]) return;
      state[name][property] = value;
    },
  },
});

// Export actions
export const { updatePropertyFromStore } = storeSlice.actions;

// Export reducer
export default storeSlice.reducer;
