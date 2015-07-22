
md5 = require('MD5')

avatarImgList = [
  'blue', 'green',
  'purple', 'red',
  'orange'].map (color) ->
    "https://s3-us-west-2.amazonaws.com/gemhqwebconsole/gem-avatar-#{color}.png"


module.exports = Gravatar = {

  gravatarUrl: (email, size) ->
    # defaultAvatar chooses a number between 1-5 and uses that
    # number to choose the developer's avatar.
    if email
      email = email.toLowerCase()
      emailHash = md5(email)
      size ?= 42
      avatarID = email.charCodeAt(0) % avatarImgList.length
      defaultAvatar = avatarImgList[avatarID]
      "https://www.gravatar.com/avatar/#{emailHash}?d=#{defaultAvatar}&s=#{size}"

}