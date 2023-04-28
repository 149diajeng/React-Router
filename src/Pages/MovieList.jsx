import React, { useState, useEffect } from 'react';
import './MovieList.css'

import axios from 'axios';

const API_KEY = '5840c53eacbb598c92e40f6f55ac8b70';

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [query, setQuery] = useState('');

  const fetchMovies = async (url, headers={}) => {
    try {
      const response = await axios.request({
        method: 'get',
        url: url,
        headers: { 
          'Content-Type': 'application/json',
          ...headers
        }, 
      });
      // console.log(response);
      setMovies(response.data.results);
      setPage(response.data.page);
      setTotalPages(response.data.total_pages);
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchMovies(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`);
  };

  const handlePrevPage = () => {
    setPage(page - 1);
  };

  const handleNextPage = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    if (query === '') {
      fetchMovies(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=${page}`);
    } else {
      fetchMovies(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}&page=${page}`);
    }
  }, [page, query]);

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          <input type="text" value={query} onChange={handleInputChange} />
          <button type="submit">Search</button>
        </form>
      </div>
      <div>
        <ul>
          {movies.map((movie) => (
            <li key={movie.id}>
              <div>
                {movie.poster_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w185${movie.poster_path}`}
                    alt={movie.title}
                  />
                ) : (
                  <div>No Image Available</div>
                )}
              </div>
              <div className='movie-detail'>
                <h2>{movie.title}</h2>
                <p>ID: {movie.id}</p>
                <p>Popularity: {movie.popularity}</p>
                <p>{movie.overview}</p>
              </div>
            </li>
          ))}
        </ul>
        <div>
          {/* <button onClick={handlePrevPage} disabled={page === 1}>
            Previous Page
          </button>
          <button onClick={handleNextPage} disabled={page === totalPages}>
            Next Page
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default MovieList;

