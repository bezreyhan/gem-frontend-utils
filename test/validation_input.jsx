import React from 'react';
import ValidationInput from '../src/js/components/validation_input';


function onChange(e) {
  console.log(e.target.value);
}


const ValidationInputTest = <ValidationInput 
  labelText="I'm a little test"
  name='Test'
  validations={{minLength: 5}}
  onChange={onChange}
  placeholder='just for a sec'
/>

export default ValidationInputTest;