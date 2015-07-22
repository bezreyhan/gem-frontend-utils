var Button, ImageMap, React;

React = require('react');

ImageMap = {
  edit: 'pencil-sm',
  pencil: 'pencil-sm',
  reset: 'reset-icon'
};

module.exports = Button = React.createClass({
  propTypes: {
    color: React.PropTypes.string,
    image: React.PropTypes.string,
    type: React.PropTypes.string
  },
  render: function() {
    var children, className, color, image, onClick, ref;
    ref = this.props, color = ref.color, image = ref.image, children = ref.children, onClick = ref.onClick, className = ref.className;
    return React.createElement("button", {
      "className": "button-component " + color + " " + className,
      "type": this.props.type || 'button',
      "onClick": onClick
    }, (image ? React.createElement("div", {
      "className": "btn-img " + (ImageMap[image] || image)
    }) : void 0), (children ? React.createElement("div", {
      "className": 'text'
    }, children) : void 0));
  }
});
