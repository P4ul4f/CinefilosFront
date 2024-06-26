import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faPlus } from '@fortawesome/free-solid-svg-icons';
import RatingModal from '../modals/RatingModal';
import Spinner from '../spinner/Spinner'; // Importa el componente Spinner
import './MovieDetail.css';
import AuthContext, { useLoggedInUser } from '../../api/AuthContext';
import { useFavorites } from '../../api/FavoritesContext';
import backendApiClient from '../../api/backendConfig';
import HeartBrokenIcon from '../modals/icons/HeartBrokenIcon';
import HeartIcon from '../modals/icons/HeartIcon';


const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [credits, setCredits] = useState(null); // Estado para almacenar los créditos de la película
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [loading, setLoading] = useState(true); // Estado para controlar la carga de los detalles
  const apiKey = 'b9d0f880d08f6f661a756fd3f73c754e';
  const language = 'es'; // Definir el idioma como español
  const {loggedInUser} = useLoggedInUser();
  const {addFavorite} = useFavorites();
  const [userRating, setUserRating] = useState(null);
  const [userHasRated, setUserHasRated] = useState(false);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setLoading(true); // Establecer carga en true al iniciar la carga de detalles
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=${language}`);
        setMovie(response.data);
      } catch (error) {
        console.error('Error al obtener detalles de la película:', error);
        setMovie(null);
      } finally {
        setLoading(false); // Establecer carga en false al finalizar la carga de detalles
      }
    };

    const fetchCredits = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}`);
        setCredits(response.data);
      } catch (error) {
        console.error('Error al obtener los créditos de la película:', error);
        setCredits(null);
      }
    };

    const fetchUserRating = async () => {
      try {
        if (movie && loggedInUser) {
          const response = await backendApiClient.get(`/movie/${movie.id}/rating/${loggedInUser.userId}`);

          if (response.data && response.data.liked !== null) {
            setUserRating(response.data.liked);
            setUserHasRated(true); // Marcar que el usuario ha calificado
          } else {
            setUserRating(null);
            setUserHasRated(false); // Marcar que el usuario no ha calificado
          }
        }
      } catch (error) {
        console.error('Error fetching user rating:', error);
        setUserRating(null);
        setUserHasRated(false);
      }
    };
    

    const fetchData = async () => {
      setLoading(true);
      await Promise.all([fetchMovieDetails(), fetchCredits(), fetchUserRating()]);
      setLoading(false);
    };

    fetchData();
  }, [id, loggedInUser]);

  const openRatingModal = () => {
    setShowRatingModal(true);
  };

  // Función para cerrar el modal de calificación
  const closeRatingModal = () => {
    setShowRatingModal(false);
  };

  const handleAddToFavorites = () => {
    if (loggedInUser) {
      addFavorite({ ...movie, userId: loggedInUser.userId });
      alert(`${movie.title} ha sido añadida a tu lista de favoritos.`);
    } else {
      alert('Debes iniciar sesión para agregar películas a tu lista de favoritos.');
    }
  };

  const handleRatingSubmit = (liked) => {
    setUserRating(liked);
    setUserHasRated(true);
  };
  

  if (loading) {
    return <Spinner />; // Mostrar el spinner mientras se cargan los detalles
  }

  if (!movie || !credits) {
    return <div>Error al cargar los detalles de la película</div>;
  }
  console.log('loggedInUser:', loggedInUser);

  return (
    <div className="movie-details">
      <div className="background-image">
        <img src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`} alt={`${movie.title} Backdrop`} />
      </div>
      <div className="movie-info2">
        <div className='title-rating'>
          <div className='movie-rating'>
              <img className='movie-img' src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={`${movie.title} Poster`} />
              <div className='movie-details-short'>
                <p><strong>Calificación promedio:</strong> {movie.vote_average}</p>
              </div>
              <div className='movie-details-short'>
                <p><strong>Géneros:</strong> {movie.genres.map(genre => genre.name).join(', ')}</p>
              </div>
              <div className='movie-details-short'>
                <p><strong>Duración:</strong> {movie.runtime} minutos</p>
              </div>
          </div>
          <div className='movie-all-details'>
            <div className='title-rating-top'>
              <h2>{movie.title}</h2>
              <div className="buttons-rating">
                {userHasRated ? (
                  <div className="rated-info">
                    <p style={{color:'white'}}>Tu calificación  {userRating ? <HeartIcon color="rgb(134, 21, 183)" /> : <HeartBrokenIcon color="rgb(134, 21, 183)" />}</p>
                  </div>
                ) : (
                  <div className="button-container">
                    <button onClick={openRatingModal} className="button-rating">
                      <FontAwesomeIcon icon={faHeart} style={{ color: 'white' }} />
                      Calificar
                    </button>
                  </div>
                )}
                <button className="button-rating" onClick={handleAddToFavorites}>
                  <FontAwesomeIcon icon={faPlus} /> Añadir a mi lista
                </button>
              </div>
            </div>
            <div className="movie-summary">
              <div className='movie-things'>
                <p>{movie.overview}</p>
                <p><strong>Título original</strong><br /> {movie.original_title}</p>
                <p><strong>Fecha de lanzamiento</strong><br /> {movie.release_date}</p>
                <p><strong>Director</strong><br /> {credits.crew.filter(person => person.job === 'Director').map(director => director.name).join(', ')}</p>
                <p><strong>Reparto</strong><br /> {credits.cast.slice(0, 5).map(person => person.name).join(', ')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Modal de calificación */}
      <RatingModal
        show={showRatingModal}
        handleClose={closeRatingModal}
        movieId={movie.id}
        loggedInUser={loggedInUser} 
        onRatingSubmit={handleRatingSubmit}
      />
    </div>
  );
};

export default MovieDetails;