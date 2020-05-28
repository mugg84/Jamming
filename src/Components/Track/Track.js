import React from "react";

import "./Track.css";

class Track extends React.Component {
  renderAction() {
    return <button className="Track-action">{isRemoval ? "-" : "+"}</button>;
  }

  render() {
    return (
      <div class="Track">
        <div className="Track-information">
          <h3>Name</h3>
          <p>Artist | Album</p>
        </div>
        {this.renderAction}
      </div>
    );
  }
}

export default Track;
