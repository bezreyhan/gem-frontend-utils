'use strict';

var React = require('react');
var DeveloperStore = require('../../stores/developer');
var client = require('../../client');
var ErrorFlash = require('./error_flash');
var debounce = require('lodash.debounce');
var ValidationInput = require('./validation_input');
var AuthMixin = require('../../mixins/auth');

var _require = require('../../utils/errors');

var parseErrors = _require.parseErrors;
var ClientLoadedMixin = require('../../mixins/ClientLoaded');
var Button = require('../../shared/components/button');
var ModalStore = require('../../stores/modal');
var ModalActions = require('../../actions/modal');

var MFAModal = React.createClass({
  displayName: 'MFAModal',

  propTypes: {
    // Header is the modal title
    header: React.PropTypes.string,
    // actionCB is the action that you want the modal to perform
    // once it has authorized with the users MFA. actionCB gets
    // called in the action method.
    action: React.PropTypes.func,
    // every instance of MFAModal needs a unique name
    modalName: React.PropTypes.string,
    // error allows the parent to pass the modal an error to display
    error: React.PropTypes.string,
    modalClass: React.PropTypes.string,
    // Modal Face is the interafce of the modal - it is what
    // the user will see when they want to click on the modal.
    // If a React element is passed then the element will be rendered
    modalFace: React.PropTypes.object,
    // ValidateChildren will run input validations for all
    // ValidationInput children
    validateChildInputs: React.PropTypes.func,
    // Clears the child-inputs when the modal closes.
    clearChildInputs: React.PropTypes.func,
    // Hook into the openModal call, allowing the parent to prevent
    // the modal from being opened.
    openModalHook: React.PropTypes.func,
    // children are inputs that you want to add to the MFAModal
    children: React.PropTypes.array
  },

  mixins: [AuthMixin, ClientLoadedMixin],

  render: function render() {
    var _props = this.props;
    var modalFace = _props.modalFace;
    var modalClass = _props.modalClass;
    var header = _props.header;
    var children = _props.children;

    var modalDisplay = this.state.isOpen ? 'show' : 'hide';
    var developerStatus = this.state.isConfirmed ? 'confirmed' : 'unconfirmed';
    var spinnerClass = this.state.isSpinning ? '' : 'hide-animation';

    return React.createElement(
      'div',
      { className: 'modal mfa-modal ' + modalClass },
      React.createElement(
        'div',
        { onClick: this.openModal },
        modalFace
      ),
      React.createElement(
        'div',
        { className: 'modal-window ' + modalDisplay },
        React.createElement(
          'div',
          { className: 'modal-inner' },
          React.createElement(
            'div',
            { className: 'modal-inner-header' },
            React.createElement(
              'h5',
              { className: 'modal-title' },
              header
            ),
            React.createElement('div', { className: 'modal-close', onClick: this.closeModal })
          ),
          React.createElement(
            'div',
            { className: 'modal-inner-content' },
            React.createElement('div', { className: 'loading-spinner ' + spinnerClass }),
            React.createElement(ErrorFlash, { error: this.state.error }),
            React.createElement(
              'form',
              { onSubmit: this.action },
              children ? { children: children } : null,
              this.state.isConfirmed ? React.createElement(
                'div',
                { className: 'twofa-message' },
                'Enter your two-factor code to complete this change',
                React.createElement('div', { 'data-tip': 'A text message with a confirmation code has been sent to your phone.',
                  className: 'tooltip-icon'
                })
              ) : null,
              React.createElement(
                Button,
                { color: 'white', className: 'cancel-btn', onClick: this.closeModal },
                'Cancel'
              ),
              React.createElement(
                'div',
                { className: 'action-group ' + developerStatus },
                this.state.isConfirmed ? React.createElement(ValidationInput, { type: 'text', ref: 'mfa_token',
                  placeholder: 'Enter code',
                  name: 'MFA Token',
                  validations: { length: 8 },
                  className: 'mfa-input-container'
                }) : null,
                React.createElement('input', { className: 'action-btn', type: 'submit', value: 'Save' })
              )
            )
          )
        )
      )
    );
  },

  getInitialState: function getInitialState() {
    var modalName = this.props.modalName;

    return {
      isOpen: ModalStore.isOpen(modalName),
      isConfirmed: false,
      error: ModalStore.getError(modalName),
      isSpinning: ModalStore.isSpinning(modalName)
    };
  },

  clientDidLoad: function clientDidLoad() {
    if (DeveloperStore.isConfirmed()) {
      this.setState({ isConfirmed: true });
    }
  },

  componentDidMount: function componentDidMount() {
    ModalStore.addChangeListener(this._onModalChange);
  },

  componentWillUnmount: function componentWillUnmount() {
    ModalStore.removeChangeListener(this._onModalChange);
  },

  _onModalChange: function _onModalChange() {
    var _props2 = this.props;
    var modalName = _props2.modalName;
    var clearChildInputs = _props2.clearChildInputs;

    if (!ModalStore.isOpen(modalName)) {
      if (clearChildInputs) {
        clearChildInputs();
      }
      if (this.refs['mfa_token']) {
        this.refs['mfa_token'].clearInput();
      }
      if (this.state.showMFA) {
        this.setState({ showMFA: false });
      }
    }

    this.setState({
      isOpen: ModalStore.isOpen(modalName),
      error: ModalStore.getError(modalName),
      isSpinning: ModalStore.isSpinning(modalName)
    });
  },

  openModal: function openModal() {
    var shouldOpen = this.props.openModalHook ? this.props.openModalHook() : true;
    if (shouldOpen === true) {
      ModalActions.openModal(this.props.modalName);
      if (DeveloperStore.isConfirmed()) {
        this.sendMFA();
      }
    }
  },

  closeModal: function closeModal() {
    ModalActions.closeModal();
  },

  sendMFA: function sendMFA() {
    var _this = this;

    DeveloperStore.get().send_mfa({}, function (error) {
      // callback is not called unless there is an error
      _this.setState({ error: parseErrors(error) });
    });
  },

  action: debounce(function action(event) {
    event.preventDefault();

    if (this.props.validateChildInputs) {
      if (this.props.validateChildInputs() === false) {
        return;
      }
    }

    var mfa_token = undefined;
    if (DeveloperStore.isConfirmed()) {
      if (this.validateInputs(['mfa_token']) === false) {
        return;
      }
      mfa_token = this.getInputValue('mfa_token');
    } else {
      mfa_token = '';
    }

    var key = window.sessionStorage.getItem('developer_key');
    var session_token = window.sessionStorage.getItem('session_token');

    client.patchboard.context.authorize('Gem-Developer-Session', { mfa_token: mfa_token, key: key, session_token: session_token });

    // pass mfa_token to the action in case it needs to
    // uthenticate with a different auth scheme
    this.props.action(mfa_token);
  }, 3000, { leading: true, trailing: false })
});

module.exports = MFAModal;