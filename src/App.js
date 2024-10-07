import './App.css';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import { Routes, Route } from 'react-router-dom';
import Home from './components/home/Home';
import Header from './components/header/Header';
import Trailer from './components/trailer/Trailer';
import Footer from './components/footer/Footer';
import Premiere from './components/sections/Premiere';
import Favorite from './components/sections/Favorite';
import Marathon from './components/sections/Marathon';
import GenreSection from './components/genres/GenreSection';
import MovieDetails from './components/movieDetails/MovieDetails';
import Spinner from './components/spinner/Spinner';
import { AuthProvider } from './api/AuthContext'; // Importa el proveedor de contexto de autenticación
import ListFav from './components/sections/ListFav';
import { FavoritesProvider } from './api/FavoritesContext';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Estado para controlar la carga inicial
  const apiKey = 'b9d0f880d08f6f661a756fd3f73c754e'; // Tu clave API de TMDb

  const getPopularMovies = async () => {
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`);

      if (response.data.results) {
        // Simular una pequeña demora (por ejemplo, 1 segundo) antes de cambiar isLoading a false
        setTimeout(() => {
          setMovies(response.data.results);
          setIsLoading(false); // Cuando los datos se cargan, establecer isLoading a false
        }, 1000); // 1000 milisegundos = 1 segundo
      } else {
        setMovies([]);
        setIsLoading(false); // En caso de error también detenemos el spinner
      }
    } catch (err) {
      console.log(err);
      setMovies([]);
      setIsLoading(false); // Manejo de errores: detener el spinner
    }
  };

  useEffect(() => {
    getPopularMovies();
  }, []); // Solo se ejecuta una vez al montar el componente

  if (isLoading) {
    return <Spinner />; // Mostrar el spinner mientras se carga
  }

  return (
    <div className="App">
      <AuthProvider> {/* Envuelve toda tu aplicación con AuthProvider */}
        <FavoritesProvider>
        <Header />
        <Routes>
          {/* Layout y Header deben estar en todas las rutas */}
          <Route element={<Layout />}>
            <Route path='/' element={<Home movies={movies} />} />
            <Route path='/lista-favoritos' element={<ListFav/>}/>
            <Route path="/trailer/:ytTrailerId" element={<Trailer />} />
            <Route path="/estrenos" element={<Premiere movies={movies} />} />
            <Route path="/favoritos" element={<Favorite movies={movies} />} />
            <Route path="/maraton" element={<Marathon movies={movies} />} />
            <Route path="/animadas" element={<GenreSection genreId={16} genreName="Animadas" />} />
            <Route path="/ciencia-ficcion" element={<GenreSection genreId={878} genreName="Ciencia Ficción" />} />
            <Route path="/crimen" element={<GenreSection genreId={80} genreName="Crimen" />} />
            <Route path="/comedia" element={<GenreSection genreId={35} genreName="Comedia" />} />
            <Route path="/romance" element={<GenreSection genreId={10749} genreName="Romance" />} />
            <Route path="/suspenso" element={<GenreSection genreId={53} genreName="Suspenso" />} />
            <Route path="/terror" element={<GenreSection genreId={27} genreName="Terror" />} />
            <Route path="/movie/:id" element={<MovieDetails />} /> {/* Ruta para los detalles de la película */}
          </Route>
        </Routes>
        <Footer />
        </FavoritesProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
