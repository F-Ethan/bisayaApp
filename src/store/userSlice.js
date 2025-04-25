import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  age: 0,
  learningGoals: "",
  volume: 50,
  difficulty: "easy", // Default to easy
  customMaxNumber: null, // Null means use age-based range
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData(state, action) {
      state.name = action.payload.name;
      state.age = action.payload.age;
      state.learningGoals = action.payload.learningGoals;
      state.difficulty = action.payload.difficulty || state.difficulty;
    },
    setVolume(state, action) {
      state.volume = action.payload;
    },
    setCustomMaxNumber(state, action) {
      state.customMaxNumber = action.payload;
    },
  },
});

export const { setUserData, setVolume, setCustomMaxNumber } = userSlice.actions;
export default userSlice.reducer;
