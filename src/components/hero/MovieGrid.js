import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate desde react-router-dom
import './MovieGrid.css';

const MoviePosterGrid = () => {
  const [movies, setMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef(null);
  const navigate = useNavigate(); // Hook para la navegación

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get('https://api.themoviedb.org/3/discover/movie', {
          params: {
            api_key: 'b9d0f880d08f6f661a756fd3f73c754e',
            language: 'en-US',
            sort_by: 'vote_average.desc',
            'vote_count.gte': 1000,
            page: 10
          }
        });
        setMovies(response.data.results);
      } catch (error) {
        console.error('Error fetching movies:', error);
        setMovies([]);
      }
    };

    fetchMovies();
  }, []);

  useEffect(() => {
    const nextSlide = () => {
      setCurrentIndex((prevIndex) => (prevIndex === movies.length - 1 ? 0 : prevIndex + 1));
    };

    intervalRef.current = setInterval(nextSlide, 3000); 

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [movies]);

  const handlePosterClick = (movieId) => {
    navigate(`/movie/${movieId}`); // Navegar a la ruta de detalles de la película
  };

  return (
    <div className="movie-poster-carousel-2">
        <div className="carousel-title-2"><h3 style={{color:'rgb(134, 21, 183)'}}>Descubrir</h3></div>
      <div className="carousel-wrapper-2">
        <div
          className="carousel-content-2"
          style={{
            transform: `translateX(-${currentIndex * (100 / movies.length)}%)`,
            transition: 'transform 1s ease' // Ajusta la duración de la transición según sea necesario
          }}
        >
          {movies.map((movie, index) => (
            <div key={movie.id} className="movie-poster-item-2">
              {movie.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="poster-image-2"
                  onClick={() => handlePosterClick(movie.id)}
                  style={{cursor:'pointer'}}
                />
              ) : (
                <div className="no-poster-2">No Poster Available</div>
              )}
              
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MoviePosterGrid;



