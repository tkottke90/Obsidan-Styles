import {executeDataview, createMockDataView} from './mocks/execute-dataview';
import * as chai from 'chai';
import * as sinon from 'sinon';

const expect = chai.expect;

describe('DataView - Get Notes Missing Frontmatter', () => {
  afterEach(() => {
    sinon.reset();
  });

  it('should display an error if the query was unsuccessful', () => {
    // Arrange
    const fields = [ 'type' ];
    const dataview = createMockDataView()

    dataview.query.resolves({
      successful: false,
      value: {
        headers: [],
        values: []
      }
    });

    // Act
    executeDataview(
      './ts-src/get-notes-missing-frontmatter.ts',
      { 
        input: {
          fields
        }, 
        dv: dataview 
      }
    );

    // Assert
    expect(dataview.table.called).to.be.false;

    const firstCall = dataview.view.firstCall;
    expect(dataview.view.called, 'dv.view was not called').to.be.true;
    expect(firstCall.args[0]).to.eql("Scripts/error");
    expect(firstCall.args[1]).to.eql({ message: 'There was a problem pulling types' });
  });
  
  it('should call getNotesMissingTypes with type and sub-type', () => {
    // Arrange
    const fields = [ 'type' ];
    const dataview = createMockDataView()

    // Act
    executeDataview(
      './ts-src/get-notes-missing-frontmatter.ts',
      { 
        input: {
          fields
        }, 
        dv: dataview 
      }
    )

    // Assert
    expect(dataview.view.calledWith("Scripts/get-notes-missing-frontmatter", { fields: [ 'type', 'sub-type' ] })).to.be.true;
  });
});
