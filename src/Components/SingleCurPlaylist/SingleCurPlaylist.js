import React from "react";
import PropTypes from "prop-types";
import "./SingleCurPlaylist.css";

const SingleCurPlaylist = ({ showList, id, name }) => {
  function getShowList() {
    showList(id);
  }

  return (
    <div className="Single-list" onClick={getShowList}>
      <h4>{name}</h4>
    </div>
  );
};

SingleCurPlaylist.propTypes = {
  showList: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default SingleCurPlaylist;
