var React, SuccessFlash;

React = require('react');

SuccessFlash = React.createClass({
  render: function() {
    var successDisplay;
    successDisplay = this.props.status ? 'show' : 'hide';
    return React.createElement("div", {
      "className": "success-flash " + successDisplay
    }, this.props.status);
  }
});

module.exports = SuccessFlash;
