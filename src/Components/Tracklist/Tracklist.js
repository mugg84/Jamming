import React from "react";
import PropTypes from "prop-types";
import "./Tracklist.css";

import Track from "../Track/Track";

const Tracklist = ({ tracks, onRemove, onAdd, isRemoval }) => (
  <div className="TrackList">
    {tracks.map((track) => (
      <Track
        key={track.id}
        track={track}
        onAdd={onAdd}
        onRemove={onRemove}
        isRemoval={isRemoval}
      />
    ))}
  </div>
);

Tracklist.propTypes = {
  tracks: PropTypes.array.isRequired,
  onRemove: PropTypes.func,
  onAdd: PropTypes.func,
  isRemoval: PropTypes.bool,
};

export default Tracklist;
