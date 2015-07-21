let React = require('react'),
    classnames = require('classnames'),
    SlidingPanelBodySend = require('../../components/accounts/sliding_panel_body_send');


let SlidingPanel = React.createClass({
  displayName: 'SlidingPanel',


  render() {
    let {isOpen, panelIndex} = this.state;
    let slidingPanelClasses = classnames('sliding-panel', {'is-visible': isOpen});
    let clickLayerClasses = classnames('click-layer', {'is-visible': isOpen});
    
    let navIcons = ['pencil', 'pencil', 'pencil'].map((iconClass, i) => {
      if (panelIndex === i) {
        return <div className={`nav-icon ${iconClass} selected`} onClick={this.openPanel.bind(null, i)} />;
      } else {
        return <div className={`nav-icon ${iconClass}`} onClick={this.openPanel.bind(null, i)} />;
      }
    });

    let body = [<SlidingPanelBodySend />, <div>Hello</div>, <div>Bye</div>].filter((panel, i) => {
      return panelIndex === i;
    });

    return (
      <span className='sliding-panel-container'>
        <button type='button' className='sliding-panel-button' onClick={this.openPanel.bind(null, 0)}>
          Btn 1
        </button>
        <button type='button' className='sliding-panel-button' onClick={this.openPanel.bind(null, 1)}>
          Btn 2
        </button>
        <button type='button' className='sliding-panel-button' onClick={this.openPanel.bind(null, 2)}>
          Btn 3
        </button>

        <div className={slidingPanelClasses}>
          <nav>
            {navIcons}
          </nav>

          <div className='sliding-panel-body'>
            {body}
          </div>

          <footer>
            <button type='text'>Cancel</button>
            <button type='text'>Send</button>
          </footer>


        </div>

        <div className={clickLayerClasses} onClick={this.closePanel}></div>
      </span>
    );
  },


  getInitialState() {
    return {
      isOpen: false,
      // panelIndex conveys which nav-icon to highlight
      // and therefor which panel to show.
      panelIndex: 0
    };
  },


  openPanel(panelIndex) {
    this.setState({isOpen: true, panelIndex});
  },


  closePanel() {
    this.setState({isOpen: false});
  }

});

module.exports = SlidingPanel;
