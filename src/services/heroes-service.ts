import { heroesApi, apiKey } from "../api/api";

export const HeroesServices = {
  getHeroes: (offset: number, limit: number): Promise<IHero[]> => {
    return heroesApi
      .get(
        `characters?limit=${limit}&offset=${offset}&orderBy=name&apikey=${apiKey}`
      )
      .then((response): IHero[] => response.data.data.results);
  },
};

export interface IHero {
  id: number;
  name: string;
  description: string;
  modified: string;
  thumbnail: IThumnail;
  resourceURI: string;
  isLiked: boolean;
}
export interface IThumnail {
  path: string;
  extension: string;
}
