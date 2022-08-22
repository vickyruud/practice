import Image from "next/image";
import React from "react";

const MovieCard = ({
  title,
  poster_path,
  overview,
  id,
}: {
  title: string;
  poster_path: string;
  overview: string;
  id: number;
}) => {
  return (
    <div className="max-w-sm m-5 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
      <a href={`/movie/${id}`}>
        <Image
          width={500}
          height={700}
          src={`https://image.tmdb.org/t/p/original/${poster_path}`}
        />
      </a>
      <div className="p-5 flex flex-col ">
        <a href={`/movie/${id}`}>
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {title}
          </h5>
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {overview}
        </p>
      </div>
    </div>
  );
};

export default MovieCard;
