import { createSlice } from "@reduxjs/toolkit";

const gameSlice = createSlice({
  name: "game",
  initialState: {
    progress: {
      colors: { score: 0, completed: false },
      numbers: { score: 0, completed: false },
      words: { score: 0, completed: false, streak: 0, wordPoolSize: 10 },
    },
  },
  reducers: {
    updateProgress: (state, action) => {
      const { game, score, completed, streak, wordPoolSize } = action.payload;
      state.progress[game] = {
        score,
        completed,
        streak: streak !== undefined ? streak : state.progress[game].streak,
        wordPoolSize:
          wordPoolSize !== undefined
            ? wordPoolSize
            : state.progress[game].wordPoolSize,
      };
    },
    resetProgress: (state) => {
      state.progress = {
        colors: { score: 0, completed: false },
        numbers: { score: 0, completed: false },
        words: { score: 0, completed: false, streak: 0, wordPoolSize: 10 },
      };
    },
  },
});

export const { updateProgress, resetProgress } = gameSlice.actions;
export default gameSlice.reducer;
