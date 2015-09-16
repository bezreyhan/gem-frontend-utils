'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var Input = _react2['default'].createClass({
  displayName: 'Input',

  propTypes: {
    // Used in error messages and gets added to the input element
    // as an id prop, which can be utilized by a <label for=...>
    name: _react.PropTypes.string,
    // Optional - creates a label that goes above the input
    //             with the provided text
    labelText: _react.PropTypes.string,
    className: _react.PropTypes.string,
    // i.e. text, checkbox
    type: _react.PropTypes.string,
    value: _react.PropTypes.string,
    error: _react.PropTypes.string,
    onChange: _react.PropTypes.func
  },

  render: function render() {
    var _props = this.props;
    var className = _props.className;
    var error = _props.error;
    var labelText = _props.labelText;
    var name = _props.name;

    var rest = _objectWithoutProperties(_props, ['className', 'error', 'labelText', 'name']);

    var inputError = error ? 'error' : '';

    if (this.props.type === 'checkbox') {
      return _react2['default'].createElement(
        'span',
        { className: 'validation-input ' + className },
        _react2['default'].createElement(
          'label',
          { className: inputError },
          error
        ),
        _react2['default'].createElement(
          'label',
          null,
          _react2['default'].createElement('input', _extends({
            className: inputError,
            ref: 'input',
            id: name
          }, rest)),
          this.props.labelText
        )
      );
    }
    return _react2['default'].createElement(
      'span',
      { className: 'validation-input ' + className },
      _react2['default'].createElement(
        'label',
        { className: inputError },
        error || labelText
      ),
      _react2['default'].createElement('input', _extends({
        className: inputError,
        ref: 'input',
        id: name
      }, rest))
    );
  }
});

exports['default'] = Input;
module.exports = exports['default'];