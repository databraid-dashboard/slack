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

describe(
  'Event Repo writeMessage',
  addDatabaseHooks(() => {
    it('should exist', () => {
      expect(writeMessage).to.exist;
    });

    it('should be a function', () => {
      expect(writeMessage).is.a('function');
    });

    it('should return an array', () => {
      writeMessage(
        'U6KESJ1BN',
        'This is a great new message. This is different than the last message.',
        '1501625043.643661',
        'l847630912p',
      ).then((result) => {
        expect(result).to.be.a('array');
      });
    });
  }),
);
