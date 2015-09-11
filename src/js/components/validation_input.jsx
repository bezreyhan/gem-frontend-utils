import React, { PropTypes } from 'react';

function validator(validationType, inputValue, requirement) {
  switch (validationType) {
    case 'minLength':
      const minLength = requirement;
      // removes white space
      return inputValue.split(' ').join('').length >= minLength;

    case 'length':
      const length = requirement;
      // removes white space
      return inputValue.split(' ').join('').length === length;

    case 'email':
      const emailRegex = /\S+this.\S+\.\S+/;
      if (inputValue !== null && emailRegex.exec(inputValue)) {
        return true;
      }
      return false;

    case 'phoneNumber':
      // can contain [1-9], - ,(), '+', or white space
      const phoneNumberRegex = /^[0-9|\+|\s|\(\)|-]+$/;
      return phoneNumberRegex.test(inputValue);

    case 'required':
      return inputValue.length >= 1;

    case 'url':
      const urlRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9this.:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9this.:%_\+.~#?&//=]*)/;
      return urlRegex.test(inputValue);

    case 'checked':
      const isChecked = inputValue;
      return isChecked;

    case 'optional':
      // Automatically return true for the 'optioanl' validation
      return true;

    case 'equals':
      const [checkerValue] = requirement;
      return inputValue === checkerValue;

    case 'custom':
      const [func] = requirement;
      return func();

    default:
      throw new Error('Not a defined validation rule. Check defined validations');
  }
}


function getError(validationType, name, requirement) {
  // name is from this.props
  switch (validationType) {
    case 'minLength':
      const minLength = requirement;
      return `'${name}' must be at least ${minLength} characters long`;

    case 'length':
      const length = requirement;
      return `'${name}' must have a length of ${length} characters`;

    case 'email':
      return 'Please provide a valid email';

    case 'phoneNumber':
      return 'Please provide a valid phone number';

    case 'required':
      return `'${name}' is required`;

    case 'url':
      return 'Please provide a valid URL. Make sure your url begins with http(s)://';

    case 'checked':
      return `Check the '${name}' checkbox before continuing`;

    case 'equals':
      const [ , checkerName] = requirement;
      return `'${name}' does not match '${checkerName}'`;

    case 'costum':
      const [ , errorMessage] = requirement;
      return errorMessage;

    default:
      throw new Error('Not a defined validation rule. Check defined validations');
  }
}


const ValidationInput = React.createClass({
  displayName: 'ValidationInput',

  propTypes: {
    validations: PropTypes.object,
    // Used in error messages and gets added to the input element
    // as an id prop, which can be utilized by a <label for=...>
    name: PropTypes.string,
    // Optional - creates a label that goes above the input
    //             with the provided text
    labelText: PropTypes.string,
    className: PropTypes.string,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func
  },


  render() {
    const inputError = this.state.error ? 'error' : '';
    const {className, name, ...rest} = this.props;

    if (this.props.type === 'checkbox' ) {
      return (
        <span className='validation-input #{className}'>
          <label className={inputError}>
            {this.state.error}
          </label>
          <label>
            <input
              className={inputError}
              ref='input'
              id={name}
              {...rest}
            />
            {this.props.labelText}
          </label>
        </span>
      );
    }
    return (
      <span className='validation-input #{className}'>
        <label className={inputError}>
          {this.state.error || this.props.labelText}
        </label>
        <input
          className={inputError}
          ref='input'
          id={name}
          {...rest}
        />
      </span>
    );
  },


  getInitialState() {
    return {
      error: ''
    };
  },


  validate() {
    // error will be set using the ErrorMap.
    // The error is rendered in the label tag above the input
    let error = null;

    // get the value of the input. First checks if the input is
    // is a checkbox. If so, check if it is checked
    const inputNode = React.findDOMNode(this.refs.input);
    const inputValue = this.props.type === 'checkbox' ? inputNode.checked : inputNode.value;

    const {validations} = this.props;

    // Does not attempt to validate an input if the input has
    // been marked optional AND is empty.
    if (validations.optional && inputValue === '') {
      if (this.state.error) this.setState({error: ''});
      return true;
    }
    const validationTypes = Object.keys(validations);

    return validationTypes.every((validationType) => {
      const requirement = validations[validationType];

      if (validator(validationType, inputValue, requirement)) {
        if (this.state.error) {
          this.setState({error: ''});
        }
        return true;
      }
      error = getError(validationType, this.props.name, requirement);
      this.setState({error});
      return false;
    });
  },


  getValue() {
    return React.findDOMNode(this.refs.input).value;
  },


  clearInput() {
    this.setState({error: ''});
    React.findDOMNode(this.refs.input).value = '';
  }
});


export default ValidationInput;
