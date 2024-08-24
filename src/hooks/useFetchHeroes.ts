import { HeroesServices, IHero } from "../services/heroes-service";
import { useAppDispatch, useAppSelector } from "../store/store";
import { heroesActions } from "../slices/heroes-slice";
import { useEffect } from "react";

export const useFetchHeroes = function (): [
  status: "idle" | "loading" | "loaded" | "error",
  heroes: { [heroId: string]: IHero }
] {
  const dispatch = useAppDispatch();
  const { loadedHeroes, catchedError, startLoading } = heroesActions;
  const { getHeroes } = HeroesServices;
  const status = useAppSelector((state) => state.heroes.status);
  const heroes = useAppSelector((state) => state.heroes.heroes);
  useEffect(() => {
    if (status !== "loaded") {
      dispatch(startLoading());
      getHeroes(0, 8)
        .then((heroes) => {
          dispatch(loadedHeroes(heroes));
        })
        .catch((error) => {
          dispatch(catchedError(error.message));
        });
    }
  }, []);
  return [status, heroes];
};
