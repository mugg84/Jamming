import React from "react";
import PropTypes from "prop-types";
import "./SearchResults.css";
import Tracklist from "../Tracklist/Tracklist";

const SearchResults = ({ searchResults, onAdd }) => (
  <div className="SearchResults">
    <div className="SearchResults-Title">
      <h2>Results</h2>
    </div>
    <div className="SearchResults-Tracks">
      <Tracklist tracks={searchResults} onAdd={onAdd} isRemoval={false} />
    </div>
  </div>
);

SearchResults.propTypes = {
  searchResults: PropTypes.array.isRequired,
  onAdd: PropTypes.func.isRequired,
};

export default SearchResults;
