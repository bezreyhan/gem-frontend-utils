import React, { PropTypes } from 'react';


const SuccessFlash = React.createClass({
  displayName: 'SuccessFlash',


  props: {
    status: PropTypes.string
  },


  render() {
    const successDisplay = this.props.status ? 'show' : 'hide';
    
    return (
      <div className={`success-flash ${successDisplay}`}>
        {this.props.status}
      </div>
    );
  }
});


export default SuccessFlash;