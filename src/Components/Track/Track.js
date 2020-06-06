import React from "react";

import "./Track.css";

class Track extends React.Component {
  constructor(props) {
    super(props);

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.renderAudio = this.renderAudio.bind(this);
  }

  renderAction() {
    if (this.props.isRemoval) {
      return (
        <button className="Track-action" onClick={this.removeTrack}>
          -
        </button>
      );
    } else {
      return (
        <button className="Track-action" onClick={this.addTrack}>
          +
        </button>
      );
    }
  }

  renderAudio() {
    if (this.props.track.preview) {
      return (
        <audio controls="controls" className="audioPreview">
          <source src={this.props.track.preview} type="audio/mp4" />
        </audio>
      );
    } else {
      return <p>Preview not available</p>;
    }
  }

  addTrack() {
    this.props.onAdd(this.props.track);
  }

  removeTrack() {
    this.props.onRemove(this.props.track);
  }

  render() {
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{this.props.track.name}</h3>
          <img src={this.props.track.image} alt={this.props.track.artist}  />
          <p>
            {this.props.track.artist} | {this.props.track.album}
          </p>
          <div className="previewText">{this.renderAudio()}</div>
        </div>
        {this.renderAction()}
      </div>
    );
  }
}

export default Track;
