import React from "react";

import "./LocalPlaylistTracklist.css";

import Track from "../Track/Track";

class LocalPlaylistTracklist extends React.Component {
  constructor(props) {
    super(props);

    this.state = { add: [], remove: [] };
  }

  render() {
    return (
      <div className="Playlist-TrackList">
        {this.props.localPlaylistTracklist.map((track) => (
          <Track
            key={track.id}
            track={track}
            onRemove={this.props.onRemoveCurr}
            isRemoval={true}
          />
        ))}
      </div>
    );
  }
}

export default LocalPlaylistTracklist;
