import * as chai from 'chai';
import * as sinon from 'sinon';
import { createMockDataView, executeDataview } from './mocks/execute-dataview';

const expect = chai.expect;

describe('DataView - Display Error', () => {
  afterEach(() => {
    sinon.reset();
  });

  it('should create a paragraph element with the message property', () => {
    // Arrange
    const errorMessage = 'Unable to Load Message';
    const dataview = createMockDataView()
    dataview.el.returns(undefined);

    // Act
    executeDataview(
      './ts-src/error.ts',
      { 
        input: {
          message: errorMessage
        }, 
        dv: dataview 
      }
    )

    // Assert
    expect(dataview.el.calledWith('p', 'There was a problem: ' + errorMessage))
      .to.be.true;
  });
});