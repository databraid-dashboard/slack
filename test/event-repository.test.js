const expect = require('chai').expect;
const { writeMessage } = require('../repositories/event-repository');

describe('Event Repo writeMeaage', ()=> {

  it('should exist', () => {
    expect(writeMessage).to.exist;
  });

  it('should be a function', () => {
    expect(writeMessage).is.a('function');
  });

  it('should return an array', () => {
    writeMessage('U1111111', 'Message text', '', 'C1111111')
    .then((result) => {
      expect(result).to.be.a('object');
    });
  });
});
