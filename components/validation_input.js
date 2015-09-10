var ErrorMap, Input, React, ValidationMap;

React = require('react');

ValidationMap = {
  minLength: function(inputValue, length) {
    inputValue = inputValue.split(" ").join("");
    return inputValue.length >= length;
  },
  length: function(inputValue, length) {
    inputValue = inputValue.split(" ").join("");
    return inputValue.length === length;
  },
  email: function(email) {
    var regex;
    regex = /\S+@\S+\.\S+/;
    if ((email != null) && regex.exec(email)) {
      return true;
    } else {
      return false;
    }
  },
  phoneNumber: function(number) {
    var regex;
    regex = /^[0-9|\+|\s|\(\)|-]+$/;
    return regex.test(number);
  },
  required: function(inputValue) {
    return inputValue.length >= 1;
  },
  url: function(url) {
    var regex;
    regex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)/;
    return regex.test(url);
  },
  checked: function(isChecked) {
    return isChecked;
  },
  optional: function() {
    return true;
  },
  equals: function(inputValue, arg) {
    var checkerName, checkerValue;
    checkerValue = arg[0], checkerName = arg[1];
    return inputValue === checkerValue;
  },
  custom: function(inputValue, arg) {
    var errorMessage, func;
    func = arg[0], errorMessage = arg[1];
    return func();
  }
};

ErrorMap = {
  minLength: function(name, length) {
    return "'" + name + "' must be at least " + length + " characters long";
  },
  length: function(name, length) {
    return "'" + name + "' must have a length of " + length + " characters";
  },
  email: function() {
    return "Please provide a valid email";
  },
  phoneNumber: function() {
    return "Please provide a valid phone number";
  },
  required: function(name) {
    return "'" + name + "' is required";
  },
  url: function() {
    return "Please provide a valid URL. Make sure your url begins with http(s)://";
  },
  checked: function(name) {
    return "Check the '" + name + "' checkbox before continuing";
  },
  equals: function(name, arg) {
    var checkerName, checkerValue;
    checkerValue = arg[0], checkerName = arg[1];
    return "'" + name + "' does not match '" + checkerName + "'";
  },
  custom: function(name, arg) {
    var errorMessage, func;
    func = arg[0], errorMessage = arg[1];
    return errorMessage;
  }
};

Input = React.createClass({
  propTypes: {
    validations: React.PropTypes.object,
    name: React.PropTypes.string,
    labelText: React.PropTypes.string,
    className: React.PropTypes.string,
    onChange: React.PropTypes.func,
    onFocus: React.PropTypes.func,
    onBlur: React.PropTypes.func,
    iconClass: React.PropTypes.string
  },
  render: function() {
    var className, inputError, name, onBlur, onChange, onFocus, onMouseEnter, onMouseOut, placeholder, ref, type, value;
    inputError = this.state.error ? "error" : '';
    ref = this.props, type = ref.type, placeholder = ref.placeholder, value = ref.value, className = ref.className, onChange = ref.onChange, name = ref.name, onBlur = ref.onBlur, onFocus = ref.onFocus, onMouseEnter = ref.onMouseEnter, onMouseOut = ref.onMouseOut;
    return React.createElement("span", {
      "className": "validation-input " + className
    }, (this.props.type === 'checkbox' ? (React.createElement("label", {
      "className": inputError
    }, this.state.error), React.createElement("label", null, React.createElement("input", {
      "className": inputError,
      "ref": "input",
      "type": type,
      "placeholder": placeholder,
      "value": value,
      "id": name,
      "onChange": onChange,
      "onFocus": onFocus,
      "onBlur": onBlur,
      "onMouseEnter": onMouseEnter,
      "onMouseOut": onMouseOut
    }), this.props.labelText)) : (React.createElement("label", {
      "className": inputError
    }, this.state.error || this.props.labelText), React.createElement("input", {
      "className": inputError,
      "ref": "input",
      "type": type,
      "placeholder": placeholder,
      "value": value,
      "id": name,
      "onChange": onChange,
      "onFocus": onFocus,
      "onBlur": onBlur,
      "onMouseEnter": onMouseEnter,
      "onMouseOut": onMouseOut
    }))));
  },
  getInitialState: function() {
    return {
      error: ''
    };
  },
  validate: function() {
    var error, inputNode, inputValue, validationTypes, validations;
    error = null;
    inputNode = React.findDOMNode(this.refs['input']);
    inputValue = this.props.type === 'checkbox' ? inputNode.checked : inputNode.value;
    validations = this.props.validations;
    if (validations.optional && inputValue === '') {
      if (this.state.error) {
        this.setState({
          error: ''
        });
      }
      return true;
    } else {
      validationTypes = Object.keys(validations);
      return validationTypes.every((function(_this) {
        return function(validationType) {
          var requirement;
          requirement = validations[validationType];
          if (ValidationMap[validationType](inputValue, requirement)) {
            if (_this.state.error) {
              _this.setState({
                error: ''
              });
            }
            return true;
          } else {
            error = ErrorMap[validationType](_this.props.name, requirement);
            _this.setState({
              error: error
            });
            return false;
          }
        };
      })(this));
    }
  },
  getValue: function() {
    return React.findDOMNode(this.refs['input']).value;
  },
  clearInput: function() {
    this.setState({
      error: ''
    });
    return React.findDOMNode(this.refs['input']).value = '';
  }
});

module.exports = Input;
