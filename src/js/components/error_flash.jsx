
React = require 'react'


ErrorFlash = React.createClass {

  render: ->
    {error} = @props

    errorDisplay =
      if error
        if Array.isArray(error) and error.length == 0
          'hide'
        else
          'show'
      else
        'hide'

    if error == 'show'
      errors = for error in @props.error
        <div>{error}</div>
    else
      errors = []

    
    <div className="flash-error #{errorDisplay}">
      <p>{@props.error}</p>
      
      <a href='mailto:support@gem.co'>Having trouble? Contact support.</a>
    </div>
}


module.exports = ErrorFlash
