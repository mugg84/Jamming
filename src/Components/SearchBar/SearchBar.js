import React from "react";
import "./SearchBar.css";

class SeearchBar extends React.Component {
  render() {
    return (
      <div className="SearchBar">
        <input placeholder="Enter A Song, Album, or Artist" />
        <button className="SearchButton">SEARCH</button>
      </div>
    );
  }
}

export default SeearchBar;
