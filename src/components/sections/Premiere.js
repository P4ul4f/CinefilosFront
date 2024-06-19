import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Spinner from '../spinner/Spinner';// Importar el componente Spinner
import './Section.css';

const Premiere = () => {
  const [movies, setMovies] = useState(new Set()); // Usamos un Set para evitar duplicados
  const [trailers, setTrailers] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false); // Estado para el spinner
  const apiKey = 'b9d0f880d08f6f661a756fd3f73c754e';
  const currentYear = new Date().getFullYear();
  const resultsPerPage = 20;
  const navigate = useNavigate(); // Hook de React Router DOM para navegación

  // Función para obtener las películas populares del año actual
  const getPopularMovies = async () => {
    setLoading(true); // Activar spinner
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&primary_release_year=${currentYear}&sort_by=popularity.desc&page=${currentPage}`);
      const newMovies = response.data.results;

      // Añadir las nuevas películas al Set
      const updatedMovies = new Set([...movies]);
      newMovies.forEach(movie => updatedMovies.add(movie));

      // Actualizar el estado con el Set actualizado convertido a un array
      setMovies(Array.from(updatedMovies));
    } catch (err) {
      console.error(err);
      setMovies(new Set()); // Reiniciar el estado en caso de error
    } finally {
      setLoading(false); // Desactivar spinner
    }
  };

  // Función para cargar más películas al hacer clic en el botón
  const loadMoreMovies = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  useEffect(() => {
    getPopularMovies();
  }, [currentPage]); // Ejecutar al cambiar currentPage

  useEffect(() => {
    const fetchTrailers = async () => {
      const trailersData = {};
      for (const movie of movies) {
        const trailerKey = await getTrailerLink(movie.id);
        trailersData[movie.id] = trailerKey;
      }
      setTrailers(trailersData);
    };

    // Ejecutar fetchTrailers cuando cambie el contenido de movies
    if (movies.size > 0) {
      fetchTrailers();
    }
  }, [movies]); // Ejecutar cuando cambie movies

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
    navigate(`/movie/${movieId}`); // Redireccionar a los detalles de la película
  };

  return (
    <div className="premiere-container">
      <h3 className='genre-title' style={{ paddingTop: '3rem', paddingLeft: '1rem' }}>Estrenos {currentYear}</h3>
      {loading && <Spinner />} {/* Mostrar el spinner durante la carga */}
      <div className="premiere-posters-container">
        {[...movies].map((movie) => ( // Convertir Set a array y mapear
          <div key={movie.id} className="premiere-poster">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={`${movie.title} Poster`}
              onClick={() => handlePlayButtonClick(movie.id)}
              style={{ borderRadius: '8px' }}
            />
          </div>
        ))}
      </div>
      <div className="load-more-button-container">
        <button className="load-more" onClick={loadMoreMovies}>Cargar más películas</button>
      </div>
    </div>
  );
};

export default Premiere;
