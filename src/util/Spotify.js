// Add personal spotify API key
const clientID = process.env.REACT_APP_JAMMING_CLIENT_ID;
const redirectURI = "http://localhost:3000/";

let accessToken;

const Spotify = {
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    } // check access token match
    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

    if (accessTokenMatch && expiresInMatch) {
      accessToken = accessTokenMatch[1];
      const expiresIn = Number(expiresInMatch[1]);

      //clear parmeters
      window.setTimeout(() => (accessToken = ""), expiresIn * 1000);
      window.history.pushState("Access Token", null, "/");
      return accessToken;
    } else {
      const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
      window.location.href = accessUrl;
    }
  },

  search(term) {
    const accessToken = Spotify.getAccessToken();
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
      .then((response) => response.json())
      .then((jsonResponse) => {
        if (!jsonResponse.tracks) {
          return [];
        }
        return jsonResponse.tracks.items.map((track) => {
          return {
            id: track.id,
            name: track.name,
            artists: track.artists[0].name,
            album: track.album.name,
            image: track.album.images[0].url,
            preview: track.preview_url,
            uri: track.uri,
          };
        });
      });
  },

  getPlaylist() {
    const accessToken = Spotify.getAccessToken();
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    return fetch("https://api.spotify.com/v1/me/playlists", {
      headers: headers,
    })
      .then((response) => response.json())
      .then((jsonResponse) => {
        if (!jsonResponse) {
          return [];
        }
        return jsonResponse;
      });
  },

  getPlaylistTracks(id) {
    const accessToken = Spotify.getAccessToken();
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    return fetch(`https://api.spotify.com/v1/playlists/${id}`, {
      headers: headers,
    })
      .then((response) => response.json())
      .then((jsonResponse) => {
        let tracks = jsonResponse.tracks.items.map((track) => {
          return {
            id: track.track.id,
            name: track.track.name,
            artists: track.track.artists[0].name,
            album: track.track.album.name,
            image: track.track.album.images[0].url,
            preview: track.track.preview_url,
            uri: track.track.uri,
          };
        });
        let name = jsonResponse.name;
        return { tracks: tracks, name: name };
      });
  },

  savePlaylist(name, trackUris) {
    if (!name || !trackUris.length) {
      return;
    }
    let userID;

    const accessToken = Spotify.getAccessToken();
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };
    return fetch("https://api.spotify.com/v1/me", { headers: headers })
      .then((response) => response.json())
      .then((jsonResponse) => (userID = jsonResponse.id))
      .then((userID) => {
        return fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
          method: "POST",
          headers: headers,
          body: JSON.stringify({
            name: name,
          }),
        });
      })
      .then((response) => {
        return response.json();
      })
      .then((jsonResponse) => {
        const playlistID = jsonResponse.id;
        return fetch(
          `https://api.spotify.com/v1/playlists/${playlistID}/tracks`,
          {
            headers: headers,
            method: "POST",
            body: JSON.stringify({ uris: trackUris }),
          }
        );
      });
  },

  addItemToPlaylist(playlistId, tracks) {
    if (!playlistId || !tracks.length) {
      return;
    }

    let uris = tracks.map((track) => track.uri);

    const accessToken = Spotify.getAccessToken();
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    return fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
      headers: headers,
      method: "POST",
      body: JSON.stringify({ uris: uris }),
    });
  },

  removeItemFromPlaylist(playlistId, tracks) {
    if (!playlistId || !tracks.length) {
      return;
    }

    let uris = tracks.map((track) => {
      return { uri: track.uri };
    });

    const accessToken = Spotify.getAccessToken();
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    try {
      return fetch(
        `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
        {
          headers: headers,
          method: "DELETE",
          body: JSON.stringify({ tracks: uris }),
        }
      );
    } catch (e) {
      console.log(e);
    }
  },
};

export default Spotify;
