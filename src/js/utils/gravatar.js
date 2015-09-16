import md5 from 'MD5';

const avatarImgList = [
  'blue', 'green',
  'purple', 'red',
  'orange'
  ].map((color)) => {
    return `https://s3-us-west-2.amazonaws.com/gemhqwebconsole/gem-avatar-${color}.png`;
  }


const Gravatar = {

  gravatarUrl(email, size) {
    // defaultAvatar chooses a number between 1-5 and uses that
    // number to choose the developer's avatar.
    if (email) {
      emailHash = md5(email.toLowerCase());
      size = size || 42;
      const avatarID = email.charCodeAt(0) % avatarImgList.length;
      const defaultAvatar = avatarImgList[avatarID];
      return `https://www.gravatar.com/avatar/${emailHash}?d=${defaultAvatar}&s=${size}`;
    }
  }
}

export default Gravatar;