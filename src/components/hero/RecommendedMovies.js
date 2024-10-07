import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './RecommendedMovies.css';

const RecommendedMovies = () => {
  const [movies, setMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef(null);
  const apiKey = 'b9d0f880d08f6f661a756fd3f73c754e'; // Reemplaza con tu API Key
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecommendedMovies = async () => {
      try {
        const response = await axios.get('https://api.themoviedb.org/3/movie/popular', {
          params: {
            api_key: apiKey,
            language: 'en-US',
            sort_by: 'popularity.desc',
            page: 100,
          },
        });
        setMovies(response.data.results);
      } catch (error) {
        console.error('Error fetching recommended movies:', error);
      }
    };

    fetchRecommendedMovies();
  }, []);

  useEffect(() => {
    if (movies.length > 0) {
      const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex === movies.length - 1 ? 0 : prevIndex + 1));
      };

      intervalRef.current = setInterval(nextSlide, 3000); // Cambiar cada 3 segundos

      return () => {
        clearInterval(intervalRef.current);
      };
    }
  }, [movies]);

  const handlePosterClick = (movieId) => {
    navigate(`/movie/${movieId}`);
  };

  return (
    <div className="recommended-movies-container">
      <h3 className="recommended-movies-title">Recomendadas</h3>
      <div className="movie-poster-carousel">
        <div
          className="movie-posters"
          style={{
            transform: `translateX(-${currentIndex * (240 / movies.length)}%)`,
            transition: 'transform 1s ease',
          }}
        >
          {movies.map((movie) => (
            <div key={movie.id} className="movie-poster-item">
              {movie.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="poster-image"
                  onClick={() => handlePosterClick(movie.id)}
                  style={{ cursor: 'pointer' }}
                />
              ) : (
                <div className="no-poster">No Poster Available</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecommendedMovies;
