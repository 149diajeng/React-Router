import { useState, useEffect } from 'react';
import axios from 'axios';
import './MovieList.css'


function MovieList() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const params = {
      api_key: '5840c53eacbb598c92e40f6f55ac8b70',
      page: page
    };

    if (query) {
      params.query = query;
    }

    axios.get('https://api.themoviedb.org/3/search/movie', {
      params: params
    })
    axios.get('https://api.themoviedb.org/3/movie/popular', {
      params: params
    })

    .then(response => {
      setMovies(response.data.results);
      setTotalPages(response.data.total_pages);
    })
    .catch(error => {
      console.log(error);
    });
  }, [page, query]);

  function handlePrevPage() {
    setPage(Math.max(page - 1, 1));
  }

  function handleNextPage() {
    setPage(Math.min(page + 1, totalPages));
  }

  function handleSearch(event) {
    event.preventDefault();
    setPage(1);
  }

  return (
    <div className="movie-page">
        <div className="search-box">
        {/* <h1>Movie Search</h1> */}
        <form onSubmit={handleSearch}>
        <input type="search" placeholder='Cari Movie' value={query} onChange={event => setQuery(event.target.value)} />
        <button type="submit">Search</button>
      </form>
      </div>

    <div className='movie-container'>
      <h3>Popular Movie</h3>
      <ul>
        {movies.map(movie => (
          <li key={movie.id}>
            {movie.poster_path ? (
              <img src={`https://image.tmdb.org/t/p/w185${movie.poster_path}`} alt={movie.title} />
            ) : (
              <div>No Image Available</div>
            )}
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
        <button onClick={handlePrevPage} disabled={page === 1}>Previous Page</button>
        <button onClick={handleNextPage} disabled={page === totalPages}>Next Page</button>
      </div>
    </div>
  
    </div>
 );
}   
      
    
      

export default MovieList;
