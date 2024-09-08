import { useState } from 'react';

const tempMovieData = [
    {
      imdbID: "tt1375666",
      Title: "Inception",
      Year: "2010",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    },
    {
      imdbID: "tt0133093",
      Title: "The Matrix",
      Year: "1999",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
    },
    {
      imdbID: "tt6751668",
      Title: "Parasite",
      Year: "2019",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
    },
  ];

const tempWatchedData = [
    {
      imdbID: "tt1375666",
      Title: "Inception",
      Year: "2010",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
      runtime: 148,
      imdbRating: 8.8,
      userRating: 10,
    },
    {
      imdbID: "tt0088763",
      Title: "Back to the Future",
      Year: "1985",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
      runtime: 116,
      imdbRating: 8.5,
      userRating: 9,
    },
  ];

const average = (arr) =>arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export default function App(){
    const [movies, setMovies ] = useState(tempMovieData);
    const [watched, setWatched ] = useState(tempWatchedData);
    return(
        <div>
            <Banner>
                <NumResult  movies={movies}/>
            </Banner>

            <Main>
                <Box>
                    <MoviesList movies={movies}/>
                </Box>
                <Box>
                    <WatchedSummary watched={watched}/>
                    <WatchedMoviesList watched={watched} />
                </Box>
            </Main>
        </div>
    )
}

function Banner({children}){

    const [searchText, setSearchText] = useState("");

    return (
        <div className="banner">
            <Logo />
            <Search onSearch={setSearchText} searchText={searchText}/>
            {children}
        </div>
    )
}

function Logo(){
    return <div className="logo"><h1 style={{fontSize:"1.8rem"}}>🍿 usePopcorn</h1></div>
}

function Search({onSearch, searchText}){
    return (
    <input 
     type="text" 
     className="search" 
     placeholder="Search movies..." 
     onChange={(e)=>onSearch(e.target.value)}
     value={searchText}/>)
}

function NumResult({movies}){
    return (
    <div className="results">
        <p style={{fontSize:"1rem"}} >Found 
        <span style={{fontWeight:"bold"}}> {movies.length}</span> results</p>
    </div>)
}

function Main({children}){
    return(
        <div className="main">
          {children}
        </div>
    )
}

function Box({children}){
  const [isOpen, setIsOpen] = useState(true);

  return (
  <div className="leftBox">
    <div className="minimizer" onClick={()=>setIsOpen(!isOpen)}>
      <span className="minimizer-ui">{isOpen?"-":"+"}</span>
    </div>
      
    {isOpen&& children}
  </div>
  )
}

function MoviesList({movies}){
  return (
  <div className="movieList">
    {movies?.map((movie)=>{ 
      return <Movie movie={movie} key={movie.imdbID}/>
    })}
  </div>)
}

function Movie({movie}){
  return (
  <div className="eachMovie" key={movie.imdbID}>
      <img src={movie.Poster} alt="movie-poster"/>
      <div>
        <h3>{movie.Title}</h3>
        <p><span>📅</span>{movie.Year}</p>
      </div>
   </div>
   )
}

function WatchedSummary({ watched }) {
    const avgUserRating = average(watched.map((movie) => movie.userRating));
    const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
    const avgRuntime = average(watched.map((movie) => movie.runtime));
  
    return (
      <div className="summary">
        <h2>Movies you watched</h2>
        <div className="summaryStats">
          <p>
            <span>#️⃣</span>
            <span> {watched.length} movies</span> {/* Updated */}
          </p>
          <p>
            <span>⭐️</span>
            <span> {avgImdbRating}</span>
          </p>
          <p>
            <span>🌟</span>
            <span> {avgUserRating}</span>
          </p>
          <p>
            <span>⏳</span>
            <span> {avgRuntime} min</span>
          </p>
        </div>
      </div>
    );
}
  
function WatchedMoviesList({ watched }) {
  return ( 
    <div className="watchedMoviesList">
      {watched?.map((movie) => (
       <WatchedMovie movie={movie} key={movie.imdbID}/>
      ))}
    </div>
  );
}

function WatchedMovie({movie}){
  return (
  <div className="eachMovie">
  <img src={movie.Poster} alt="movie-poster" />
  <div>
    <h3>{movie.Title}</h3>
    <div className="watchMovieMeta">
      <p>
        <span>🌟</span>
        {movie.imdbRating}
      </p>
      <p>
        <span>🙆‍♂️</span>
        {movie.userRating}
      </p>
      <p>
        <span>⌛</span>
        {movie.runtime}
      </p>
    </div>
  </div>
</div>)
}