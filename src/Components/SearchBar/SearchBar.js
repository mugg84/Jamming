import React, { useState } from "react";
import PropTypes from "prop-types";

import "./SearchBar.css";

const SearchBar = ({ changePurpose, action, onSearch }) => {
  const [term, setTerm] = useState("");

  const handleTermChange = (event) => {
    setTerm(event.target.value);
  };

  function search() {
    onSearch(term);
  }

  return (
    <div className="SearchBar">
      <div className="SearchBar-search">
        <input
          placeholder="Enter A Song, Album, or Artist"
          onChange={handleTermChange}
        />
        <button onClick={search} className="SearchButton">
          SEARCH
        </button>
      </div>

      <div className="SearchBar-change">
        <button onClick={changePurpose} className="result-type">
          {action} PLAYLIST
        </button>
      </div>
    </div>
  );
};

SearchBar.propTypes = {
  changePurpose: PropTypes.func.isRequired,
  action: PropTypes.string.isRequired,
  onSearch: PropTypes.func.isRequired,
};

export default SearchBar;
