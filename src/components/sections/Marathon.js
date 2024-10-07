import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Spinner from '../spinner/Spinner';
import './Section.css';

const Marathon = () => {
  const [sagas, setSagas] = useState([]);
  const [loading, setLoading] = useState(false); // Estado para controlar el spinner
  const apiKey = 'b9d0f880d08f6f661a756fd3f73c754e';
  const navigate = useNavigate(); // Hook de React Router DOM para navegación

  useEffect(() => {
    const fetchSagas = async () => {
      setLoading(true); // Activar el spinner
      try {
        const sagaNames = [
          'Harry Potter',
          'Star Wars',
          'The Lord of the Rings',
          'The Matrix',
          'Pirates of the Caribbean'
        ];

        const sagasArray = await Promise.all(
          sagaNames.map(async (sagaName) => {
            const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${sagaName}`);
            // Filtrar solo las películas y limitar a 8 resultados
            const filteredMovies = response.data.results.filter(movie => (
              (!movie.poster_path || movie.poster_path !== null) &&  // Filtrar películas sin poster
              (!movie.adult)  
            ));
            return {
              sagaName,
              movies: filteredMovies
            };
          })
        );

        setSagas(sagasArray);
      } catch (error) {
        console.error('Error al obtener sagas cinematográficas:', error);
        setSagas([]); // Reiniciar el estado en caso de error
      } finally {
        setLoading(false); // Desactivar el spinner
      }
    };

    fetchSagas();
  }, []);

  const scroll = (direction, container) => {
    const scrollAmount = 300;
    if (direction === 'left') {
      container.scrollLeft -= scrollAmount;
    } else {
      container.scrollLeft += scrollAmount;
    }
  };

  const handlePosterClick = (movieId) => {
    navigate(`/movie/${movieId}`); // Redireccionar a los detalles de la película
  };

  return (
    <div className="marathon-container" >
      {loading && <Spinner />} {/* Mostrar el spinner durante la carga */}
      {sagas.map((saga, index) => (
        <div key={index} className="saga-container">
          <div className='title-container'>
            <h3 className='genre-title'>{saga.sagaName}</h3>
          </div>
          <div className="scroll-container">
            <button className="scroll-button left" onClick={() => scroll('left', document.getElementById(`saga-${index}`))}>◀</button>
            <div id={`saga-${index}`} className="movie-items">
              {saga.movies.map((movie, movieIndex) => (
                <div key={movieIndex} className="movie-item" onClick={() => handlePosterClick(movie.id)}>
                  {movie.poster_path &&  // Verificar si hay URL de póster
                    <img src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} alt={`${movie.title} Poster`} style={{ borderRadius: '8px', cursor:'pointer' }} />
                  }
                  {movie.poster_path &&
                    <p>{movie.title}</p>
                  }
                </div>
              ))}
            </div>
            <button className="scroll-button right" onClick={() => scroll('right', document.getElementById(`saga-${index}`))}>▶</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Marathon;


