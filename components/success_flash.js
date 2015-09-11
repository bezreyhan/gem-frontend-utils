'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var SuccessFlash = _react2['default'].createClass({
  displayName: 'SuccessFlash',

  props: {
    status: _react.PropTypes.string
  },

  render: function render() {
    var successDisplay = this.props.status ? 'show' : 'hide';

    return _react2['default'].createElement(
      'div',
      { className: 'success-flash ' + successDisplay },
      this.props.status
    );
  }
});

exports['default'] = SuccessFlash;
module.exports = exports['default'];