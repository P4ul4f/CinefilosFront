import React, { useState, useEffect } from 'react';
import Carousel from 'react-material-ui-carousel';
import { Paper, Button } from '@mui/material';
import { faCirclePlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Hero.css'

const Hero = ({ movies }) => {
  const [trailers, setTrailers] = useState({});

  useEffect(() => {
    const fetchTrailers = async () => {
      const trailersData = {};
      for (const movie of movies) {
        const trailerKey = await getTrailerLink(movie.id);
        trailersData[movie.id] = trailerKey;
      }
      setTrailers(trailersData);
    };

    fetchTrailers();
  }, [movies]);

  const getTrailerLink = async (movieId) => {
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=b9d0f880d08f6f661a756fd3f73c754e`);
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
    const trailerKey = trailers[movieId];
    if (trailerKey) {
      window.open(`https://www.youtube.com/watch?v=${trailerKey}`, '_blank');
    } else {
      console.log('No se encontró el trailer para esta película');
    }
  };

  return (
    <div className='movie-carousel-container'>
      <Carousel>
        {movies.map((movie) => (
          <Paper key={movie.id}>
            <div className='movie-card-container'>
              <div className='movie-card' style={{backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`}}>
                <div className="movie-detail">
                  <div className='movie-poster'>
                    <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={`${movie.title} Poster`} />
                  </div>
                  <div className='movie-title'>
                    <h2 style={{ "fontSize":"3rem" }}>{movie.title}</h2>
                  </div>
                  <div className="movie-buttons-container">
                    <div className="play-button-icon-container">
                      <FontAwesomeIcon className="play-button-icon" icon={faCirclePlay} onClick={() => handlePlayButtonClick(movie.id)} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Paper>
        ))}
      </Carousel>
    </div>
  );
}

export default Hero;
