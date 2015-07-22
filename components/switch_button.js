'use strict';

var React = require('react');

var SwitchButton = React.createClass({
  displayName: 'SwitchButton',

  propTypes: {
    isOn: React.PropTypes.bool
  },

  render: function render() {
    var isOn = this.state.isOn;

    var status = isOn ? 'active' : '';
    var text = isOn ? React.createElement(
      'span',
      { className: 'active-text' },
      'ON'
    ) : React.createElement(
      'span',
      { className: 'inactive-text' },
      'OFF'
    );

    return React.createElement(
      'label',
      { className: 'switch-button ' + status,
        onClick: this.props.onClick || this.toggleStatus
      },
      React.createElement(
        'div',
        { className: 'checkbox ' + status },
        text
      )
    );
  },

  getInitialState: function getInitialState() {
    return {
      isOn: this.props.isOn || false
    };
  },

  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    this.setState({
      isOn: nextProps.isOn
    });
  },

  toggleStatus: function toggleStatus() {
    this.setState({ isOn: !this.state.isOn });
  }

});

module.exports = SwitchButton;