import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState, createContext } from "react";
import styles from "../styles/Home.module.css";
import axios from "axios";
import { Movie } from "../types";
import MovieCard from "../components/MovieCard";
import NavBar from "../components/NavBar";

const Home: NextPage = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);

  const fetchMovies: any = (page: Number) => {
    return axios
      .get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.NEXT_PUBLIC_MOVIE_API_KEY}&language=en-US&page=${page}`
      )
      .then((res) => {
        setMovies(res.data.results);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const renderMovies = movies.map((movie: Movie, i) => {
    return (
      <MovieCard
        key={i}
        title={movie.title}
        poster_path={movie.poster_path}
        overview={movie.overview}
        id={movie.id}
      />
    );
  });

  return (
    <>
      <NavBar />
      <div className="mx-5">
        <div className="flex  flex-row flex-wrap">
          {movies ? renderMovies : null}
        </div>
      </div>
    </>
  );
};

export default Home;
