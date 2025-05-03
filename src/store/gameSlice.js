import { createSlice } from "@reduxjs/toolkit";

const gameSlice = createSlice({
  name: "game",
  initialState: {
    progress: {
      colors: { score: 0, completed: false },
      numbers: { score: 0, completed: false },
      words: { score: 0, completed: false, streak: 0, wordPoolSize: 10, maxDifficulty: 1 },
    },
  },
  reducers: {
    updateProgress: (state, action) => {
      const {
        game,
        score = state.progress[game]?.score ?? 0,
        completed = state.progress[game]?.completed ?? false,
        streak = state.progress[game]?.streak ?? 0,
        wordPoolSize = state.progress[game]?.wordPoolSize ?? 10,
        maxDifficulty = state.progress[game]?.maxDifficulty ?? 1,
      } = action.payload;

      if (!state.progress[game]) {
        console.warn(`Invalid game key: ${game}. Initializing with defaults.`);
        state.progress[game] = {
          score: 0,
          completed: false,
          streak: 0,
          maxDifficulty: game === "words" ? 1 : undefined,
        };
      }

      state.progress[game] = {
        score,
        completed,
        ...(game === "words" && {
          streak,
          wordPoolSize,
          maxDifficulty,
        }),
      };
    },
    resetProgress: (state) => {
      state.progress = {
        colors: { score: 0, completed: false },
        numbers: { score: 0, completed: false },
        words: { score: 0, completed: false, streak: 0, wordPoolSize: 10, maxDifficulty: 1 },
      };
    },
  },
});

export const { updateProgress, resetProgress } = gameSlice.actions;
export default gameSlice.reducer;