import { createSlice } from "@reduxjs/toolkit";

const initialState = { writing: {}, reading: {}, listening: {} };

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

    resetAllModuleData: (state, action) => {
      state.reading = initialState.reading;
      state.writing = initialState.writing;
      state.listening = initialState.listening;
    },
  },
});

// Export action creators
export const { setModuleData, resetAllModuleData } = moduleSlice.actions;

// Export reducer as default
export default moduleSlice.reducer;
