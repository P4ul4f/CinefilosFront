import React from 'react'
import Hero from '../hero/Hero'
import Section from '../sections/Section'
import MoviePosterGrid from '../hero/MovieGrid'
import './Home.css';

const Home = ({ movies }) => {
  return (
    <div className="home-container">
      <Hero movies={movies} />
      <Section />
      <div className="movie-poster-grid-container">
        <MoviePosterGrid />
      </div>
    </div>
  );
}

export default Home
