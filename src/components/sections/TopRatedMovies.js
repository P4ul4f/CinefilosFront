import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './TopRatedMovies.css'; // Importa los estilos CSS aquí
import backendApiClient from '../../api/backendConfig';

const TopRatedMovies = () => {
  const [movies, setMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const apiKey = 'b9d0f880d08f6f661a756fd3f73c754e';

  useEffect(() => {
    const fetchTopRatedMovies = async () => {
      try {
        const response = await backendApiClient.get('/top-rated');
        const movieIds = response.data;

        const movieDetailsPromises = movieIds.map(movieId =>
          axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`)
        );

        const movieDetailsResponses = await Promise.all(movieDetailsPromises);
        const movieDetails = movieDetailsResponses.map(response => response.data);

        setMovies(movieDetails);
      } catch (error) {
        console.error('Error fetching top-rated movies:', error);
      }
    };

    fetchTopRatedMovies();
  }, []);

  const goToPrevSlide = () => {
    const lastIndex = movies.length - 1;
    const newIndex = currentIndex === 0 ? lastIndex : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNextSlide = () => {
    const lastIndex = movies.length - 1;
    const newIndex = currentIndex === lastIndex ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <div className="top-rated-movies-container">
      <h3 className="top-rated-movies-title">Películas Mejor Valoradas</h3>
      <div className="movie-poster-carousel">
        <button className="carousel-control prev" onClick={goToPrevSlide}>‹</button>
        <div className="movie-posters" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {movies.map(movie => (
            <div key={movie.id} className="movie-poster-item">
              {movie.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="poster-image"
                />
              ) : (
                <div className="no-poster">No Poster Available</div>
              )}
            </div>
          ))}
        </div>
        <button className="carousel-control next" onClick={goToNextSlide}>›</button>
      </div>
    </div>
  );
};

export default TopRatedMovies;





















