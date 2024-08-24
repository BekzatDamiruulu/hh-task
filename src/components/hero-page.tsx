import { createSelector } from "@reduxjs/toolkit";
import { useParams } from "react-router-dom";
import { useAppSelector, type RootState } from "../store/store";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";
export function HeroPage() {
  const navigate = useNavigate();
  const { heroId } = useParams();
  const heroSelector = createSelector(
    (state: RootState) => state.heroes.heroes,
    (heroes) => {
      return heroes[heroId!];
    }
  );
  const hero = useAppSelector(heroSelector);
  return (
    <>
      {hero ? (
        <section className="w-[1100px] m-auto p-9 flex items-center justify-start">
          <div className="w-[300px] h-[300px]">
            <img
              src={`${hero.thumbnail.path}.${hero.thumbnail.extension}`}
              alt={hero.name}
              className="block w-full h-full object-contain"
            />
          </div>
          <div className="ml-[50px] w-[550px]">
            <h2 className="font-semibold text-2xl">{hero.name}</h2>
            <p
              className={clsx("mt-6 text-lg font-normal ", {
                "text-red-400": !hero.description?.trim(),
              })}
            >
              {hero.description?.trim()
                ? hero.description
                : "Описание о герое отсутствует "}
            </p>
            <p className="mt-6 text-base font-bold">
              Изменен : {hero.modified.split("T")[0]}
            </p>
            <button
              className=" mt-5 h-10 w-40 flex items-center justify-center border-[2px]  border-cyan-600 rounded"
              onClick={() => navigate(-1)}
            >
              Назад
            </button>
          </div>
        </section>
      ) : (
        <h2>Герой не был найден : {"("}</h2>
      )}
    </>
  );
}
