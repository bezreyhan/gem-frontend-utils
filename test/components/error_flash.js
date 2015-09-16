import setup from './SETUP';
import React from 'react/addons';
const { TestUtils } = React.addons;
import { expect } from 'chai';
import ErrorFlash from '../../src/js/components/error_flash';
import $ from 'jquery';


describe('ErrorFlash', () => {

  describe('with one error', () => {
    const error = 'Just one error';
    let RenderedErrorFlash, ErrorFlashNode;
    before(() => {
      RenderedErrorFlash = TestUtils.renderIntoDocument(
        <ErrorFlash error={error} />
      );
      ErrorFlashNode = RenderedErrorFlash.getDOMNode();
    });

    it('should be visable when an error(s) is present', () => {
      expect(ErrorFlashNode.className).to.contain('show');
    });

    it('should render the provided error message', () => {
      const ErrorNode = TestUtils
        .findRenderedDOMComponentWithClass(RenderedErrorFlash, 'error')
        .getDOMNode()
      expect(ErrorNode.innerHTML).to.equal(error);
    });
  })


  describe('with multiple errors', () => {
    const errors = ['one error', 'two error', 'red error'];
    let RenderedErrorFlash, ErrorFlashNode;
    before(() => {
      RenderedErrorFlash = TestUtils.renderIntoDocument(
        <ErrorFlash error={errors} />
      );
      ErrorFlashNode = RenderedErrorFlash.getDOMNode();
    });

    it('should render the provided error message', () => {
      const ErrorComponents = TestUtils
        .scryRenderedDOMComponentsWithClass(RenderedErrorFlash, 'error')
      ErrorComponents.forEach((ErrorComponent, i) => {
        const errorMsg = ErrorComponent.getDOMNode().innerHTML;
        expect(errorMsg).to.equal(errors[i]);
      })
    });
  })


  describe('without errors', () => {
    let RenderedErrorFlash, ErrorFlashNode;
    before(() => {
      RenderedErrorFlash = TestUtils.renderIntoDocument(
        <ErrorFlash error={undefined} />
      );
      ErrorFlashNode = RenderedErrorFlash.getDOMNode();
    });

    it('should NOT be visable if no errors are present', () => {
      expect(ErrorFlashNode.className).to.contain('hide');
    });    
  })
});