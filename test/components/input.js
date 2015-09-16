import setup from './SETUP';
import React from 'react/addons';
const { TestUtils } = React.addons;
import { expect } from 'chai';
import Input from '../../src/js/components/input';


describe('Input', () => {
  const error = 'An input error';
  const value = 'a cool password';
  const labelText = 'The label';
  const className = 'the cool class';
  let RenderedInput;
  
  before(() => {
    RenderedInput = TestUtils.renderIntoDocument(
      <Input
        error={error}
        type='text'
        name='email'
        labelText={labelText}
        value={value}
        className={className}
      />
    );
  });

  it('should add the provided className', () => {
    const elem = RenderedInput.getDOMNode()
    expect(elem.className).to.include(className);
  });
  
  it('should render the error instead of the labelText', () => {
    const labelElem = TestUtils
      .findRenderedDOMComponentWithTag(RenderedInput, 'label')
      .getDOMNode()
    expect(labelElem.innerHTML).to.equal(error);
  })

  it('should render the provided value', () => {
    const inputElem = TestUtils
      .findRenderedDOMComponentWithTag(RenderedInput, 'input')
      .getDOMNode()
    expect(inputElem.value).to.equal(value);
  })
});