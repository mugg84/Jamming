import React from "react";
import PropTypes from "prop-types";
import "./Track.css";

const Track = ({ isRemoval, track, onAdd, onRemove }) => {
  const renderAction = () => {
    if (isRemoval) {
      return (
        <button className="Track-action" onClick={removeTrack}>
          -
        </button>
      );
    } else {
      return (
        <button className="Track-action" onClick={addTrack}>
          +
        </button>
      );
    }
  };

  const renderAudio = () => {
    if (track.preview) {
      return (
        <audio controls="controls" className="audioPreview">
          <source src={track.preview} type="audio/mp4" />
        </audio>
      );
    } else {
      return <p>Preview not available</p>;
    }
  };

  const addTrack = () => {
    onAdd(track);
  };

  const removeTrack = () => {
    onRemove(track);
  };

  return (
    <div className="Track">
      <div className="Track-information">
        <h3>{track.name}</h3>
        <img src={track.image} alt={track.artist} />
        <p>
          {track.artist} | {track.album}
        </p>
        <div className="previewText">{renderAudio()}</div>
      </div>
      {renderAction()}
    </div>
  );
};

Track.propTypes = {
  isRemoval: PropTypes.bool,
  track: PropTypes.object.isRequired,
  onAdd: PropTypes.func,
  onRemove: PropTypes.func,
};

export default Track;
