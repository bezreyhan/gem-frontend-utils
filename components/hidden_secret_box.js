'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var HiddenSecretBox = _react2['default'].createClass({
  displayName: 'HiddenSecretBox',

  render: function render() {
    return _react2['default'].createElement(
      'div',
      { className: 'hidden-secret-box' },
      _react2['default'].createElement('div', { className: 'circle' }),
      _react2['default'].createElement('div', { className: 'circle' }),
      _react2['default'].createElement('div', { className: 'circle' })
    );
  }
});

exports['default'] = HiddenSecretBox;
module.exports = exports['default'];