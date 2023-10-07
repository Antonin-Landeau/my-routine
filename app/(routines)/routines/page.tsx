"use client";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import Link from "next/link";
import React, { FC, useState } from "react";
import SearchRoutineInput from "./components/SearchRoutineInput";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "@/hooks/useDebounce";
import { Loader2 } from "lucide-react";
import axios from "axios";
import { Routine } from "@prisma/client";

interface RoutinesPageProps {
  searchParams: {
    search: string;
  };
}

const RoutinesPage: FC<RoutinesPageProps> = ({
  searchParams,
}: RoutinesPageProps) => {
  const [search, setSearch] = useState<string>("");
  const debounceSearch = useDebounce(search);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["routines", debounceSearch],
    queryFn: async () => {
      if (debounceSearch) {
        const searchRes = await axios.get<Routine[]>(
          `/api/routines/search?&q=${debounceSearch}`
        );
        console.log(searchRes);
        return searchRes.data;
      }
      const res = await axios.get<Routine[]>(`/api/routines`);
      return res.data;
    },
  });

  return (
    <main className="mt-20 p-10 ">
      <SearchRoutineInput onChange={(e) => setSearch(e)} />
      <section className="w-full bg-red">
        {isLoading && (
          <Loader2 className="mx-auto mt-20 h-10 w-10 animate-spin text-gray-500" />
        )}

        <div className="mx-auto py-10 grid grid-cols-3 w-fit gap-5">
          {data &&
            data.map((routine, index) => (
              <Link
                className="block w-fit"
                href={`/routine/${routine.id}`}
                key={index}
              >
                <div className="w-72 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 h-56">
                  <img
                    className="rounded-t-lg h-24 w-full object-cover"
                    src={routine.mainImg}
                    alt=""
                  />
                  <div className="p-4">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                      {routine.title}
                    </h5>
                    <p className="mb-3 text-sm font-normal text-gray-700 dark:text-gray-400 line-clamp-2">
                      {routine.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
        </div>
        {data && data.length === 0 && <div>Aucuns resultas</div>}
        {isError && <div>Somthign went wrong</div>}
      </section>
    </main>
  );
};

export default RoutinesPage;
