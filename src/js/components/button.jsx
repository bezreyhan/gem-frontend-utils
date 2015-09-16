import React, { PropTypes } from 'react';


const ImageMap = {
  edit: 'pencil-sm',
  pencil: 'pencil-sm',
  reset: 'reset-icon'
};


const Button = React.createClass({
  displayName: 'Button',


  propTypes: {
    // Valid colors are: white
    color: PropTypes.string,
    // Valid actions are: edit, reset
    image: PropTypes.string,
    // type defaults to 'button' but could be set to 'submit'
    type: PropTypes.string,
    children: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object
    ]),
    onClick: PropTypes.func,
    className: PropTypes.string
  },


  render() {
    const {color, image, children, onClick, className} = this.props;

    return (
      <button
        className={`button-component ${color} ${className}`}
        type={this.props.type || 'button'}
        onClick={onClick}
      >
        {
          image
            ? <div className={`btn-img ${ImageMap[image] || image}`}></div>
            : null
        }

        {
          children
            ? <div className='text'>{children}</div>
            : null
        }
      </button>
    );
  }
});

export default Button;

