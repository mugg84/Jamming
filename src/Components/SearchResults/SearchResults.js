import React from "react";

import "./SearchResults.css";

import Tracklist from "../Tracklist/Tracklist";

class SearchResults extends React.Component {
  render() {
    return (
      <div className="SearchResults">
        <div className="SearchResults-Title">
          <h2>Results</h2>
        </div>
        <div className="SearchResults-Tracks">
          <Tracklist
            tracks={this.props.searchResults}
            onAdd={this.props.onAdd}
          />
        </div>
      </div>
    );
  }
}

export default SearchResults;
