'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var SwitchButton = _react2['default'].createClass({
  displayName: 'SwitchButton',

  propTypes: {
    isOn: _react.PropTypes.bool
  },

  render: function render() {
    var isOn = this.state.isOn;

    var status = isOn ? 'active' : '';
    var text = isOn ? _react2['default'].createElement(
      'span',
      { className: 'active-text' },
      'ON'
    ) : _react2['default'].createElement(
      'span',
      { className: 'inactive-text' },
      'OFF'
    );

    return _react2['default'].createElement(
      'label',
      { className: 'switch-button ' + status,
        onClick: this.props.onClick || this.toggleStatus
      },
      _react2['default'].createElement(
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