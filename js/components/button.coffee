React = require('react')


ImageMap = {
  edit: 'pencil-sm',
  pencil: 'pencil-sm',
  reset: 'reset-icon'
}

module.exports = Button = React.createClass {

  propTypes: {
    # Valid colors are: white
    color: React.PropTypes.string,
    # Valid actions are: edit, reset
    image: React.PropTypes.string,
    # type defaults to 'button' but could be set to 'submit'
    type: React.PropTypes.string
  }

  render: ->
    {color, image, children, onClick, className} = @props

    <button
      className="button-component #{color} #{className}"
      type={@props.type || 'button'}
      onClick={onClick}
    >
      {
        if image
          <div className={"btn-img #{ImageMap[image] or image}"}></div>
      }

      {
        if children
          <div className='text'>{children}</div>
      }
    </button>


}