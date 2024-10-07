import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import './TopRatedMovies.css';
import backendApiClient from '../../api/backendConfig';
import { useLoggedInUser } from '../../api/AuthContext';

const TopRatedMovies = () => {
  const { loggedInUser } = useLoggedInUser();
  const [movies, setMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef(null);
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

    if (loggedInUser) {
      fetchTopRatedMovies();
    }
  }, [loggedInUser]);

  useEffect(() => {
    // Función para ir a la siguiente película
    const nextSlide = () => {
      setCurrentIndex((prevIndex) => (prevIndex === movies.length - 1 ? 0 : prevIndex + 1));
    };

    // Configurar el intervalo para cambiar automáticamente cada 3 segundos
    intervalRef.current = setInterval(nextSlide, 2980); // Cambia la duración aquí si lo deseas

    // Limpiar el intervalo al desmontar el componente
    return () => {
      clearInterval(intervalRef.current);
    };
  }, [movies]);

  if (!loggedInUser) {
    return (
      <div className="not-logged-in-message">
        <p></p>
      </div>
    );
  }

  return (
    <div className="top-rated-movies-container">
      <h3 className="top-rated-movies-title">Mejor Valoradas en Cinéfilos</h3>
      <div className="movie-poster-carousel">
        <div
          className="movie-posters"
          style={{
            transform: `translateX(-${currentIndex * (240 / movies.length)}%)`,
            transition: 'transform 1s ease', // Transición suave
          }}
        >
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
      </div>
    </div>
  );
};

export default TopRatedMovies;



















