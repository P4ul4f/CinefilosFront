import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Form, FormControl, Button } from 'react-bootstrap';
import Spinner from '../spinner/Spinner';
import './Header.css';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const apiKey = 'b9d0f880d08f6f661a756fd3f73c754e';
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchQuery}`);
      setSearchResults(response.data.results);
    } catch (error) {
      console.error('Error fetching search results', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePlayButtonClick = (id) => {
    setSearchQuery(''); // Limpiar la barra de búsqueda
    setSearchResults([]); // Limpiar los resultados de búsqueda
    navigate(`/movie/${id}`);
  };

  return (
    <div className="search-bar">
      <Form className="d-flex" onSubmit={handleSearch}>
        <div className="input-group">
          <FormControl
            type="search"
            placeholder="Buscar"
            className="mr-2"
            aria-label="Buscar"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button variant="outline-light" id="button-addon2" type="submit">
            Buscar
          </Button>
        </div>
      </Form>
      {loading && <Spinner />} {/* Mostrar el spinner durante la carga */}
      <div className="search-results">
        {searchResults.map((movie, index) => (
          <div key={`${movie.id}-${index}`} className="search-result-item" onClick={() => handlePlayButtonClick(movie.id)}>
            <img className='image-search' src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={`${movie.title} Poster`} />
            <div>
              <h5>{movie.title}</h5>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;


