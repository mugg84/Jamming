import React from "react";

import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import Playlist from "../Playlist/Playlist";

import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchResults: [
        { name: 1, artist: 1, album: 1, id: 1 },
        { name: 2, artist: 2, album: 2, id: 2 },
        { name: 3, artist: 3, album: 3, id: 3 },
      ],
      playlistName: "Name",
      playlistTracks: [
        { name: 11, artist: 11, album: 11, id: 11 },
        { name: 21, artist: 21, album: 21, id: 21 },
        { name: 31, artist: 31, album: 31, id: 31 },
      ],
    };

    this.addTrack = this.addTrack.bind(this);
  }

  addTrack(track) {
    let newPlaylist = this.state.playlistTracks;
    if (newPlaylist.find((playTrack) => playTrack.id === track.id)) {
      return;
    } else {
      newPlaylist.push(track);
    }
    this.setState({ playlistTracks: newPlaylist });
  }

  render() {
    return (
      <div>
        <h1>
          Ja<span className="highlight">mmm</span>ing
        </h1>
        <div className="App">
          {<SearchBar />}
          <div className="App-playlist">
            {
              <SearchResults
                searchResults={this.state.searchResults}
                onAdd={this.addTrack}
              />
            }
            {
              <Playlist
                playlistName={this.state.playlistName}
                playlistTracks={this.state.playlistTracks}
              />
            }
          </div>
        </div>
      </div>
    );
  }
}

export default App;
