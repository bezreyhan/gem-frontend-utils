import React, { PropTypes } from 'react';


const Input = React.createClass({
  displayName: 'Input',

  propTypes: {
    // Used in error messages and gets added to the input element
    // as an id prop, which can be utilized by a <label for=...>
    name: PropTypes.string,
    // Optional - creates a label that goes above the input
    //             with the provided text
    labelText: PropTypes.string,
    className: PropTypes.string,
    // i.e. text, checkbox
    type: PropTypes.string,
    value: PropTypes.string,
    error: PropTypes.string,
    onChange: PropTypes.func
  },


  render() {
    const {className, error, labelText, name, ...rest} = this.props;
    const inputError = error ? 'error' : '';

    if (this.props.type === 'checkbox' ) {
      return (
        <span className={`validation-input ${className}`}>
          <label className={inputError}>
            {error}
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
      <span className={`validation-input ${className}`}>
        <label className={inputError}>
          {error || labelText}
        </label>
        <input
          className={inputError}
          ref='input'
          id={name}
          {...rest}
        />
      </span>
    );
  }
});


export default Input;
