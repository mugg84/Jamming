import React from "react";

import "./Playlist.css";

import Tracklist from "../Tracklist/Tracklist";

class Playlist extends React.Component {
  constructor(props) {
    super(props);
    this.handleNameChange = this.handleNameChange.bind(this);
  }

  handleNameChange(event) {
    this.props.onNameChange(event.target.value);
  }

  render() {
    return (
      <div className="Playlist">
        <div className="Playlist-Input">
          <input
            value={this.props.playlistName}
            onChange={this.handleNameChange}
          />
        </div>
        <div className="Playlist-Results">
          {
            <Tracklist
              tracks={this.props.playlistTracks}
              onRemove={this.props.onRemove}
              isRemoval={true}
            />
          }
        </div>
        <div className="Playlist-Btn">
          <button className="Playlist-save" onClick={this.props.onSave}>
            SAVE TO SPOTIFY
          </button>
        </div>
      </div>
    );
  }
}

export default Playlist;
