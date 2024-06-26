import React from 'react'
import Hero from '../hero/Hero'
import Section from '../sections/Section'
import MoviePosterGrid from '../hero/MovieGrid'
import './Home.css';
import TopRatedMovies from '../sections/TopRatedMovies';

const Home = ({ movies }) => {
  return (
    <div className="home-container">
      <Hero movies={movies} />
      <Section />
      <div className="movie-poster-grid-container">
        <MoviePosterGrid />
      </div>
      <TopRatedMovies/>
    </div>
  );
}

export default Home
