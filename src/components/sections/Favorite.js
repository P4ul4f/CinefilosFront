import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Section.css';

const Favorite = () => {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Estado para mantener la página actual
  const resultsPerPage = 20; // Número de resultados por página
  const apiKey = 'b9d0f880d08f6f661a756fd3f73c754e';
  const navigate = useNavigate(); // Hook para navegar a otra ruta

  // Función para obtener las películas mejor puntuadas
  const getTopRatedMovies = async () => {
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&page=${currentPage}`);
      const newMovies = response.data.results;
      // Verificar y filtrar películas duplicadas
      setMovies(prevMovies => {
        const uniqueMovies = newMovies.filter(newMovie => !prevMovies.some(existingMovie => existingMovie.id === newMovie.id));
        return [...prevMovies, ...uniqueMovies];
      });
    } catch (err) {
      console.log(err);
      setMovies([]);
    }
  };

  useEffect(() => {
    getTopRatedMovies();
  }, [currentPage]);

  const loadMoreMovies = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  // Función para manejar el clic en una película
  const handleMovieClick = (id) => {
    navigate(`/movie/${id}`); // Navega a la ruta específica de la película con su ID
  };

  return (
    <div className="favorite-container">
      <div className='title-container'>
      <h3 className='genre-title' style={{paddingTop:'2.5rem'}}>Favoritas del público</h3>
      </div>
      <div className="favorite-posters-container">
        {movies.map((movie) => (
          <div key={movie.id} className="favorite-poster" onClick={() => handleMovieClick(movie.id)}>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={`${movie.title} Poster`}
              style={{borderRadius:'8px', cursor: 'pointer'}}
            />
          </div>
        ))}
      </div>
      <div className="load-more-button-container">
        <button className="load-more" onClick={loadMoreMovies}>Cargar más</button>
      </div>
    </div>
  );
};

export default Favorite;
