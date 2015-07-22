'use strict';

var React = require('react'),
    classnames = require('classnames'),
    SlidingPanelBodySend = require('../../components/accounts/sliding_panel_body_send');

var SlidingPanel = React.createClass({
  displayName: 'SlidingPanel',

  render: function render() {
    var _this = this;

    var _state = this.state;
    var isOpen = _state.isOpen;
    var panelIndex = _state.panelIndex;

    var slidingPanelClasses = classnames('sliding-panel', { 'is-visible': isOpen });
    var clickLayerClasses = classnames('click-layer', { 'is-visible': isOpen });

    var navIcons = ['pencil', 'pencil', 'pencil'].map(function (iconClass, i) {
      if (panelIndex === i) {
        return React.createElement('div', { className: 'nav-icon ' + iconClass + ' selected', onClick: _this.openPanel.bind(null, i) });
      } else {
        return React.createElement('div', { className: 'nav-icon ' + iconClass, onClick: _this.openPanel.bind(null, i) });
      }
    });

    var body = [React.createElement(SlidingPanelBodySend, null), React.createElement(
      'div',
      null,
      'Hello'
    ), React.createElement(
      'div',
      null,
      'Bye'
    )].filter(function (panel, i) {
      return panelIndex === i;
    });

    return React.createElement(
      'span',
      { className: 'sliding-panel-container' },
      React.createElement(
        'button',
        { type: 'button', className: 'sliding-panel-button', onClick: this.openPanel.bind(null, 0) },
        'Btn 1'
      ),
      React.createElement(
        'button',
        { type: 'button', className: 'sliding-panel-button', onClick: this.openPanel.bind(null, 1) },
        'Btn 2'
      ),
      React.createElement(
        'button',
        { type: 'button', className: 'sliding-panel-button', onClick: this.openPanel.bind(null, 2) },
        'Btn 3'
      ),
      React.createElement(
        'div',
        { className: slidingPanelClasses },
        React.createElement(
          'nav',
          null,
          navIcons
        ),
        React.createElement(
          'div',
          { className: 'sliding-panel-body' },
          body
        ),
        React.createElement(
          'footer',
          null,
          React.createElement(
            'button',
            { type: 'text' },
            'Cancel'
          ),
          React.createElement(
            'button',
            { type: 'text' },
            'Send'
          )
        )
      ),
      React.createElement('div', { className: clickLayerClasses, onClick: this.closePanel })
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