import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  age: 0,
  learningGoals: "",
  volume: 50,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData(state, action) {
      state.name = action.payload.name;
      state.age = action.payload.age;
      state.learningGoals = action.payload.learningGoals;
    },
    setVolume(state, action) {
      state.volume = action.payload;
    },
  },
});

export const { setUserData, setVolume } = userSlice.actions;
export default userSlice.reducer;
