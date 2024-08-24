import { heroesActions } from "../slices/heroes-slice";
import { RootState, useAppDispatch, useAppSelector } from "../store/store";
import { Link } from "react-router-dom";
import { createSelector } from "@reduxjs/toolkit";
export function HeroItem({ heroId }: { heroId: number }) {
  const heroSelector = createSelector(
    (state: RootState) => state.heroes.heroes,
    (heroes) => {
      return heroes[heroId];
    }
  );
  const hero = useAppSelector(heroSelector);
  const dispatch = useAppDispatch();
  const { likeHero, deleteHero } = heroesActions;

  const name = cutName(hero.name);
  return (
    <div className="w-[220px] min-h-[360px] bg-slate-500 border-2 border-violet-600 rounded">
      <Link to={`/heroes/${heroId}`}>
        <div className=" h-[220px]">
          <img
            src={`${hero.thumbnail.path}.${hero.thumbnail.extension}`}
            alt={hero.name}
            className="block object-contain h-full w-full"
          />
        </div>
        <h2 className="font-bold text-2xl text-white uppercase px-2 mt-3 break-words">
          {name}
        </h2>
      </Link>
      <div className="mt-3 px-2 flex justify-start items-center">
        <button
          onClick={() => {
            dispatch(likeHero({ heroId: hero.id, isLiked: !hero.isLiked }));
          }}
          className="block w-[30px] h-[30px]"
        >
          {hero.isLiked ? (
            <svg
              fill="#ff1313"
              height="24"
              role="img"
              viewBox="0 0 48 48"
              width="24"
            >
              <path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path>
            </svg>
          ) : (
            <svg
              fill="#ff1313"
              height="24"
              role="img"
              viewBox="0 0 24 24"
              width="24"
            >
              <path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"></path>
            </svg>
          )}
        </button>
        <button
          onClick={() => {
            dispatch(deleteHero(hero.id));
          }}
          className="block w-[30px] h-[30px] ml-4"
        >
          <svg
            version="1.0"
            xmlns="http://www.w3.org/2000/svg"
            width="30px"
            height="30px"
            viewBox="0 0 512.000000 512.000000"
            preserveAspectRatio="xMidYMid meet"
          >
            <g
              transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
              fill="#000000"
              stroke="none"
            >
              <path
                d="M1801 5104 c-83 -22 -165 -71 -224 -133 -99 -104 -137 -210 -137
-383 l0 -107 -509 -3 c-497 -3 -510 -4 -537 -24 -53 -39 -69 -71 -69 -134 0
-63 16 -95 69 -134 l27 -21 2139 0 2139 0 27 21 c53 39 69 71 69 134 0 63 -16
95 -69 134 -27 20 -40 21 -537 24 l-509 3 0 107 c0 173 -38 279 -137 383 -61
64 -141 111 -228 134 -85 22 -1431 21 -1514 -1z m1485 -330 c60 -44 69 -67 72
-185 l4 -109 -801 0 -801 0 0 94 c0 102 9 137 43 175 48 52 32 51 769 48 676
-2 687 -2 714 -23z"
              />
              <path
                d="M575 3826 c-41 -18 -83 -69 -90 -109 -7 -36 129 -3120 144 -3270 7
-78 16 -113 44 -170 62 -132 171 -223 306 -259 61 -16 181 -17 1581 -17 1400
0 1520 1 1581 17 135 36 244 127 306 259 28 57 37 92 44 170 16 153 151 3243
144 3275 -9 39 -52 88 -92 104 -48 20 -3923 20 -3968 0z m3735 -353 c-1 -27
-31 -721 -69 -1544 -66 -1466 -68 -1497 -90 -1532 -12 -21 -40 -44 -65 -56
-42 -21 -46 -21 -1526 -21 -1480 0 -1484 0 -1526 21 -59 28 -84 72 -90 156 -6
77 -134 2944 -134 2992 l0 31 1750 0 1750 0 0 -47z"
              />
              <path
                d="M1590 3033 c-37 -14 -74 -50 -91 -88 -18 -41 -18 -59 21 -953 31
-715 42 -917 54 -939 62 -121 224 -122 283 -3 l22 45 -39 913 c-42 966 -40
941 -92 989 -40 37 -111 53 -158 36z"
              />
              <path
                d="M2495 3026 c-41 -18 -83 -69 -90 -109 -3 -18 -4 -442 -3 -944 3 -903
3 -912 24 -939 39 -53 71 -69 134 -69 63 0 95 16 134 69 21 27 21 34 21 966 0
932 0 939 -21 966 -11 15 -32 37 -46 47 -33 25 -113 32 -153 13z"
              />
              <path
                d="M3420 3029 c-33 -13 -68 -47 -86 -81 -11 -21 -23 -237 -54 -939 -38
-895 -39 -914 -21 -954 54 -123 224 -125 287 -4 12 23 22 211 54 941 39 894
39 913 21 953 -10 23 -33 52 -51 65 -37 26 -111 36 -150 19z"
              />
            </g>
          </svg>
        </button>
      </div>
    </div>
  );
}

function cutName(name: string) {
  if (name.length > 15) {
    const truncated = name.slice(0, 15);
    const lastSpaceIndex = truncated.lastIndexOf(" ");
    return (
      (lastSpaceIndex !== -1 ? truncated.slice(0, lastSpaceIndex) : truncated) +
      "..."
    );
  }
  return name;
}
