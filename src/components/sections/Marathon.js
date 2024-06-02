import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Marathon = () => {
  const [sagas, setSagas] = useState([]);
  const apiKey = 'b9d0f880d08f6f661a756fd3f73c754e';

  useEffect(() => {
    const fetchSagas = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&sort_by=popularity.desc`);
        const movies = response.data.results;

        // Objeto para almacenar las sagas
        const sagasMap = {};

        // Agrupar películas por sagas basadas en el título
        movies.forEach(movie => {
          const sagaName = getMovieSaga(movie.title);
          if (!sagasMap[sagaName]) {
            sagasMap[sagaName] = [];
          }
          sagasMap[sagaName].push(movie);
        });

        // Convertir el objeto sagasMap a un array de sagas
        const sagasArray = Object.entries(sagasMap).map(([sagaName, movies]) => ({
          sagaName,
          movies
        }));

        setSagas(sagasArray);
      } catch (error) {
        console.error('Error al obtener las sagas:', error);
        setSagas([]);
      }
    };

    fetchSagas();
  }, []);

  const getMovieSaga = (genres) => {
    // Verificamos si genres es un array y si tiene al menos un género
    if (Array.isArray(genres) && genres.length > 0) {
      // Filtramos los géneros para obtener solo aquellos que nos interesan
      const relevantGenres = genres.filter(genre => {
        const relevantGenreIds = [12, 14]; // IDs de los géneros relevantes
        return relevantGenreIds.includes(genre.id);
      });
  
      // Si hay géneros relevantes, devolvemos el nombre del primer género
      if (relevantGenres.length > 0) {
        return relevantGenres[0].name;
      }
    }
  
    // Si no se encuentra ningún género relevante o genres no es un array, devolvemos "Otras Películas"
    return "Otras Películas";
  };

  return (
    <div className="marathon-container">
      {sagas.map((saga, index) => (
        <div key={index} className="saga-container">
          <h3>{saga.sagaName}</h3>
          <div className="movies-container">
            {saga.movies.map((movie, movieIndex) => (
              <div key={movieIndex} className="movie-item">
                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={`${movie.title} Poster`} />
                <p>{movie.title}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Marathon;
