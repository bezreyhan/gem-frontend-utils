import React, { PropTypes } from 'react';


const SwitchButton = React.createClass({
  displayName: 'SwitchButton',


  propTypes: {
    isOn: PropTypes.bool
  },


  render() {
    const { isOn } = this.state;
    const status = isOn ? 'active' : '';
    const text = isOn
                ? <span className='active-text'>ON</span> 
                : <span className='inactive-text'>OFF</span>

    return (
      <label className={`switch-button ${status}`}
             onClick={this.props.onClick || this.toggleStatus}
      >
        <div className={`checkbox ${status}`}>
          {text}
        </div>
      </label>
    )
  },


  getInitialState() {
    return({
      isOn: this.props.isOn || false
    });
  },


  componentWillReceiveProps(nextProps) {
    this.setState({
      isOn: nextProps.isOn
    })
  },


  toggleStatus() {
    this.setState({isOn: !this.state.isOn});
  }

});

module.exports = SwitchButton;