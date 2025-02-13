import * as chai from 'chai';
import * as sinon from 'sinon';
import TroubleshootingSetup from '../ts-src/troubleshootingSetup';

const expect = chai.expect;

describe('Templater: Troubleshooting Setup', () => {
  afterEach(() => {
    sinon.reset();
  });
  
  it('should return a title string based on the users input', async () => {
    // Arrange
    const input = 'Testing';
    const dateStr = '20250212';
    const templater = {
      date: {
        now: sinon.mock('now')
      },
      system: {
        prompt: sinon.mock('prompt')
      },
      file: {
        rename: sinon.mock('rename')
      }
    }

    templater.date.now.returns(dateStr);
    templater.system.prompt.resolves(input)
    templater.file.rename.resolves()

    // Act
    const result = await TroubleshootingSetup(templater, 'What are we troubleshooting?')
    
    // Assert
    expect(result).to.equal(`Troubleshooting - ${input}`);
  })

  it('should rename the file based on the date string', async () => {
    // Arrange
    const input = 'Testing';
    const dateStr = '20250212';
    const templater = {
      date: {
        now: sinon.mock('now')
      },
      system: {
        prompt: sinon.mock('prompt')
      },
      file: {
        rename: sinon.mock('rename')
      }
    }

    templater.date.now.returns(dateStr);
    templater.system.prompt.resolves(input)
    templater.file.rename.resolves()

    // Act
    await TroubleshootingSetup(templater, 'What are we troubleshooting?')
    
    // Assert
    expect(templater.file.rename.calledWith(`${dateStr} - ${input}`)).to.be.true;
  })
})