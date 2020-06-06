import React from "react";
import LocalPlaylistTracklist from "../LocalPlaylistTracklist/LocalPlaylistTracklist";

import "./ModifyPlaylist.css";

class ModifyPlaylist extends React.Component {
  render() {
    return (
      <div className="Modify-Playlist">
        <h2>{this.props.localPlaylistName}</h2>
        {
          <LocalPlaylistTracklist
            localPlaylistTracklist={this.props.localPlaylistTracks}
          />
        }
        <button className="Modify-Playlist-change">MODIFY PLAYLIST</button>
      </div>
    );
  }
}

export default ModifyPlaylist;
