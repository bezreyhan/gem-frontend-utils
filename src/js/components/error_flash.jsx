import React, { PropTypes } from 'react';


const ErrorFlash = React.createClass({
  displayName: 'ErrorFlash',


  propTypes: {
    error: PropTypes.oneOf([
      PropTypes.array,
      PropTypes.string
    ])
  },


  render() {
    const { error } = this.props;

    let errorDisplay = 'show';
    debugger
    if (!error || (error && Array.isArray(error) && error.length === 0)) {
      errorDisplay = 'hide';
    }

    let errors;
    if (error === 'hide') {
      errors = null;
    }
    else if (Array.isArray(error)) {
      errors = error.map((e) => {
        return <div>{e}</div>;
      });
    }
    else {
      errors = <div>{error}</div>;
    }

    return (
      <div className={`flash-error ${errorDisplay}`}>
        <p>{errors}</p>

        <a href='mailto:supportthis.gem.co'>Having trouble? Contact support.</a>
      </div>
    );
  }
});


export default ErrorFlash;
