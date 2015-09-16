import React, { PropTypes } from 'react';


const ErrorFlash = React.createClass({
  displayName: 'ErrorFlash',


  propTypes: {
    error: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.string
    ])
  },


  render() {
    const { error } = this.props;

    let errorDisplay = 'show';
    if (!error || (error && Array.isArray(error) && error.length === 0)) {
      errorDisplay = 'hide';
    }

    let errors;
    if (error === 'hide') {
      errors = null;
    }
    else if (Array.isArray(error)) {
      errors = error.map((err, i) => {
        return <div key={i} className='error'>{err}</div>;
      });
    }
    else {
      errors = <div className='error'>{error}</div>;
    }

    return (
      <div className={`flash-error ${errorDisplay}`}>
        <p className='errors'>{errors}</p>

        <a href='mailto:supportthis.gem.co'>Having trouble? Contact support.</a>
      </div>
    );
  }
});


export default ErrorFlash;