import React from "react";
import LocalPlaylistTracklist from "../LocalPlaylistTracklist/LocalPlaylistTracklist";

import "./ModifyPlaylist.css";

class ModifyPlaylist extends React.Component {
  render() {
    return (
      <div className="Modify-Playlist">
        <h2>{this.props.localPlaylistNameId}</h2>
        {
          <LocalPlaylistTracklist
            onRemoveCurr={this.props.removeTrack}
            localPlaylistTracklist={this.props.localPlaylistTracks}
          />
        }
        <button
          onClick={this.props.modifyPlaylist}
          className="Modify-Playlist-change"
        >
          MODIFY PLAYLIST
        </button>
      </div>
    );
  }
}

export default ModifyPlaylist;
