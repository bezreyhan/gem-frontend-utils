
React = require('react')


ValidationMap = {
  minLength: (inputValue, length) ->
    # removes white space
    inputValue = inputValue.split(" ").join("")
    inputValue.length >= length

  length: (inputValue, length) ->
    # removes white space
    inputValue = inputValue.split(" ").join("")
    inputValue.length == length

  email: (email) ->
    regex = /\S+@\S+\.\S+/
    if email? and regex.exec(email)
      return true
    else
      return false

  phoneNumber: (number) ->
    # can contain [1-9], - ,(), '+', or white space
    regex = /^[0-9|\+|\s|\(\)|-]+$/
    regex.test(number)

  required: (inputValue) ->
    inputValue.length >= 1

  url: (url) ->
    regex = ///https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]
              {2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)
            ///
    regex.test(url)

  checked: (isChecked) ->
    isChecked

  # Automatically return true for the 'optioanl' validation
  optional: ->
    true

  equals: (inputValue, [checkerValue, checkerName]) ->
    inputValue == checkerValue

  custom: (inputValue, [func, errorMessage]) ->
    func()

}



ErrorMap = {
  # name is from @props
  minLength: (name, length) ->
    "'#{name}' must be at least #{length} characters long"

  length: (name, length) ->
    "'#{name}' must have a length of #{length} characters"

  email: ->
    "Please provide a valid email"

  phoneNumber: ->
    "Please provide a valid phone number"

  required: (name) ->
    "'#{name}' is required"

  url: ->
    "Please provide a valid URL. Make sure your url begins with http(s)://"

  checked: (name) ->
    "Check the '#{name}' checkbox before continuing"

  equals: (name, [checkerValue, checkerName]) ->
    "'#{name}' does not match '#{checkerName}'"

  custom: (name, [func, errorMessage]) ->
    errorMessage
}



Input = React.createClass {

  propTypes: {
    validations: React.PropTypes.object,
    # Used in error messages and gets added to the input element
    # as an id prop, which can be utilized by a <label for=...>
    name: React.PropTypes.string,
    # Optional - creates a label that goes above the input
    #            with the provided text
    labelText: React.PropTypes.string,
    className: React.PropTypes.string,
    onChange: React.PropTypes.func,
    onFocus: React.PropTypes.func,
    onBlur: React.PropTypes.func,
    # add the icon to the right of the input
    iconClass: React.PropTypes.string

  }


  render: ->
    inputError = if @state.error then "error" else ''
    {type, placeholder, value, className, onChange, name, onBlur, onFocus, onMouseEnter, onMouseOut} = @props
    icon = if @props.iconClass then <div className='icon' /> else null

    if @props.type == 'checkbox' 
      <span className="validation-input #{className}">
        <label className={inputError}>
          {@state.error}
        </label>
        <label>
          <input
            className={inputError}
            ref="input"
            type={type}
            placeholder={placeholder}
            value={value}
            id={name}
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            onMouseEnter={onMouseEnter}
            onMouseOut={onMouseOut}
          />
          {@props.labelText}
        </label>
      </span>
    else
      <span className="validation-input #{className}">
        { icon }
        <label className={inputError}>
          {@state.error || @props.labelText}
        </label>
        <input
          className={inputError}
          ref="input"
          type={type}
          placeholder={placeholder}
          value={value}
          id={name}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          onMouseEnter={onMouseEnter}
          onMouseOut={onMouseOut}
        />
      </span>



  getInitialState: -> {
    error: ''
  }


  validate: ->
    # error will be set using the ErrorMap.
    # The error is rendered in the label tag above the input
    error = null

    # get the value of the input. First checks if the input is
    # is a checkbox. If so, check if it is checked
    inputNode = React.findDOMNode(@refs['input'])
    inputValue =
      if @props.type == 'checkbox'
        inputNode.checked
      else
        inputNode.value

    {validations} = @props

    # Does not attempt to validate an input if the input has
    # been marked optional AND is empty.
    if validations.optional and inputValue == ''
      @setState {error: ''} if @state.error
      true
    else
      validationTypes = Object.keys(validations)

      validationTypes.every (validationType) =>
        requirement = validations[validationType]

        if ValidationMap[validationType](inputValue, requirement)
          @setState {error: ''} if @state.error
          true
        else
          error = ErrorMap[validationType](@props.name, requirement)
          @setState {error}
          false


  getValue: ->
    React.findDOMNode(@refs['input']).value

  clearInput: ->
    @setState {error: ''}
    React.findDOMNode(@refs['input']).value = ''


}


module.exports = Input
