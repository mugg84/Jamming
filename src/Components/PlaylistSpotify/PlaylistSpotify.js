import React from "react";

import SingleCurPlaylist from "../SingleCurPlaylist/SingleCurPlaylist";

import "./PlaylistSpotify.css";

class PlaylistSpotify extends React.Component {
  constructor(props) {
    super(props);
    this.renderList = this.renderList.bind(this);
  }

  renderList() {
    this.props.getLocalPlaylists();
  }

  render() {
    return (
      <div className="PlaylistSpotify">
        <h2>Local Playlists</h2>
        <button className="Playlist-save" onClick={this.renderList}>
          Get your local playlist
        </button>
        {this.props.playlistLists.map((singlePlay) => (
          <SingleCurPlaylist name={singlePlay.name}/>
        ))}
      </div>
    );
  }
}

export default PlaylistSpotify;
