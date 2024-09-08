import { useState } from "react";

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
  
  const average = (arr) =>
    arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export default function Main(){

    const [isOpen, setIsOpen] = useState(true);
    const [isOpen2, setIsOpen2] = useState(true);

    const avgUserRating = average(tempWatchedData.map((movie)=>movie.userRating));
    const avgImdbRating = average(tempWatchedData.map((movie)=>movie.imdbRating));
    const avgRuntime = average(tempWatchedData.map((movie)=>movie.runtime));

    console.log(avgUserRating)
    console.log(avgImdbRating)
    console.log(avgRuntime)

    return(
        <div className="main">
            <div className="leftBox">
                <div className="minimizer" onClick={()=>setIsOpen(!isOpen)}>
                    <span className="minimizer-ui">{isOpen?"-":"+"}</span></div>
                {isOpen&& <div className="movieList">
                    {tempMovieData?.map((movie)=>{ 
                        return <div className="eachMovie" key={movie.imdbID}>
                        <img src={movie.Poster} alt="movie-poster"/>
                        <div>
                            <h3>{movie.Title}</h3>
                            <p><span>📅</span>{movie.Year}</p>
                        </div>
                    </div>
                 })}
                
                </div>}
            </div>

            {/* Second Box*/}

            <div className="leftBox">
                <div className="minimizer" onClick={()=>setIsOpen2(!isOpen2)}>
                    <span className="minimizer-ui">{isOpen2?"-":"+"}</span></div>
                {isOpen2&& <div className="movieList">
                    {/* movies watched summary */}
                <div className="summary">
                <h2>Movies you watched</h2>
                <div className="summaryStats">
                  <p>
                    <span>#️⃣</span>
                    <span> {tempWatchedData.length} movies</span>
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
                    {tempWatchedData?.map((movie)=>{ 
                        return <div className="eachMovie" key={movie.imdbID}>
                        <img src={movie.Poster} alt="movie-poster"/>
                        <div>
                            <h3>{movie.Title}</h3>
                            <div className="watchMovieMeta">
                             <p><span>🌟</span>{movie.imdbRating}</p>
                             <p><span>🙆‍♂️</span>{movie.userRating}</p>
                             <p><span>⌛</span>{movie.runtime}</p>
                            </div>
                        </div>
                    </div>
                 })}
                
                </div>}
            </div>

        </div>
    )
}