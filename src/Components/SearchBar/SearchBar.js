import React from "react";

import "./SearchBar.css";

class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = { term: "" };

    this.search = this.search.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
  }

  handleTermChange(event) {
    this.setState({ term: event.target.value });
  }

  search() {
    this.props.onSearch(this.state.term);
  }

  render() {
    return (
      <div className="SearchBar">
        <div className="SearchBar-search">
          <input
            placeholder="Enter A Song, Album, or Artist"
            onChange={this.handleTermChange}
          />
          <button onClick={this.search} className="SearchButton">
            SEARCH
          </button>
        </div>

        <div className="SearchBar-change">
          <button onClick={this.props.changePurpose} className="result-type">
            {this.props.action} PLAYLIST
          </button>
        </div>
      </div>
    );
  }
}

export default SearchBar;
