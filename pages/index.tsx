import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import axios from "axios";
import { Movie } from "../types";

const Home: NextPage = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);

  const fetchMovies: any = (page: Number) => {
    return axios
      .get(
        `https://api.themoviedb.org/3/movie/popular?api_key=12f5be9e44863cafc7c5762441a2017a&language=en-US&page=${page}`
      )
      .then((res) => {
        setMovies(res.data.results);
        console.log(res.data.results);
      });
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const renderMovies = movies.map((movie: Movie, i) => {
    return (
      <div key={i}>
        <p>{movie.title}</p>
        <img
          className="w-[500px]"
          src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
        />
      </div>
    );
  });

  return (
    <div className="m-5">
      Hello
      {movies && renderMovies}
    </div>
  );
};

export default Home;
