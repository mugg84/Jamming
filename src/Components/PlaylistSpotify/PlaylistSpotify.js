import React from "react";

import SingleCurPlaylist from "../SingleCurPlaylist/SingleCurPlaylist";

import "./PlaylistSpotify.css";

class PlaylistSpotify extends React.Component {
  render() {
    return (
      <div className="PlaylistSpotify">
        <h2>Local Playlists</h2>
        <div className="PlaylistSpotify-list">
          {this.props.playlistLists.map((singlePlay) => (
            <SingleCurPlaylist
              showList={this.props.showList}
              id={singlePlay.id}
              key={singlePlay.id}
              name={singlePlay.name}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default PlaylistSpotify;
