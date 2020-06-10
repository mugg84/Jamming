import React from "react";
import PropTypes from "prop-types";
import LocalPlaylistTracklist from "../LocalPlaylistTracklist/LocalPlaylistTracklist";
import "./ModifyPlaylist.css";

const ModifyPlaylist = ({
  localPlaylistNameId,
  removeTrack,
  localPlaylistTracks,
  modifyPlaylist,
}) => (
  <div className="Modify-Playlist">
    <h2>{localPlaylistNameId}</h2>
    <div className="Modify-Playlist-list">
      {
        <LocalPlaylistTracklist
          onRemoveCurr={removeTrack}
          localPlaylistTracklist={localPlaylistTracks}
        />
      }
    </div>

    <button onClick={modifyPlaylist} className="Modify-Playlist-change">
      MODIFY PLAYLIST
    </button>
  </div>
);

ModifyPlaylist.propTypes = {
  localPlaylistNameId: PropTypes.string,
  removeTrack: PropTypes.func.isRequired,
  localPlaylistTracks: PropTypes.array.isRequired,
  modifyPlaylist: PropTypes.func.isRequired,
};

export default ModifyPlaylist;
