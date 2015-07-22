var ErrorFlash, React;

React = require('react');

ErrorFlash = React.createClass({
  render: function() {
    var error, errorDisplay, errors;
    error = this.props.error;
    errorDisplay = error ? Array.isArray(error) && error.length === 0 ? 'hide' : 'show' : 'hide';
    if (error === 'show') {
      errors = (function() {
        var i, len, ref, results;
        ref = this.props.error;
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          error = ref[i];
          results.push(React.createElement("div", null, error));
        }
        return results;
      }).call(this);
    } else {
      errors = [];
    }
    return React.createElement("div", {
      "className": "flash-error " + errorDisplay
    }, React.createElement("p", null, this.props.error), React.createElement("a", {
      "href": 'mailto:support@gem.co'
    }, "Having trouble? Contact support."));
  }
});

module.exports = ErrorFlash;
