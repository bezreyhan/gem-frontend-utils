
React = require('react')

HiddenSecretBox = React.createClass {
  
  render: ->
    <div className="hidden-secret-box">
      <div className="circle"></div>
      <div className="circle"></div>
      <div className="circle"></div>
    </div>

}

module.exports = HiddenSecretBox