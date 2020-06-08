import React from "react";

import SingleCurPlaylist from "../SingleCurPlaylist/SingleCurPlaylist";
import ModifyPlaylist from "../ModifyPlaylist/ModifyPlaylist";

import "./PlaylistSpotify.css";

class PlaylistSpotify extends React.Component {
  render() {
    return (
      <div className="PlaylistSpotify">
        <h2>Local Playlists</h2>

        {this.props.playlistLists.map((singlePlay) => (
          <SingleCurPlaylist
            showList={this.props.showList}
            id={singlePlay.id}
            key={singlePlay.id}
            name={singlePlay.name}
          />
        ))}

        <ModifyPlaylist
          localPlaylistTracks={this.props.localPlaylistTracks}
          localPlaylistNameId={this.props.localPlaylistNameId}
          removeTrack={this.props.removeTrack}
          modifyPlaylist={this.props.modifyPlaylist}
        />
      </div>
    );
  }
}

export default PlaylistSpotify;
