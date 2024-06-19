import React, { createContext, useContext, useState, useEffect } from 'react';
import backendApiClient from './backendConfig';
import { useLoggedInUser } from './AuthContext';

const FavoritesContext = createContext();

export const useFavorites = () => {
  return useContext(FavoritesContext);
};

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const { loggedInUser} = useLoggedInUser();

    useEffect(() => {
      const fetchFavorites = async () => {
        if (loggedInUser) {
          try {
            const response = await backendApiClient.get(`/favorites/${loggedInUser.userId}`);
            setFavorites(response.data);
          } catch (error) {
            console.error('Error al cargar los favoritos:', error);
          }
        }
      };
      fetchFavorites();
    }, [loggedInUser]);
  

  const addFavorite = async (movie) => {
    try {
      const response = await backendApiClient.post('/add-favorite', {
        userId: movie.userId,
        movieId: movie.id,
        posterPath: movie.poster_path
      });

      if (response && response.data) {
        setFavorites((prevFavorites) => [...prevFavorites, {...movie, movieId: movie.id, posterPath: movie.poster_path}]);
      } else {
        console.error('Error: respuesta vacía o sin datos');
      }
    } catch (error) {
      console.error('Error al añadir la película a favoritos:', error);
    }
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

