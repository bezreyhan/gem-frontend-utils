'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function validator(validationType, inputValue, requirement) {
  switch (validationType) {
    case 'minLength':
      var minLength = requirement;
      // removes white space
      return inputValue.split(' ').join('').length >= minLength;

    case 'length':
      var length = requirement;
      // removes white space
      return inputValue.split(' ').join('').length === length;

    case 'email':
      var emailRegex = /\S+this.\S+\.\S+/;
      if (inputValue !== null && emailRegex.exec(inputValue)) {
        return true;
      }
      return false;

    case 'phoneNumber':
      // can contain [1-9], - ,(), '+', or white space
      var phoneNumberRegex = /^[0-9|\+|\s|\(\)|-]+$/;
      return phoneNumberRegex.test(inputValue);

    case 'required':
      return inputValue.length >= 1;

    case 'url':
      var urlRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9this.:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9this.:%_\+.~#?&//=]*)/;
      return urlRegex.test(inputValue);

    case 'checked':
      var isChecked = inputValue;
      return isChecked;

    case 'optional':
      // Automatically return true for the 'optioanl' validation
      return true;

    case 'equals':
      var _requirement = _slicedToArray(requirement, 1),
          checkerValue = _requirement[0];

      return inputValue === checkerValue;

    case 'custom':
      var _requirement2 = _slicedToArray(requirement, 1),
          func = _requirement2[0];

      return func();

    default:
      throw new Error('Not a defined validation rule. Check defined validations');
  }
}

function getError(validationType, name, requirement) {
  // name is from this.props
  switch (validationType) {
    case 'minLength':
      var minLength = requirement;
      return '\'' + name + '\' must be at least ' + minLength + ' characters long';

    case 'length':
      var length = requirement;
      return '\'' + name + '\' must have a length of ' + length + ' characters';

    case 'email':
      return 'Please provide a valid email';

    case 'phoneNumber':
      return 'Please provide a valid phone number';

    case 'required':
      return '\'' + name + '\' is required';

    case 'url':
      return 'Please provide a valid URL. Make sure your url begins with http(s)://';

    case 'checked':
      return 'Check the \'' + name + '\' checkbox before continuing';

    case 'equals':
      var _requirement3 = _slicedToArray(requirement, 2),
          checkerName = _requirement3[1];

      return '\'' + name + '\' does not match \'' + checkerName + '\'';

    case 'costum':
      var _requirement4 = _slicedToArray(requirement, 2),
          errorMessage = _requirement4[1];

      return errorMessage;

    default:
      throw new Error('Not a defined validation rule. Check defined validations');
  }
}

var ValidationInput = _react2['default'].createClass({
  displayName: 'ValidationInput',

  propTypes: {
    validations: _react.PropTypes.object,
    // Used in error messages and gets added to the input element
    // as an id prop, which can be utilized by a <label for=...>
    name: _react.PropTypes.string,
    // Optional - creates a label that goes above the input
    //             with the provided text
    labelText: _react.PropTypes.string,
    className: _react.PropTypes.string,
    onChange: _react.PropTypes.func,
    onFocus: _react.PropTypes.func,
    onBlur: _react.PropTypes.func
  },

  render: function render() {
    var inputError = this.state.error ? 'error' : '';
    var _props = this.props;
    var type = _props.type;
    var placeholder = _props.placeholder;
    var value = _props.value;
    var className = _props.className;
    var onChange = _props.onChange;
    var name = _props.name;
    var onBlur = _props.onBlur;
    var onFocus = _props.onFocus;
    var onMouseEnter = _props.onMouseEnter;
    var onMouseOut = _props.onMouseOut;

    if (this.props.type === 'checkbox') {
      return _react2['default'].createElement(
        'span',
        { className: 'validation-input #{className}' },
        _react2['default'].createElement(
          'label',
          { className: inputError },
          this.state.error
        ),
        _react2['default'].createElement(
          'label',
          null,
          _react2['default'].createElement('input', {
            className: inputError,
            ref: 'input',
            type: type,
            placeholder: placeholder,
            value: value,
            id: name,
            onChange: onChange,
            onFocus: onFocus,
            onBlur: onBlur,
            onMouseEnter: onMouseEnter,
            onMouseOut: onMouseOut
          }),
          this.props.labelText
        )
      );
    }
    return _react2['default'].createElement(
      'span',
      { className: 'validation-input #{className}' },
      _react2['default'].createElement(
        'label',
        { className: inputError },
        this.state.error || this.props.labelText
      ),
      _react2['default'].createElement('input', {
        className: inputError,
        ref: 'input',
        type: type,
        placeholder: placeholder,
        value: value,
        id: name,
        onChange: onChange,
        onFocus: onFocus,
        onBlur: onBlur,
        onMouseEnter: onMouseEnter,
        onMouseOut: onMouseOut
      })
    );
  },

  getInitialState: function getInitialState() {
    return {
      error: ''
    };
  },

  validate: function validate() {
    var _this = this;

    // error will be set using the ErrorMap.
    // The error is rendered in the label tag above the input
    var error = null;

    // get the value of the input. First checks if the input is
    // is a checkbox. If so, check if it is checked
    var inputNode = _react2['default'].findDOMNode(this.refs.input);
    var inputValue = this.props.type === 'checkbox' ? inputNode.checked : inputNode.value;

    var validations = this.props.validations;

    // Does not attempt to validate an input if the input has
    // been marked optional AND is empty.
    if (validations.optional && inputValue === '') {
      if (this.state.error) this.setState({ error: '' });
      return true;
    }
    var validationTypes = Object.keys(validations);

    return validationTypes.every(function (validationType) {
      var requirement = validations[validationType];

      if (validator(validationType, inputValue, requirement)) {
        if (_this.state.error) {
          _this.setState({ error: '' });
        }
        return true;
      }
      error = getError(validationType, _this.props.name, requirement);
      _this.setState({ error: error });
      return false;
    });
  },

  getValue: function getValue() {
    return _react2['default'].findDOMNode(this.refs.input).value;
  },

  clearInput: function clearInput() {
    this.setState({ error: '' });
    _react2['default'].findDOMNode(this.refs.input).value = '';
  }
});

exports['default'] = ValidationInput;
module.exports = exports['default'];