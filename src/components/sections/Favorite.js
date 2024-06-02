import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Favorite = () => {
  const [movies, setMovies] = useState([]);
  const [trailers, setTrailers] = useState({});
  const apiKey = 'b9d0f880d08f6f661a756fd3f73c754e';

  // Función para obtener las películas mejor puntuadas
  const getTopRatedMovies = async () => {
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}`);
      setMovies(response.data.results);
    } catch (err) {
      console.log(err);
      setMovies([]);
    }
  };

  useEffect(() => {
    getTopRatedMovies();
  }, []);

  useEffect(() => {
    const fetchTrailers = async () => {
      const trailersData = {};
      for (const movie of movies) {
        const trailerKey = await getTrailerLink(movie.id);
        trailersData[movie.id] = trailerKey;
      }
      setTrailers(trailersData);
    };

    if (movies.length > 0) {
      fetchTrailers();
    }
  }, [movies]);

  const getTrailerLink = async (movieId) => {
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}`);
      const trailers = response.data.results.filter(video => video.type === 'Trailer');
      if (trailers.length > 0) {
        return trailers[0].key; // Devuelve el ID del video de YouTube
      } else {
        return null; // No se encontraron trailers
      }
    } catch (error) {
      console.error('Error al obtener enlace del trailer:', error);
      return null;
    }
  };

  const handlePlayButtonClick = (movieId) => {
    const trailerKey = trailers[movieId];
    if (trailerKey) {
      window.open(`https://www.youtube.com/watch?v=${trailerKey}`, '_blank');
    } else {
      console.log('No se encontró el trailer para esta película');
    }
  };

  return (
    <div className="favorite-container">
      <h3 style={{ fontSize: '1.6rem', fontWeight: 'bold', paddingTop: '30px', paddingBottom:'10px' }}>Favoritas del público</h3>
      <div className="favorite-posters-container">
        {movies.map((movie) => (
          <div key={movie.id} className="favorite-poster">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={`${movie.title} Poster`}
              onClick={() => handlePlayButtonClick(movie.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorite;
