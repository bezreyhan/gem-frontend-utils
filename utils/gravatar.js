'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _MD5 = require('MD5');

var _MD52 = _interopRequireDefault(_MD5);

var avatarImgList = ['blue', 'green', 'purple', 'red', 'orange'].map(function (color) {
  return 'https://s3-us-west-2.amazonaws.com/gemhqwebconsole/gem-avatar-' + color + '.png';
});

var Gravatar = {

  gravatarUrl: function gravatarUrl(email) {
    var size = arguments.length <= 1 || arguments[1] === undefined ? 42 : arguments[1];

    // defaultAvatar chooses a number between 1-5 and uses that
    // number to choose the developer's avatar.
    if (email) {
      emailHash = (0, _MD52['default'])(email.toLowerCase());
      var avatarID = email.charCodeAt(0) % avatarImgList.length;
      var defaultAvatar = avatarImgList[avatarID];
      return 'https://www.gravatar.com/avatar/' + emailHash + '?d=' + defaultAvatar + '&s=' + size;
    }
  }
};

exports['default'] = Gravatar;
module.exports = exports['default'];