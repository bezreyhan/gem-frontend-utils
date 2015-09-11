import React from 'react';

const HiddenSecretBox = React.createClass({
  displayName: 'HiddenSecretBox',


  render() {
    return (
      <div className="hidden-secret-box">
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
      </div>
    );
  }
});

export default HiddenSecretBox;
