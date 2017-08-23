/* eslint-disable no-undef, no-unused-expressions */
before(() => {
  process.env.NODE_ENV = 'test';
});

after(() => {
  process.env.NODE_ENV = 'docker_dev';
});

const expect = require('chai').expect;
const { writeMessage } = require('../repositories/event-repository');
const { addDatabaseHooks } = require('./utils');

describe('Event Repo writeMessage', addDatabaseHooks(() => {
  it('should exist', () => {
    expect(writeMessage).to.exist;
  });

  it('should be a function', () => {
    expect(writeMessage).is.a('function');
  });

  it('should return an object', () => {
    writeMessage('a324968f', 'Message text', '123456789', 'l847630912p')
      .then((result) => {
        expect(result).to.be.a('array');
      });
  });
}));
