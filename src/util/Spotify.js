const clientID = "INSERT CLIENT ID";
const redirectURI = "http://localhost:3000/";

let accessToken;

const Spotify = {
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    }

    // check access token match
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
      window.location = accessUrl;
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
          console.log(track);
          return {
            id: track.id,
            name: track.name,
            artists: track.artists[0].name,
            album: track.album.name,
            uri: track.uri,
          };
        });
      });
  },

  savePlaylist(name, trackUris) {
    if (!name || !trackUris.length) {
      return;
    }

    const accessToken = Spotify.getAccessToken();
    const headers = { Authorization: `Bearer ${accessToken}` };
    let userID;
    return fetch("https://api.spotify.com/v1/me", { headers: headers })
      .then((response) => response.json())
      .then((jsonResponse) => {
        userID = jsonResponse.id;
        try {
          return (
            fetch(`https://api.spotify.com/v1/users/${userID}/playlists`),
            {
              headers: headers,
              method: "POST",
              body: JSON.stringify({ name: name }),
            }
          );
        } catch (e) {
          console.log(e);
        }
      })
      .then((response) => response.json())
      .then((jsonResponse) => {
        const playlistID = jsonResponse.id;
        return fetch(
          `https://api.spotify.com/v1/v1/playlists/${playlistID}/tracks`,
          {
            headers: headers,
            method: "POST",
            body: JSON.stringify({ uris: trackUris }),
          }
        );
      });
  },
};

export default Spotify;
