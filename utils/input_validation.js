
/*
 * Checks all of the provided validations and will return an error
 * if any of the validations are not met.
 * If all validations are met undefined is returned.
 *
 * PARAMS
 * 1) validations: Object - key, val pairs of validations that the
 *                          input value must pass.
 * 2) value: String - the inputs value
 * 3) name: String - the name of the input. Name is used in the error
                   - messages (e.g 'NAME must be at least 6 charachters long')  
*/

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

exports['default'] = validateInput;

function validateInput(_ref) {
  var validations = _ref.validations;
  var value = _ref.value;
  var name = _ref.name;

  // Return without an error if the input is optional.
  if (validations.optional) return undefined;

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = Object.keys(validations)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var validationType = _step.value;

      var requirement = validations[validationType];
      if (!validator(validationType, requirement, value)) {
        return getError(validationType, requirement, name);
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator['return']) {
        _iterator['return']();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return undefined;
}

function validator(validationType, requirement, inputValue) {
  switch (validationType) {
    case 'minLength':
      var minLength = requirement;
      // removes white space
      return inputValue.split(' ').join('').length >= minLength;

    case 'length':
      var length = requirement;
      // removes white space
      return inputValue.split(' ').join('').length === length;

    case 'email':
      var emailRegex = /\S+this.\S+\.\S+/;
      if (inputValue !== null && emailRegex.exec(inputValue)) {
        return true;
      }
      return false;

    case 'phoneNumber':
      // can contain [1-9], - ,(), '+', or white space
      var phoneNumberRegex = /^[0-9|\+|\s|\(\)|-]+$/;
      return phoneNumberRegex.test(inputValue);

    case 'required':
      return inputValue.length >= 1;

    case 'url':
      var urlRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9this.:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9this.:%_\+.~#?&//=]*)/;
      return urlRegex.test(inputValue);

    case 'checked':
      var isChecked = inputValue;
      return isChecked;

    case 'optional':
      // Automatically return true for the 'optioanl' validation
      return true;

    case 'equals':
      var _requirement = _slicedToArray(requirement, 1),
          checkerValue = _requirement[0];

      return inputValue === checkerValue;

    case 'custom':
      var _requirement2 = _slicedToArray(requirement, 1),
          func = _requirement2[0];

      return func();

    default:
      throw new Error('Not a defined validation rule. Check defined validations');
  }
}

function getError(validationType, requirement, name) {
  // name is from this.props
  switch (validationType) {
    case 'minLength':
      var minLength = requirement;
      return '\'' + name + '\' must be at least ' + minLength + ' characters long';

    case 'length':
      var length = requirement;
      return '\'' + name + '\' must have a length of ' + length + ' characters';

    case 'email':
      return 'Please provide a valid email';

    case 'phoneNumber':
      return 'Please provide a valid phone number';

    case 'required':
      return '\'' + name + '\' is required';

    case 'url':
      return 'Please provide a valid URL. Make sure your url begins with http(s)://';

    case 'checked':
      return 'Check the \'' + name + '\' checkbox before continuing';

    case 'equals':
      var _requirement3 = _slicedToArray(requirement, 2),
          checkerName = _requirement3[1];

      return '\'' + name + '\' does not match \'' + checkerName + '\'';

    case 'costum':
      var _requirement4 = _slicedToArray(requirement, 2),
          errorMessage = _requirement4[1];

      return errorMessage;

    default:
      throw new Error('Not a defined validation rule. Check defined validations');
  }
}
module.exports = exports['default'];