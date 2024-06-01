import './App.css';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import {Routes, Route} from 'react-router-dom';
import Home from './components/home/Home';
import Header from './components/header/Header';
import Trailer from './components/trailer/Trailer';

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
      <Route path='/' element={<Layout/>}>
        <Route path='/' element={<Home movies={movies}/>}></Route>
        <Route path="/trailer/:ytTrailerId" element={<Trailer />} />
      </Route>
    </Routes>
  </div>
  );
}

export default App;
