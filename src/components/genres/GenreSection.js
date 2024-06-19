import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './GenreSection.css';
import Spinner from '../spinner/Spinner'; // Importar el componente Spinner

const GenreSection = ({ genreId, genreName }) => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const apiKey = 'b9d0f880d08f6f661a756fd3f73c754e';
  const navigate = useNavigate();

  useEffect(() => {
    setMovies([]); // Limpiar las películas al cambiar de género
    fetchMoviesAndSeries();
  }, [genreId, page]);

  const fetchMoviesAndSeries = async () => {
    setLoading(true);
    try {
      const resultsPerPage = 20;

      const movieResponse = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genreId}&page=${page}`);
      const moviesData = movieResponse.data.results;

      const tvResponse = await axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&with_genres=${genreId}&page=${page}`);
      const tvData = tvResponse.data.results;

      const combinedData = [...moviesData, ...tvData];
      setMovies((prevMovies) => [...prevMovies, ...combinedData]);
    } catch (error) {
      console.error(`Error al obtener las películas y series del género ${genreId}:`, error);
    } finally {
      setLoading(false);
    }
  };

  const handlePlayButtonClick = (id) => {
    navigate(`/movie/${id}`);
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div className="genre-section">
      <div className='title-container'>
        <h3 className='genre-title'>{genreName}</h3>
      </div>
      {loading && <Spinner />} {/* Mostrar el spinner durante la carga */}
      <div className="movies-container">
        {movies.map((movie, index) => (
          <div key={`${movie.id}-${index}`} className="premiere-poster">
            <img className='image-genre' src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={`${movie.title} Poster`} onClick={() => handlePlayButtonClick(movie.id)} />
          </div>
        ))}
      </div>
      <button className="load-more" onClick={handleLoadMore}>Cargar más</button>
    </div>
  );
};

export default GenreSection;
