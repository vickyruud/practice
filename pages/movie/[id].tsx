import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import { SelectedMovie } from "../../types";
import Image from "next/image";

const Movie = () => {
  const router = useRouter();
  const { id } = router.query;
  console.log(id);
  const [selectedMovie, setSelectedMovie] = useState<SelectedMovie>([]);

  const fetchMovieDetails = () => {
    return axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=12f5be9e44863cafc7c5762441a2017a&language=en-US`
      )
      .then((res) => {
        console.log(res.data);
        setSelectedMovie(res.data);
      });
  };

  useEffect(() => {
    fetchMovieDetails();
  }, [id]);

  return (
    <div>{selectedMovie ? <p>Movie: {selectedMovie.title}</p> : null}</div>
  );
};

export default Movie;
