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
      localPlaylistTracks: [],
      localPlaylistNameId: {},
      purpose: "Create",
      removeFromLocal: [],
      addToLocal: [],
    };

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
    this.getLocalPlaylists = this.getLocalPlaylists.bind(this);
    this.showList = this.showList.bind(this);
    this.changePurpose = this.changePurpose.bind(this);
    this.modifyPlaylist = this.modifyPlaylist.bind(this);
  }

  addTrack(track) {
    if (this.state.purpose === "Create") {
      let newPlaylist = this.state.playlistTracks;
      if (newPlaylist.find((playTrack) => playTrack.id === track.id)) {
        return;
      } else {
        newPlaylist.push(track);
      }
      this.setState({ playlistTracks: newPlaylist });
    } else if (this.state.purpose === "Modify") {
      let newPlaylist = this.state.localPlaylistTracks;
      if (newPlaylist.find((playTrack) => playTrack.id === track.id)) {
        return;
      } else {
        newPlaylist.push(track);
        this.state.addToLocal.push(track);
      }
      this.setState({ localPlaylistTracks: newPlaylist });
    }
  }

  removeTrack(track) {
    if (this.state.purpose === "Create") {
      let playlist = this.state.playlistTracks;
      let newPlaylist = playlist.filter(
        (playTrack) => playTrack.id !== track.id
      );
      this.setState({
        playlistTracks: newPlaylist,
      });
    } else if (this.state.purpose === "Modify") {
      let tracksToRemove = this.state.removeFromLocal;
      let tracksToAdd = this.state.addToLocal;
      let newPlaylist = this.state.localPlaylistTracks.filter(
        (playTrack) => playTrack.id !== track.id
      );

      if (
        tracksToRemove.indexOf(track) === -1 &&
        tracksToAdd.indexOf(track) === -1
      ) {
        tracksToRemove.push(track);
      } else if (tracksToAdd.indexOf(track) !== -1) {
        let index = tracksToAdd.indexOf(track);
        tracksToAdd.splice(index, 1);
      }

      this.setState({
        localPlaylistTracks: newPlaylist,
        removeFromLocal: tracksToRemove,
        addToLocal: tracksToAdd,
      });
    }
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
      const nameId = { name: playlist.name, id: playlistId };
      this.setState({
        localPlaylistTracks: playlist.tracks,
        localPlaylistNameId: nameId,
        removeFromLocal: [],
        addToLocal: [],
      });
    });
  }

  getLocalPlaylists() {
    Spotify.getPlaylist().then((playlistLists) => {
      if (playlistLists.items.length > 0) {
        let newList = playlistLists.items.map((playlist) => {
          return {
            name: playlist.name,
            id: playlist.id,
          };
        });
        this.setState({ localPlaylists: newList });
        this.showList(newList[0].id);
      }
    });
  }

  modifyPlaylist() {
    if (
      this.state.addToLocal.length &&
      this.state.localPlaylistNameId.id.length
    ) {
      Spotify.addItemToPlaylist(
        this.state.localPlaylistNameId.id,
        this.state.addToLocal
      ).then((response) => {
        this.setState({ addToLocal: [] });
      });
    }

    if (
      this.state.removeFromLocal.length &&
      this.state.localPlaylistNameId.id.length
    ) {
      Spotify.removeItemFromPlaylist(
        this.state.localPlaylistNameId.id,
        this.state.removeFromLocal
      ).then((response) => {
        this.setState({ removeFromLocal: [] });
      });
    }
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

  changePurpose() {
    if (this.state.purpose === "Create") {
      this.setState({ purpose: "Modify" });
      this.getLocalPlaylists();
    } else {
      this.setState({ purpose: "Create" });
    }
  }

  renderTypeOfResult() {
    if (this.state.purpose === "Create") {
      return (
        <Playlist
          playlistName={this.state.playlistName}
          playlistTracks={this.state.playlistTracks}
          onRemove={this.removeTrack}
          onNameChange={this.updatePlaylistName}
          onSave={this.savePlaylist}
        />
      );
    } else if (this.state.purpose === "Modify") {
      return (
        <div className="localPlay">
          <PlaylistSpotify
            playlistLists={this.state.localPlaylists}
            showList={this.showList}
            modifyPlaylist={this.modifyPlaylist}
            localPlaylistTracks={this.state.localPlaylistTracks}
            localPlaylistNameId={this.state.localPlaylistNameId.name}
            removeTrack={this.removeTrack}
          />
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        <h1>
          Ja<span className="highlight">mmm</span>ing
        </h1>
        <div className="App">
          {
            <SearchBar
              onSearch={this.search}
              changePurpose={this.changePurpose}
              action={this.state.purpose}
            />
          }
          <div className="App-playlist">
            {
              <SearchResults
                searchResults={this.state.searchResults}
                onAdd={this.addTrack}
              />
            }
            {this.renderTypeOfResult()}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
