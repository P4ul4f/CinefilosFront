import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Premiere = () => {
  const [movies, setMovies] = useState([]);
  const [trailers, setTrailers] = useState({});
  const apiKey = 'b9d0f880d08f6f661a756fd3f73c754e';
  const currentYear = new Date().getFullYear();
  const numberOfPages = 5; // Número de páginas que deseas obtener

  // Función para obtener las películas populares del año actual
  const getPopularMovies = async () => {
    let allMovies = [];
    try {
      for (let page = 1; page <= numberOfPages; page++) {
        const response = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&primary_release_year=${currentYear}&sort_by=popularity.desc&page=${page}`);
        allMovies = [...allMovies, ...response.data.results];
      }
      setMovies(allMovies);
    } catch (err) {
      console.log(err);
      setMovies([]);
    }
  };

  useEffect(() => {
    getPopularMovies();
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
    <div className="premiere-container">
      <h3 style={{ fontSize: '1.6rem', fontWeight: 'bold' }}>Estrenos {currentYear}</h3>
      <div className="premiere-posters-container">
        {movies.map((movie) => (
          <div key={movie.id} className="premiere-poster">
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

export default Premiere;
