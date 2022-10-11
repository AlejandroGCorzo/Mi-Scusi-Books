import React, { useState } from "react";
import "./SearchBar.css";
import Search from "../../sourceImg/search.svg";

export default function SearchBar() {
  const [name, setName] = useState([])

  function handleInputChange(i){
    setName(i.target.value);
  };

  function handleSubmit(i){
    i.preventDefault();
    setName("");
  }

  return (
    <div>
        <div className="search">

          <input
            id="Searching"
            className="searchTerm"
            type="text"
            value={name}
            placeholder="Search..."
            onChange= {handleInputChange} 
            pattern="^[A-Za-z\s]+$" 
            maxLength="30"
          />

          <button className ="searchButton" type="submit" onClick= {handleSubmit}> 
            <img src={Search} alt="imgType" width="24px" height="24px"/> 
          </button>

        </div>

    </div>
  );
}