import { createSlice } from "@reduxjs/toolkit";

const gameSlice = createSlice({
  name: "game",
  initialState: {
    progress: {
      colors: { score: 0, completed: false },
      numbers: { score: 0, completed: false },
      words: { score: 0, completed: false },
    },
  },
  reducers: {
    updateProgress: (state, action) => {
      const { game, score, completed } = action.payload;
      state.progress[game] = { score, completed };
    },
    resetProgress: (state) => {
      state.progress = {
        colors: { score: 0, completed: false },
        numbers: { score: 0, completed: false },
        words: { score: 0, completed: false },
      };
    },
  },
});

export const { updateProgress, resetProgress } = gameSlice.actions;
export default gameSlice.reducer;
