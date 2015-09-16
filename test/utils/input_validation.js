import React from 'react';
import { expect } from 'chai';
import validateInput from '../../src/js/utils/input_validation';


describe('validator', () => {
  const value = 'hi'
  
  it('should return an error if a validation is not met', () => {
    const name = 'password'
    const validations = {length: value.length, minLength: 8}
    const error = validateInput({validations, value, name});
    expect(error).to.exist
  })

  it('should NOT return an error if all validations are met', () => {
    const name = 'password'
    const validations = {minLength: 1}
    const error = validateInput({validations, value, name});
    expect(error).to.not.exist
  })

  it('should NOT return an error if the input is optional', () => {
    const name = 'password'
    const validations = {minLength: 100, optional: true}
    const error = validateInput({validations, value, name});
    expect(error).to.not.exist
  }) 
});