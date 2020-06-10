import React from "react";
import PropTypes from "prop-types";
import SingleCurPlaylist from "../SingleCurPlaylist/SingleCurPlaylist";
import "./PlaylistSpotify.css";

const PlaylistSpotify = ({ playlistLists, showList }) => (
  <div className="PlaylistSpotify">
    <h2>Local Playlists</h2>
    <div className="PlaylistSpotify-list">
      {playlistLists.map((singlePlay) => (
        <SingleCurPlaylist
          showList={showList}
          id={singlePlay.id}
          key={singlePlay.id}
          name={singlePlay.name}
        />
      ))}
    </div>
  </div>
);

PlaylistSpotify.propTypes = {
  playlistLists: PropTypes.array.isRequired,
  showList: PropTypes.func.isRequired,
};

export default PlaylistSpotify;
