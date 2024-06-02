import React from 'react'
import Hero from '../hero/Hero'
import Section from '../sections/Section'

const Home = ({movies}) => {
  return (
    <>
    <Hero movies= {movies}/>
    <Section/>
    </>
  )
}

export default Home
