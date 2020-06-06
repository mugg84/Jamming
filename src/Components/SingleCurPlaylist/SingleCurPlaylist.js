import React from "react";

import "./SingleCurPlaylist.css";

class SingleCurPlaylist extends React.Component {
  constructor(props) {
    super(props);

    this.showList = this.showList.bind(this);
  }

  showList() {
    this.props.showList(this.props.id);
  }

  render() {
    return (
      <div className="Single-list" onClick={this.showList}>
        <h4>{this.props.name}</h4>
      </div>
    );
  }
}

export default SingleCurPlaylist;
