import React from 'react'
import Hero from '../hero/Hero'
import Section from '../sections/Section'
import MoviePosterGrid from '../hero/MovieGrid'
import './Home.css';
import TopRatedMovies from '../sections/TopRatedMovies';
import RecommendedMovies from '../hero/RecommendedMovies';

const Home = ({ movies }) => {
  return (
    <div className="home-container">
      <Hero movies={movies} />
      <Section />
      <MoviePosterGrid />
      <RecommendedMovies></RecommendedMovies>
      <TopRatedMovies/>
    </div>
  );
}

export default Home
