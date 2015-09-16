// import setup from './SETUP';
import React from 'react/addons';
const { TestUtils } = React.addons;
import { expect } from 'chai';
import validate from '../../src/js/utils/validation';


describe('validator', () => {
  const value = 'hi'
  
  it('should return an error if a validation is not met', () => {
    const name = 'password'
    const validations = {length: value.length, minLength: 8}
    const error = validate({validations, value, name});
    expect(error).to.exist
  })

  it('should NOT return an error if all validations are met', () => {
    const name = 'password'
    const validations = {minLength: 1}
    const error = validate({validations, value, name});
    expect(error).to.not.exist
  })

  it('should NOT return an error if the input is optional', () => {
    const name = 'password'
    const validations = {minLength: 100, optional: true}
    const error = validate({validations, value, name});
    expect(error).to.not.exist
  }) 
});