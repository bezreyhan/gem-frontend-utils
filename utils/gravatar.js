var Gravatar, avatarImgList, md5;

md5 = require('MD5');

avatarImgList = ['blue', 'green', 'purple', 'red', 'orange'].map(function(color) {
  return "https://s3-us-west-2.amazonaws.com/gemhqwebconsole/gem-avatar-" + color + ".png";
});

module.exports = Gravatar = {
  gravatarUrl: function(email, size) {
    var avatarID, defaultAvatar, emailHash;
    if (email) {
      email = email.toLowerCase();
      emailHash = md5(email);
      if (size == null) {
        size = 42;
      }
      avatarID = email.charCodeAt(0) % avatarImgList.length;
      defaultAvatar = avatarImgList[avatarID];
      return "https://www.gravatar.com/avatar/" + emailHash + "?d=" + defaultAvatar + "&s=" + size;
    }
  }
};
