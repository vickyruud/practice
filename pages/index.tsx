import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import axios from "axios";

const Home: NextPage = () => {
  const [movies, setMovies] = useState([]);

  const fetchMovies: any = () => {
    return axios
      .get(
        "https://api.themoviedb.org/3/movie/popular?api_key=12f5be9e44863cafc7c5762441a2017a&language=en-US&page=1"
      )
      .then((res) => {
        setMovies(res.data.results);
      });
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const renderMovies = movies.map((movie) => {
    return <p>{movie.title}</p>;
  });

  return (
    <div>
      Hello
      {movies && renderMovies}
    </div>
  );
};

export default Home;
