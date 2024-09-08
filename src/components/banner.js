import { useState } from "react";

export default function Banner(){

    const [searchText, setSearchText] = useState("");

    return (
        <div className="banner">
            <div className="logo"><h1 style={{fontSize:"1.8rem"}}>🍿 usePopcorn</h1></div>
            <input 
                type="text" 
                className="search" 
                placeholder="Search movies..." 
                onChange={(e)=>setSearchText(e.target.value)}
                value={searchText}/>
            <div className="results">
                <p style={{fontSize:"1rem"}} >Found 
                    <span style={{fontWeight:"bold"}}> 3</span> results</p></div>
        </div>
    )
}