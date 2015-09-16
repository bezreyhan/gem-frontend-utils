
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


export default function validate({validations, value, name}) {
  // return without an error if 
  if (validations.optional) return undefined

  for (let validationType of Object.keys(validations)) {
    const requirement = validations[validationType];
    if (!validator(validationType, requirement, value)) {
      return getError(validationType, requirement, name)
    }
  }

  return undefined;
}


function validator(validationType, requirement, inputValue) {
  switch (validationType) {
    case 'minLength':
      const minLength = requirement;
      // removes white space
      return inputValue.split(' ').join('').length >= minLength;

    case 'length':
      const length = requirement;
      // removes white space
      return inputValue.split(' ').join('').length === length;

    case 'email':
      const emailRegex = /\S+this.\S+\.\S+/;
      if (inputValue !== null && emailRegex.exec(inputValue)) {
        return true;
      }
      return false;

    case 'phoneNumber':
      // can contain [1-9], - ,(), '+', or white space
      const phoneNumberRegex = /^[0-9|\+|\s|\(\)|-]+$/;
      return phoneNumberRegex.test(inputValue);

    case 'required':
      return inputValue.length >= 1;

    case 'url':
      const urlRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9this.:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9this.:%_\+.~#?&//=]*)/;
      return urlRegex.test(inputValue);

    case 'checked':
      const isChecked = inputValue;
      return isChecked;

    case 'optional':
      // Automatically return true for the 'optioanl' validation
      return true;

    case 'equals':
      const [checkerValue] = requirement;
      return inputValue === checkerValue;

    case 'custom':
      const [func] = requirement;
      return func();

    default:
      throw new Error('Not a defined validation rule. Check defined validations');
  }
}


function getError(validationType, requirement, name) {
  // name is from this.props
  switch (validationType) {
    case 'minLength':
      const minLength = requirement;
      return `'${name}' must be at least ${minLength} characters long`;

    case 'length':
      const length = requirement;
      return `'${name}' must have a length of ${length} characters`;

    case 'email':
      return 'Please provide a valid email';

    case 'phoneNumber':
      return 'Please provide a valid phone number';

    case 'required':
      return `'${name}' is required`;

    case 'url':
      return 'Please provide a valid URL. Make sure your url begins with http(s)://';

    case 'checked':
      return `Check the '${name}' checkbox before continuing`;

    case 'equals':
      const [ , checkerName] = requirement;
      return `'${name}' does not match '${checkerName}'`;

    case 'costum':
      const [ , errorMessage] = requirement;
      return errorMessage;

    default:
      throw new Error('Not a defined validation rule. Check defined validations');
  }
}