import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import { SelectedMovie } from "../../types";
import Image from "next/image";
import YouTube from "react-youtube";

const Movie = () => {
  const router = useRouter();
  const { id } = router.query;
  const [selectedMovie, setSelectedMovie] = useState<SelectedMovie>([]);
  const [videoId, setVideoId] = useState("");

  const fetchMovieDetails = () => {
    return axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.NEXT_PUBLIC_MOVIE_API_KEY}&language=en-US`
      )
      .then((res) => {
        setSelectedMovie(res.data);
      });
  };

  const searchTrailerHelper = (result: any) => {
    const videoName = result.name.toLowerCase();

    if (videoName.includes("trailer")) {
      return result;
    } else {
      return false;
    }
  };

  const searchTrailer = (results: any) => {
    return results.find(searchTrailerHelper);
  };

  const getVideo = () => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${process.env.NEXT_PUBLIC_MOVIE_API_KEY}&language=en-US`
      )
      .then((res) => {
        console.log(res.data.results);
        const foundTrailer = searchTrailer(res.data.results);
        if (foundTrailer) {
          setVideoId(foundTrailer.key);
        } else {
          setVideoId("");
        }
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    fetchMovieDetails();
    getVideo();
  }, [id]);

  return (
    <div className="flex flex-row p-5 m-5 justify-around">
      <div>
        <Image
          width={500}
          height={700}
          src={`https://image.tmdb.org/t/p/original/${selectedMovie.poster_path}`}
        />
        <p>Movie: {selectedMovie.title}</p>
        <p>{selectedMovie.tagline}</p>
      </div>
      {videoId ? <YouTube videoId={videoId} /> : null}
    </div>
  );
};

export default Movie;
