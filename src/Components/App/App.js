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
    let newPlaylist;
    let songsToAdd;
    if (purpose === "NEW") {
      newPlaylist = playlistTracks.slice();
      if (newPlaylist.find((playTrack) => playTrack.id === track.id)) {
        return;
      } else {
        newPlaylist.push(track);
      }
      setPlaylistTracks(newPlaylist);
    } else if (purpose === "MODIFY") {
      newPlaylist = localPlaylistTrack.slice();
      songsToAdd = addToLocal.slice();
      if (newPlaylist.find((playTrack) => playTrack.id === track.id)) {
        return;
      } else {
        newPlaylist.push(track);
        songsToAdd.push(track);

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
