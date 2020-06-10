import React from "react";
import "./LocalPlaylistTracklist.css";
import PropTypes from "prop-types";
import Track from "../Track/Track";

const LocalPlaylistTracklist = ({ onRemoveCurr, localPlaylistTracklist }) => (
  <div className="Playlist-TrackList">
    {localPlaylistTracklist.map((track) => (
      <Track
        key={track.id}
        track={track}
        onRemove={onRemoveCurr}
        isRemoval={true}
      />
    ))}
  </div>
);

LocalPlaylistTracklist.propTypes = {
  onRemoveCurr: PropTypes.func.isRequired,
  localPlaylistTracklist: PropTypes.array.isRequired,
};

export default LocalPlaylistTracklist;
