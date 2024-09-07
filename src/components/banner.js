import { useState } from "react";

export default function Banner(){

    const [searchText, setSearchText] = useState("");

    return (
        <div className="banner">
            <div className="logo"><h1>🍿 usePopcorn</h1></div>
            <input 
                type="text" 
                className="search" 
                placeholder="Search movies..." 
                onChange={(e)=>setSearchText(e.target.value)}
                value={searchText}/>
            <div className="results"><h3>Found 3 results</h3></div>
        </div>
    )
}