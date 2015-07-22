let React = require('react'),
    DeveloperStore = require('../../stores/developer'),
    client = require('../../client'),
    ErrorFlash = require('./error_flash'),
    debounce = require('lodash.debounce'),
    ValidationInput = require('./validation_input'),
    AuthMixin = require('../../mixins/auth'),
    {parseErrors} = require('../../utils/errors'),
    ClientLoadedMixin = require('../../mixins/ClientLoaded'),
    Button = require('../../shared/components/button'),
    ModalStore = require('../../stores/modal'),
    ModalActions = require('../../actions/modal');


let MFAModal = React.createClass({
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


  render() {
    let {modalFace, modalClass, header, children} = this.props;
    let modalDisplay = this.state.isOpen ? 'show' : 'hide';
    let developerStatus = this.state.isConfirmed ? 'confirmed' : 'unconfirmed';
    let spinnerClass = this.state.isSpinning ? '' : 'hide-animation';

    return (
      <div className={`modal mfa-modal ${modalClass}`}>

        <div onClick={this.openModal}>
          {modalFace}
        </div>

        <div className={'modal-window ' + modalDisplay} >
          <div className="modal-inner">
            <div className="modal-inner-header">
              <h5 className="modal-title">{header}</h5>
              <div className="modal-close" onClick={this.closeModal}/>
            </div>
            <div className="modal-inner-content">
              <div className={`loading-spinner ${spinnerClass}`} />
              <ErrorFlash error={this.state.error} />
              <form onSubmit={this.action}>
                {
                  children ? {children} : null
                }
                {
                  (this.state.isConfirmed
                    ? (
                      <div className='twofa-message'>
                        Enter your two-factor code to complete this change
                        <div data-tip='A text message with a confirmation code
                                       has been sent to your phone.'
                             className='tooltip-icon'
                        />
                      </div>
                    )
                    : null
                  )
                }
                <Button color='white' className='cancel-btn' onClick={this.closeModal}>
                  Cancel
                </Button>
                <div className={`action-group ${developerStatus}`} >
                  {
                    (this.state.isConfirmed
                      ? (
                          <ValidationInput type="text" ref="mfa_token"
                                          placeholder="Enter code"
                                          name="MFA Token"
                                          validations={{length: 8}}
                                          className="mfa-input-container"
                        />
                      )
                      : null
                    )
                  }
                  <input className='action-btn' type='submit' value="Save" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  },


  getInitialState() {
    let {modalName} = this.props;
    return {
      isOpen: ModalStore.isOpen(modalName),
      isConfirmed: false,
      error: ModalStore.getError(modalName),
      isSpinning: ModalStore.isSpinning(modalName)
    };
  },


  clientDidLoad() {
    if (DeveloperStore.isConfirmed()) {
      this.setState({isConfirmed: true});
    }
  },


  componentDidMount() {
    ModalStore.addChangeListener(this._onModalChange);
  },


  componentWillUnmount() {
    ModalStore.removeChangeListener(this._onModalChange);
  },


  _onModalChange() {
    let {modalName, clearChildInputs} = this.props;

    if (!ModalStore.isOpen(modalName)) {
      if (clearChildInputs) {
        clearChildInputs();
      }
      if (this.refs['mfa_token']) {
        this.refs['mfa_token'].clearInput();
      }
      if (this.state.showMFA) {
        this.setState({showMFA: false});
      }
    }

    this.setState({
      isOpen: ModalStore.isOpen(modalName),
      error: ModalStore.getError(modalName),
      isSpinning: ModalStore.isSpinning(modalName)
    });
  },


  openModal() {
    let shouldOpen = this.props.openModalHook ? this.props.openModalHook() : true;
    if (shouldOpen === true) {
      ModalActions.openModal(this.props.modalName);
      if (DeveloperStore.isConfirmed()) {
        this.sendMFA();
      }
    }
  },


  closeModal() {
    ModalActions.closeModal();
  },


  sendMFA() {
    DeveloperStore.get().send_mfa({}, (error) => {
      // callback is not called unless there is an error
      this.setState({error: parseErrors(error)});
    });
  },


  action: debounce(function action(event) {
    event.preventDefault();

    if (this.props.validateChildInputs) {
      if (this.props.validateChildInputs() === false) {
        return;
      }
    }

    let mfa_token;
    if (DeveloperStore.isConfirmed()) {
      if (this.validateInputs(['mfa_token']) === false) {
        return;
      }
      mfa_token = this.getInputValue('mfa_token');
    } else {
      mfa_token = '';
    }

    let key = window.sessionStorage.getItem('developer_key');
    let session_token = window.sessionStorage.getItem('session_token');

    client.patchboard.context
      .authorize('Gem-Developer-Session', {mfa_token, key, session_token});

    // pass mfa_token to the action in case it needs to
    // uthenticate with a different auth scheme
    this.props.action(mfa_token);
  }, 3000, {leading: true, trailing: false})
});

module.exports = MFAModal;
