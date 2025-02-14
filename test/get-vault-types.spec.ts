import {executeDataview, createMockDataView} from './mocks/execute-dataview';
import * as chai from 'chai';
import * as sinon from 'sinon';

const expect = chai.expect;

describe('DataView - Get Vault Types', () => {
  afterEach(() => {
    sinon.reset();
  });

  it('should pass "type" and "sub-type" to the get-notes-missing-type view', () => {
    // Arrange
    const dataview = createMockDataView()

    // Act
    executeDataview(
      './ts-src/get-vault-types.ts',
      { 
        input: {}, 
        dv: dataview 
      }
    )

    // Assert
    const firstCall = dataview.view.firstCall;
    expect(firstCall.args[0], 'The wrong file was targeted').to.eql("Scripts/get-notes-missing-frontmatter");
    expect(firstCall.args[1], 'The wrong fields were passed').to.eql({ fields: [ 'type', 'sub-type' ] });
  });
});
