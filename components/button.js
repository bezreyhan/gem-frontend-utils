'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var ImageMap = {
  edit: 'pencil-sm',
  pencil: 'pencil-sm',
  reset: 'reset-icon'
};

var Button = _react2['default'].createClass({
  displayName: 'Button',

  propTypes: {
    // Valid colors are: white
    color: _react.PropTypes.string,
    // Valid actions are: edit, reset
    image: _react.PropTypes.string,
    // type defaults to 'button' but could be set to 'submit'
    type: _react.PropTypes.string,
    children: _react.PropTypes.oneOfType([_react.PropTypes.array, _react.PropTypes.object]),
    onClick: _react.PropTypes.func,
    className: _react.PropTypes.string
  },

  render: function render() {
    var _props = this.props;
    var color = _props.color;
    var image = _props.image;
    var children = _props.children;
    var onClick = _props.onClick;
    var className = _props.className;

    return _react2['default'].createElement(
      'button',
      {
        className: 'button-component ' + color + ' ' + className,
        type: this.props.type || 'button',
        onClick: onClick
      },
      image ? _react2['default'].createElement('div', { className: 'btn-img ' + (ImageMap[image] || image) }) : null,
      children ? _react2['default'].createElement(
        'div',
        { className: 'text' },
        children
      ) : null
    );
  }
});

exports['default'] = Button;
module.exports = exports['default'];