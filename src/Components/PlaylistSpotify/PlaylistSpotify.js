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
        <button className="Playlist-get" onClick={this.renderList}>
          Get your local playlist
        </button>
        {this.props.playlistLists.map((singlePlay) => (
          <SingleCurPlaylist
            showList={this.props.showList}
            id={singlePlay.id}
            key={singlePlay.id}
            name={singlePlay.name}
          />
        ))}
      </div>
    );
  }
}

export default PlaylistSpotify;
