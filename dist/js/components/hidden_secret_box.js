var HiddenSecretBox, React;

React = require('react');

HiddenSecretBox = React.createClass({
  render: function() {
    return React.createElement("div", {
      "className": "hidden-secret-box"
    }, React.createElement("div", {
      "className": "circle"
    }), React.createElement("div", {
      "className": "circle"
    }), React.createElement("div", {
      "className": "circle"
    }));
  }
});

module.exports = HiddenSecretBox;
