import React from 'react';
import { useState, useEffect } from 'react';
import './App.css';
import SearchIcon from './search.svg';
import MovieCard from './MovieCard';

const API_URL  = 'http://www.omdbapi.com/?i=tt3896198&apikey=90b054dc';

const App = () => {

  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState('');
  const getMovies = async(title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    setMovies(data.Search);
  }
  useEffect(()=>{
    getMovies('');
  }, []);
  return (
    <div className="app">
      <h1> BingeWatch </h1>
      <div className='search'>
        <input placeholder='Enter a movie name' value={search} onChange={(e) => setSearch(e.target.value)}>
        </input>
        <img src={SearchIcon} alt="search" onClick={() => getMovies(search)}>
        </img>
      </div>
      {movies?.length ? (
          <div className='container'>
            {movies.map((movie, key) => (
              <MovieCard movie={movie} />
            ))}
          </div> ) : (
        <div className='empty'>
        <h2> No movies found! </h2>
        </div>
      )}
    </div>
  );
};

export default App;