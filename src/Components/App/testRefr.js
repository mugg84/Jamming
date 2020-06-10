import React, { useState, useEffect } from "react";
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import Playlist from "../Playlist/Playlist";
import Spotify from "../../util/Spotify";
import PlaylistSpotify from "../PlaylistSpotify/PlaylistSpotify";
import ModifyPlaylist from "../ModifyPlaylist/ModifyPlaylist";
import "./App.css";

const App = () => {
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setsearchResults] = useState([]);
  const [playlistName, setPlaylistName] = useState("New Playlist");
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [localPlaylists, setLocalPlaylists] = useState([]);
  const [localPlaylistTrack, setLocalPlaylistTrack] = useState([]);
  const [localPlaylistNameId, setLocalPlaylistNameId] = useState({});
  const [purpose, setPurpose] = useState("NEW");
  const [removeFromLocal, setRemoveFromLocal] = useState([]);
  const [addToLocal, setAddToLocal] = useState([]);

  const addTrack = (track) => {
    if (purpose === "NEW") {
      let newPlaylist = playlistTracks;
      if (newPlaylist.find((playTrack) => playTrack.id === track.id)) {
        return;
      } else {
        newPlaylist.push(track);
      }

      setPlaylistTracks(newPlaylist);
    } else if (purpose === "MODIFY") {
      let newPlaylist = localPlaylistTrack;
      let songsToAdd = addToLocal;
      if (newPlaylist.find((playTrack) => playTrack.id === track.id)) {
        return;
      } else {
        newPlaylist.push(track);
        something.push(track);
        setAddToLocal(songsToAdd);
      }
      setLocalPlaylistTrack(newPlaylist);
    }
  };

  const removeTrack = (track) => {
    let newPlaylist;
    if (purpose === "NEW") {
      let playlist = playlistTracks;
      newPlaylist = playlist.filter((playTrack) => playTrack.id !== track.id);
      setPlaylistTracks(newPlaylist);
    } else if (purpose === "MODIFY") {
      newPlaylist = localPlaylistTrack.filter(
        (playTrack) => playTrack.id !== track.id
      );

      if (
        removeFromLocal.indexOf(track) === -1 &&
        addToLocal.indexOf(track) === -1
      ) {
        removeFromLocal.push(track);
      } else if (addToLocal.indexOf(track) !== -1) {
        let index = addToLocal.indexOf(track);
        addToLocal.splice(index, 1);
      }

      setLocalPlaylistTrack(newPlaylist);
      setRemoveFromLocal(removeFromLocal);
      setAddToLocal(addToLocal);
    }
  };

  const updatePlaylistName = (name) => {
    setPlaylistName(name);
  };

  const savePlaylist = () => {
    if (playlistTracks.length) {
      const trackUris = playlistTracks.map((track) => track.uri);
      Spotify.savePlaylist(playlistName, trackUris).then(() => {
        setPlaylistName("New Playlist");
        setPlaylistTracks([]);
      });
    }
  };

  // keep search after url updated

  useEffect(() => {
    Spotify.getAccessToken();
    // eslint-disable-next-line
  }, []);

  //renders selected local playlist

  const showList = (playlistId) => {
    Spotify.getPlaylistTracks(playlistId).then((playlist) => {
      const nameId = { name: playlist.name, id: playlistId };

      setLocalPlaylistTrack(playlist.tracks);
      setLocalPlaylistNameId(nameId);
      setRemoveFromLocal([]);
      setAddToLocal([]);
    });
  };

  const getLocalPlaylists = () => {
    Spotify.getPlaylist().then((playlistLists) => {
      if (playlistLists.items.length > 0) {
        let newList = playlistLists.items.map((playlist) => {
          return {
            name: playlist.name,
            id: playlist.id,
          };
        });

        setLocalPlaylists(newList);

        showList(newList[0].id);
      }
    });
  };

  const modifyPlaylist = () => {
    if (addToLocal.length && localPlaylistNameId.id.length) {
      Spotify.addItemToPlaylist(localPlaylistNameId.id, addToLocal).then(
        (response) => {
          setAddToLocal([]);
        }
      );
    }

    if (removeFromLocal.length && localPlaylistNameId.id.length) {
      Spotify.removeItemFromPlaylist(
        localPlaylistNameId.id,
        removeFromLocal
      ).then((response) => {
        setRemoveFromLocal([]);
      });
    }
  };

  const search = (term) => {
    Spotify.search(term).then((searchResults) => {
      // filters results in order not to show tracks already in the playlist
      searchResults = searchResults.filter((track) => {
        return playlistTracks.every((el) => el.uri !== track.uri);
      });
      setsearchResults(searchResults);
      setSearchInput(term);
    });
  };

  const changePurpose = () => {
    if (purpose === "NEW") {
      setPurpose("MODIFY");

      getLocalPlaylists();
    } else {
      setPurpose("NEW");
    }
  };

  const renderTypeOfResult = () => {
    if (purpose === "NEW") {
      return (
        <Playlist
          playlistName={playlistName}
          playlistTracks={playlistTracks}
          onRemove={removeTrack}
          onNameChange={updatePlaylistName}
          onSave={savePlaylist}
        />
      );
    } else if (purpose === "MODIFY") {
      return (
        <div className="LocalPlay">
          <PlaylistSpotify playlistLists={localPlaylists} showList={showList} />
          <ModifyPlaylist
            modifyPlaylist={modifyPlaylist}
            localPlaylistTracks={localPlaylistTrack}
            localPlaylistNameId={localPlaylistNameId.name}
            removeTrack={removeTrack}
          />
        </div>
      );
    }
  };

  return (
    <div>
      <h1>
        Ja<span className="highlight">mmm</span>ing
      </h1>
      <div className="App">
        {
          <SearchBar
            onSearch={search}
            changePurpose={changePurpose}
            action={purpose}
          />
        }
        <div className="App-playlist">
          {<SearchResults searchResults={searchResults} onAdd={addTrack} />}
          {renderTypeOfResult()}
        </div>
      </div>
    </div>
  );
};

export default App;


/*
import React from "react";
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import Playlist from "../Playlist/Playlist";
import Spotify from "../../util/Spotify";
import PlaylistSpotify from "../PlaylistSpotify/PlaylistSpotify";
import ModifyPlaylist from "../ModifyPlaylist/ModifyPlaylist";
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
      purpose: "NEW",
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
    if (this.state.purpose === "NEW") {
      let newPlaylist = this.state.playlistTracks;
      if (newPlaylist.find((playTrack) => playTrack.id === track.id)) {
        return;
      } else {
        newPlaylist.push(track);
      }
      this.setState({ playlistTracks: newPlaylist });
    } else if (this.state.purpose === "MODIFY") {
      let newPlaylist = this.state.localPlaylistTracks;
      let songsToAdd = this.state.addToLocal;
      if (newPlaylist.find((playTrack) => playTrack.id === track.id)) {
        return;
      } else {
        newPlaylist.push(track);
        songsToAdd.push(track);
        this.setState({ addToLocal: songsToAdd });
      }
      this.setState({ localPlaylistTracks: newPlaylist });
    }
  }

  removeTrack(track) {
    if (this.state.purpose === "NEW") {
      let playlist = this.state.playlistTracks;
      let newPlaylist = playlist.filter(
        (playTrack) => playTrack.id !== track.id
      );
      this.setState({
        playlistTracks: newPlaylist,
      });
    } else if (this.state.purpose === "MODIFY") {
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
    if (this.state.playlistTracks.length) {
      const trackUris = this.state.playlistTracks.map((track) => track.uri);
      Spotify.savePlaylist(this.state.playlistName, trackUris).then(() => {
        this.setState({
          playlistName: "New Playlist",
          playlistTracks: [],
        });
      });
    }
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
    if (this.state.purpose === "NEW") {
      this.setState({ purpose: "MODIFY" });
      this.getLocalPlaylists();
    } else {
      this.setState({ purpose: "NEW" });
    }
  }

  renderTypeOfResult() {
    if (this.state.purpose === "NEW") {
      return (
        <Playlist
          playlistName={this.state.playlistName}
          playlistTracks={this.state.playlistTracks}
          onRemove={this.removeTrack}
          onNameChange={this.updatePlaylistName}
          onSave={this.savePlaylist}
        />
      );
    } else if (this.state.purpose === "MODIFY") {
      return (
        <div className="LocalPlay">
          <PlaylistSpotify
            playlistLists={this.state.localPlaylists}
            showList={this.showList}
          />
          <ModifyPlaylist
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
*/