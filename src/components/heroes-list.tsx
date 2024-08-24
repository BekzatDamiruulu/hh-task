import { HeroItem } from "./hero-item";
import { useFetchHeroes } from "../hooks/useFetchHeroes";
import { ReactNode, useMemo, useState } from "react";
import clsx from "clsx";
import { useAppDispatch } from "../store/store";
import { heroesActions } from "../slices/heroes-slice";
import { HeroesServices } from "../services/heroes-service";
export function HeroesList() {
  const [status, heroes] = useFetchHeroes();
  const [filter, setFilter] = useState<"onlyLiked" | "all">("all");

  const filteredHeroes = useMemo(() => {
    const heroesItems: ReactNode[] = [];
    Object.entries(heroes).forEach((heroInArray) => {
      if (heroInArray[1].isLiked && filter === "onlyLiked") {
        heroesItems.push(
          <HeroItem key={heroInArray[0]} heroId={+heroInArray[0]} />
        );
      }
      if (filter === "all") {
        heroesItems.push(
          <HeroItem key={heroInArray[0]} heroId={+heroInArray[0]} />
        );
      }
    });
    return heroesItems;
  }, [filter, heroes]);

  return (
    <>
      {status === "loading" ? (
        <h1 className="mt-5 px-6 text-center">
          Загрузка данных займет несколько минуты...
        </h1>
      ) : null}
      {status === "loaded" ? (
        <div className="  lg:w-[1100px]  m-auto">
          <div className="  p-8 flex flex-col justify-start items-center ">
            <button
              onClick={() => setFilter("all")}
              className={clsx(
                "h-10 border-[2px] border-teal-400 w-[250px] rounded-lg",
                { "bg-teal-400 text-white font-semibold": filter === "all" }
              )}
            >
              Показать все
            </button>
            <button
              onClick={() => setFilter("onlyLiked")}
              className={clsx(
                "h-10 border-[2px] border-teal-400 w-[250px] mt-2 rounded-lg",
                { "bg-teal-400 text-white font-semibold": filter !== "all" }
              )}
            >
              Показать понравившийся
            </button>
          </div>
          <section className=" p-8 grid grid-cols-[repeat(auto-fit,220px)] grid-rows-[minmax(360px,auto)] auto-rows-[minmax(360px,auto)]  gap-5 justify-center">
            {filteredHeroes}
          </section>
          <LoadBtn />
        </div>
      ) : null}
    </>
  );
}

function LoadBtn() {
  const [isLoading, setLoading] = useState<boolean>(false);
  const { getHeroes } = HeroesServices;
  const dispatch = useAppDispatch();
  const [pagingation, setPagination] = useState<{
    offset: number;
    limit: number;
  }>({ offset: 8, limit: 8 });
  const { loadMoreHeroes, catchedError } = heroesActions;
  return (
    <button
      className=" block h-10 w-[200px] border-[2px] border-fuchsia-600 rounded-md m-auto disabled:text-slate-400 font-semibold uppercase"
      disabled={isLoading}
      onClick={() => {
        setLoading(true);
        getHeroes(pagingation.offset, pagingation.limit)
          .then((heroes) => {
            console.log(heroes);
            dispatch(loadMoreHeroes(heroes));
            setLoading(false);
            setPagination({
              offset: pagingation.offset + 8,
              limit: pagingation.limit + 8,
            });
          })
          .catch(() => {
            dispatch(catchedError("error in load more button"));
          });
      }}
    >
      Загрузить еще
    </button>
  );
}
