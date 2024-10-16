
import React from 'react';
import { useFavorites } from '../../api/FavoritesContext';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Section.css'


const ListFav = () => {
  const { favorites, fetchFavorites, loggedInUser } = useFavorites();
  const navigate = useNavigate();

  useEffect(() => {
    // Verificar si loggedInUser y loggedInUser.userId están definidos
    if (loggedInUser && loggedInUser.userId) {
      console.log('loggedInUser:', loggedInUser);
      fetchFavorites(loggedInUser.userId); // Realizar la solicitud a /auth/favorites/${loggedInUser.userId}
    } else {
      console.error('No se encontró un usuario autenticado o userId indefinido');
    }
  }, [loggedInUser, fetchFavorites]);

  const handleMovieClick = (movieId) => {
    navigate(`/movie/${movieId}`); // Navegar a la ruta específica de la película con su ID
  };

  return (
    <>
    <div className='list-container'>
      <h2 className='list-title'>Lista de Favoritos</h2>
      <div className='favorites-list'>
        {favorites.length === 0 ? (
          <p className='list-no-list'>No hay películas en tu lista de favoritos.</p>
        ) : (
          favorites.map((movie) => (
            <div key={movie.movieId} className='favorite-movie' onClick={() => handleMovieClick(movie.movieId)}>
              <img src={`https://image.tmdb.org/t/p/w200${movie.posterPath}`} alt={movie.title} className='list-img'/>
            </div>
          ))
        )}
      </div>
    </div>
    </>
  );
};

export default ListFav;

