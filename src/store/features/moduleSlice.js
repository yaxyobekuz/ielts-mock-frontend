import { createSlice } from "@reduxjs/toolkit";

const initialState = { writing: {}, reading: {}, speaking: {}, listening: {} };

export const moduleSlice = createSlice({
  initialState,
  name: "module",
  reducers: {
    // Set complete module data
    setModuleData: (state, action) => {
      const { type, data, id } = action.payload;

      if (state[type]) {
        state[type][id] = data;
      } else {
        console.error(`Test ${id}: ${type} module is not defined`);
      }
    },
  },
});

// Export action creators
export const { setModuleData } = moduleSlice.actions;

// Export reducer as default
export default moduleSlice.reducer;
