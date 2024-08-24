import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { type IHero } from "../services/heroes-service";
const initialState: IHeroesInit = { status: "idle", heroes: {}, error: null };

const heroesSlice = createSlice({
  initialState,
  name: "heroes",
  reducers: {
    loadedHeroes: (state, action: PayloadAction<IHero[]>) => {
      action.payload.forEach((hero) => {
        state.heroes[hero.id] = hero;
      });
      state.status = "loaded";
    },
    startLoading: (state) => {
      state.status = "loading";
    },
    catchedError: (state, action: PayloadAction<string>) => {
      state.status = "error";
      state.error = action.payload;
    },
    likeHero: (
      state,
      {
        payload: { heroId, isLiked },
      }: PayloadAction<{ heroId: number; isLiked: boolean }>
    ) => {
      state.heroes[heroId].isLiked = isLiked;
    },
    deleteHero: (state, action: PayloadAction<number>) => {
      delete state.heroes[action.payload];
    },
    loadMoreHeroes: (state, action: PayloadAction<IHero[]>) => {
      action.payload.forEach((hero) => {
        state.heroes[hero.id] = hero;
      });
    },
  },
});
export const heroesReducer = heroesSlice.reducer;
export const heroesActions = heroesSlice.actions;

interface IHeroesInit {
  status: "idle" | "loading" | "loaded" | "error";
  heroes: { [heroId: string]: IHero };
  error: string | null;
}
