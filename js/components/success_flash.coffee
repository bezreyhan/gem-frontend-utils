
React = require 'react'

SuccessFlash = React.createClass {

  render: ->
    successDisplay = if @props.status then 'show' else 'hide'
    
    <div className="success-flash #{successDisplay}">
      {@props.status}
    </div>
}


module.exports = SuccessFlash