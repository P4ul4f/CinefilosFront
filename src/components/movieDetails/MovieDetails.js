import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './MovieDetail.css';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const apiKey = 'b9d0f880d08f6f661a756fd3f73c754e';

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`);
        setMovie(response.data);
      } catch (error) {
        console.error('Error al obtener detalles de la película:', error);
        setMovie(null);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (!movie) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="movie-details">
      <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={`${movie.title} Poster`} />
      <div className="movie-info">
        <h2>{movie.title}</h2>
        <p>{movie.overview}</p>
        <p><strong>Título original:</strong> {movie.original_title}</p>
        <p><strong>Fecha de lanzamiento:</strong> {movie.release_date}</p>
        <p><strong>Duración:</strong> {movie.runtime} minutos</p>
        <p><strong>Géneros:</strong> {movie.genres.map(genre => genre.name).join(', ')}</p>
        <p><strong>Calificación promedio:</strong> {movie.vote_average}</p>
        <p><strong>Número de votos:</strong> {movie.vote_count}</p>
      </div>
    </div>
  );
};

export default MovieDetails;

