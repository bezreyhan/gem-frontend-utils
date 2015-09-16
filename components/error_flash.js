'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var ErrorFlash = _react2['default'].createClass({
  displayName: 'ErrorFlash',

  propTypes: {
    error: _react.PropTypes.oneOfType([_react.PropTypes.array, _react.PropTypes.string])
  },

  render: function render() {
    var error = this.props.error;

    var errorDisplay = 'show';
    if (!error || error && Array.isArray(error) && error.length === 0) {
      errorDisplay = 'hide';
    }

    var errors = undefined;
    if (error === 'hide') {
      errors = null;
    } else if (Array.isArray(error)) {
      errors = error.map(function (err, i) {
        return _react2['default'].createElement(
          'div',
          { key: i, className: 'error' },
          err
        );
      });
    } else {
      errors = _react2['default'].createElement(
        'div',
        { className: 'error' },
        error
      );
    }

    return _react2['default'].createElement(
      'div',
      { className: 'flash-error ' + errorDisplay },
      _react2['default'].createElement(
        'p',
        { className: 'errors' },
        errors
      ),
      _react2['default'].createElement(
        'a',
        { href: 'mailto:supportthis.gem.co' },
        'Having trouble? Contact support.'
      )
    );
  }
});

exports['default'] = ErrorFlash;
module.exports = exports['default'];