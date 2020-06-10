import React from "react";
import PropTypes from "prop-types";
import Tracklist from "../Tracklist/Tracklist";
import "./Playlist.css";

const Playlist = ({
  onNameChange,
  playlistName,
  playlistTracks,
  onRemove,
  onSave,
}) => {
  function handleNameChange(event) {
    onNameChange(event.target.value);
  }

  return (
    <div className="Playlist">
      <div className="Playlist-Input">
        <input value={playlistName} onChange={handleNameChange} />
      </div>
      <div className="Playlist-Results">
        {
          <Tracklist
            tracks={playlistTracks}
            onRemove={onRemove}
            isRemoval={true}
          />
        }
      </div>
      <div className="Playlist-Btn">
        <button className="Playlist-save" onClick={onSave}>
          SAVE TO SPOTIFY
        </button>
      </div>
    </div>
  );
};

Playlist.propTypes = {
  onNameChange: PropTypes.func.isRequired,
  playlistName: PropTypes.string.isRequired,
  handleNameChange: PropTypes.func,
  playlistTracks: PropTypes.array.isRequired,
  onRemove: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default Playlist;
