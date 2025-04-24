import { useEffect, useState } from 'react';
import StarRating from './components/stars';

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

const KEY = "d6d0dd5c";

export default function App(){
    const [movies, setMovies ] = useState([]);
    const [watched, setWatched ] = useState([]);
    const [isLoading, setisLoading] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [selectedId, setSelectedId] = useState(null);

    function handleSelectMovie(id){
      setSelectedId((selectedId)=>(id===selectedId?null:id));
    }
    
    function handleCloseMovie(){
      setSelectedId(null);
    }

    function handleAddToWtach(movie){
      setWatched((watched)=>[...watched, movie])
    }

    useEffect(function(){
      async function fetchMovies(){
        setisLoading(true);

        const res = await fetch(`https://www.omdbapi.com/?apikey=${KEY}&s=${searchText}`);
        const data = await res.json();
        setMovies(data.Search);
        
        setisLoading(false);
      }
      fetchMovies();
    },[searchText])

    return(
        <div>
            <Banner searchText={searchText} setSearchText={setSearchText}>
                <NumResult  movies={movies}/>
            </Banner>

            <Main>
                <Box>
                    {isLoading ? <Loader /> : <MoviesList movies={movies}
                    onSelectMovie={handleSelectMovie}/>}
                </Box>
                <Box>
                  {
                    selectedId?(<MovieDetails selectedId={selectedId} 
                      onCloseMovie={handleCloseMovie} onAddToWatch={handleAddToWtach}/>):
                    (<>
                      <WatchedSummary watched={watched} />
                      <WatchedMoviesList watched={watched} />
                    </>)
                  }
                </Box>
            </Main>
        </div>
    )
}

function Loader(){
  return <p className='loader'>Loading...</p>
}

function Banner({searchText, setSearchText, children}){


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
  const movieCount = movies ? movies.length : 0; // Default to 0 if movies is undefined
    return (
    <div className="results">
        <p style={{fontSize:"1rem"}} >Found 
        <span style={{fontWeight:"bold"}}> {movieCount}</span> results</p>
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

function MoviesList({movies, onSelectMovie}){
  return (
  <div className="movieList">
    {movies?.map((movie)=>{ 
      return <Movie movie={movie} key={movie.imdbID}
      onSelectMovie={onSelectMovie}/>
    })}
  </div>)
}

function Movie({movie, onSelectMovie}){
  return (
  <div className="eachMovie" key={movie.imdbID} onClick={()=>onSelectMovie(movie.imdbID)}>
      <img src={movie.Poster} alt="movie-poster"/>
      <div>
        <h3>{movie.Title}</h3>
        <p><span>📅</span>{movie.Year}</p>
      </div>
   </div>
   )
}

function WatchedSummary({ watched}) {
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
            <span> {Math.floor(avgImdbRating)}</span>
          </p>
          <p>
            <span>🌟</span>
            <span> {Math.floor(avgUserRating)}</span>
          </p>
          <p>
            <span>⏳</span>
            <span> {Math.floor(avgRuntime)} min</span>
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

function MovieDetails({selectedId, onCloseMovie, onAddToWatch}){

  const[movie, setMovie] = useState({});
  const[watchStatus, setWatchStatus] = useState(false);
  const [userRating, setUserRating] = useState(0); 
  
  function handleAdd() {
    const newWatchedMovie = {
      imdbID: selectedId,
      Title:title,
      Year:year,
      Poster:poster,
      runtime: Number(runtime.split(" ")[0]), // convert "148 min" → 148
      imdbRating: Number(imdbRating),
      userRating, // or fetch it from StarRating later
    };

    onAddToWatch(newWatchedMovie);
    setWatchStatus(!watchStatus);
    onCloseMovie();
  }

  const {
    Title:title,
    Year:year,
    Poster:poster,
    Runtime:runtime,
    imdbRating,
    Plot:plot, 
    Released:released,
    Actors:actors, 
    Director:director,
    Genre:genre
  }=movie;
  
  useEffect(function(){
    async function getMovieDetails(){
      const res = await fetch(`https://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`);
      const data = await res.json();
      setMovie(data);
    
    }
    getMovieDetails();
  },[selectedId])

return <div className='movieDetails'>
  <button className='back-ui' onClick={onCloseMovie}>&larr;</button>

  <div className='mdTop'>
    {/*left*/}
    <img className='mainPoster' src={poster}></img>
    {/*right*/}
    <div className='mdTopRight'>
      <h2 className='movieTitle'>{title}</h2>
      <div className='movieSub'>{released} • {runtime}</div>
      <p className='genre'>{genre}</p>
      <p className='imdbRating'>⭐ {imdbRating} IMDB Rating</p>
    </div>
    <div></div>
  </div>
  <div className='mdBottom'>
    <div className='userRating'>
    <StarRating maxStars={10} size={15} color="orange" className="starRating" onSetRating={setUserRating}/>
    { userRating > 0 &&
    <button id='watchedBtn' onClick={handleAdd} >Add to Watched List</button>}
    </div>
    <p>{plot}</p>
    <p>Actors: {actors}</p>
    <p>Directed by: {director}</p>
  </div>
</div>

}