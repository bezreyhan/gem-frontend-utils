'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _componentsAccountsSliding_panel_body_send = require('../../components/accounts/sliding_panel_body_send');

var _componentsAccountsSliding_panel_body_send2 = _interopRequireDefault(_componentsAccountsSliding_panel_body_send);

var SlidingPanel = _react2['default'].createClass({
  displayName: 'SlidingPanel',

  render: function render() {
    var _this = this;

    var _state = this.state;
    var isOpen = _state.isOpen;
    var panelIndex = _state.panelIndex;

    var slidingPanelClass = (0, _classnames2['default'])('sliding-panel', { 'is-visible': isOpen });
    var clickLayerClass = (0, _classnames2['default'])('click-layer', { 'is-visible': isOpen });

    var navIcons = ['pencil', 'pencil', 'pencil'].map(function (iconClass, i) {
      if (panelIndex === i) {
        return _react2['default'].createElement('div', { className: 'nav-icon ' + iconClass + ' selected', onClick: _this.openPanel.bind(null, i) });
      } else {
        return _react2['default'].createElement('div', { className: 'nav-icon ' + iconClass, onClick: _this.openPanel.bind(null, i) });
      }
    });

    var body = [_react2['default'].createElement(_componentsAccountsSliding_panel_body_send2['default'], null), _react2['default'].createElement(
      'div',
      null,
      'Hello'
    ), _react2['default'].createElement(
      'div',
      null,
      'Bye'
    )].filter(function (panel, i) {
      return panelIndex === i;
    });

    return _react2['default'].createElement(
      'span',
      { className: 'sliding-panel-container' },
      _react2['default'].createElement(
        'button',
        { type: 'button', className: 'sliding-panel-button', onClick: this.openPanel.bind(null, 0) },
        'Btn 1'
      ),
      _react2['default'].createElement(
        'button',
        { type: 'button', className: 'sliding-panel-button', onClick: this.openPanel.bind(null, 1) },
        'Btn 2'
      ),
      _react2['default'].createElement(
        'button',
        { type: 'button', className: 'sliding-panel-button', onClick: this.openPanel.bind(null, 2) },
        'Btn 3'
      ),
      _react2['default'].createElement(
        'div',
        { className: slidingPanelClass },
        _react2['default'].createElement(
          'nav',
          null,
          navIcons
        ),
        _react2['default'].createElement(
          'div',
          { className: 'sliding-panel-body' },
          body
        ),
        _react2['default'].createElement(
          'footer',
          null,
          _react2['default'].createElement(
            'button',
            { type: 'text' },
            'Cancel'
          ),
          _react2['default'].createElement(
            'button',
            { type: 'text' },
            'Send'
          )
        )
      ),
      _react2['default'].createElement('div', { className: clickLayerClass, onClick: this.closePanel })
    );
  },

  getInitialState: function getInitialState() {
    return {
      isOpen: false,
      // panelIndex conveys which nav-icon to highlight
      // and therefor which panel to show.
      panelIndex: 0
    };
  },

  openPanel: function openPanel(panelIndex) {
    this.setState({ isOpen: true, panelIndex: panelIndex });
  },

  closePanel: function closePanel() {
    this.setState({ isOpen: false });
  }

});

module.exports = SlidingPanel;