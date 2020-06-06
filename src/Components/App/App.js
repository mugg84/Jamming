import React from "react";

import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import Playlist from "../Playlist/Playlist";
import Spotify from "../../util/Spotify";
import PlaylistSpotify from "../PlaylistSpotify/PlaylistSpotify";

import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchInput: "",
      searchResults: [],
      playlistName: "New Playlist",
      playlistTracks: [],
      localPlaylists: [],
    };

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
    this.getLocalPlaylists = this.getLocalPlaylists.bind(this);
    this.showList = this.showList.bind(this);
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

  // keep search after url updated

  componentDidMount() {
    Spotify.getAccessToken();
  }

  //renders selected local playlist

  showList(playlistId) {
    Spotify.getPlaylistTracks(playlistId).then((playlist) => {
      this.setState({
        playlistTracks: playlist.tracks,
        playlistName: playlist.name,
      });
    });
  }

  getLocalPlaylists() {
    Spotify.getPlaylist().then((playlistLists) => {
      let newList = playlistLists.items.map((playlist) => {
        return {
          name: playlist.name,
          id: playlist.id,
        };
      });
      this.setState({ localPlaylists: newList });
    });
  }

  search(term) {
    Spotify.search(term).then((searchResults) => {
      // filters results in order not to show tracks already in the playlist
      searchResults = searchResults.filter((track) => {
        return this.state.playlistTracks.every((el) => el.uri !== track.uri);
      });

      this.setState({ searchResults: searchResults, searchInput: term });
    });
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
            {
              <PlaylistSpotify
                getLocalPlaylists={this.getLocalPlaylists}
                playlistLists={this.state.localPlaylists}
                showList={this.showList}
              />
            }
          </div>
        </div>
      </div>
    );
  }
}

export default App;
