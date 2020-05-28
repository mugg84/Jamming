import React from "react";
import Track from "../Track/Track";
import "./Tracklist.css";

class Tracklist extends React.Component {
  render() {
    return (
      <div className="TrackList">
        {this.props.tracks.map((track) => {
          return (
            <li key={this.props.track.id}>
              <Track
                name={this.props.track.name}
                artist={this.props.track.artist}
                album={this.props.track.album}
              />
            </li>
          );
        })}
      </div>
    );
  }
}

export default Tracklist;
