import React from "react";

import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import Playlist from "../Playlist/Playlist";
import Spotify from "../../util/Spotify";

import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchResults: [],
      playlistName: "New Playlist",
      playlistTracks: [],
    };

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
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

  removeTrack(track) {
    let playlist = this.state.playlistTracks;
    let newPlaylist = playlist.filter((playTrack) => playTrack.id !== track.id);
    this.setState({ playlistTracks: newPlaylist });
  }

  updatePlaylistName(name) {
    this.setState({ playlistName: name });
  }

  savePlaylist() {
    const trackUris = this.state.playlistTracks.map((track) => track.uri);
    Spotify.savePlaylist(this.state.playlistName, trackUris).then(() => {
      this.setState({
        playlistName: "New Playlist",
        playlistTracks: [],
      });
    });
  }

  search(term) {
    Spotify.search(term).then((searchResults) =>
      this.setState({ searchResults: searchResults })
    );
  }

  render() {
    return (
      <div>
        <h1>
          Ja<span className="highlight">mmm</span>ing
        </h1>
        <div className="App">
          {<SearchBar onSearch={this.search} />}
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
                onRemove={this.removeTrack}
                onNameChange={this.updatePlaylistName}
                onSave={this.savePlaylist}
              />
            }
          </div>
        </div>
      </div>
    );
  }
}

export default App;
