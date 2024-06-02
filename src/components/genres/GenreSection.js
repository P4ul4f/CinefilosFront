import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './GenreSection.css';

const GenreSection = ({ genreId, genreName }) => {
  const [movies, setMovies] = useState([]);
  const apiKey = 'b9d0f880d08f6f661a756fd3f73c754e';

  const navigate = useNavigate();

  useEffect(() => {
    const fetchMoviesAndSeries = async () => {
      try {
        const page = 1;
        const resultsPerPage = 50;

        const movieResponse = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genreId}&page=${page}&per_page=${resultsPerPage}`);
        const moviesData = movieResponse.data.results;

        const tvResponse = await axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&with_genres=${genreId}&page=${page}&per_page=${resultsPerPage}`);
        const tvData = tvResponse.data.results;

        const combinedData = [...moviesData, ...tvData];
        setMovies(combinedData);
      } catch (error) {
        console.error(`Error al obtener las películas y series del género ${genreId}:`, error);
        setMovies([]);
      }
    };

    fetchMoviesAndSeries();
  }, [genreId]);

  const handlePlayButtonClick = (id) => {
    navigate(`/movie/${id}`);
  };

  return (
    <div className="genre-section">
      <h3 style={{ paddingTop: '50px', paddingBottom: '10px', paddingLeft: '20px' }}>{genreName}</h3>
      <div className="movies-container">
        {movies.map((movie, index) => (
          <div key={`${movie.id}-${index}`} className="premiere-poster">
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={`${movie.title} Poster`} onClick={() => handlePlayButtonClick(movie.id)} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GenreSection;
