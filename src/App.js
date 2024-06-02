import './App.css';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import {Routes, Route, Router} from 'react-router-dom';
import Home from './components/home/Home';
import Header from './components/header/Header';
import Trailer from './components/trailer/Trailer';
import Footer from './components/footer/Footer';
import Premiere from './components/sections/Premiere';
import Favorite from './components/sections/Favorite';
import Marathon from './components/sections/Marathon';
import GenreSection from './components/genres/GenreSection';
import MovieDetails from './components/movieDetails/MovieDetails';

function App() {
  const [movies, setMovies] = useState([]);
  const apiKey = 'b9d0f880d08f6f661a756fd3f73c754e'; // Reemplaza 'TU_CLAVE_API_DE_TMDB' con tu clave API de TMDb

  const getPopularMovies = async () => {
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`);
      console.log(response.data.results);
      
      if (response.data.results) {
        setMovies(response.data.results);
        
      } else {
        setMovies([]);
      }
    } catch (err) {
      console.log(err);
      setMovies([]);
    }
  };

  useEffect(() => {
    getPopularMovies();
  }, []);


  return (
    <div className="App">
      <Header />
      <Routes>
        {/* Layout y Header deben estar en todas las rutas */}
        <Route element={<Layout/>}>
          <Route path='/' element={<Home movies={movies}/>}>
        </Route>
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
      <Footer/>
    </div>
  );
}

export default App;
