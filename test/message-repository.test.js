/* eslint-disable no-undef, no-unused-expressions */
before(() => {
  process.env.NODE_ENV = 'test';
});

after(() => {
  process.env.NODE_ENV = 'docker_dev';
});

const expect = require('chai').expect;
const { getMessages, getMessagesByChannelName } = require('../repositories/message-repository');
const { addDatabaseHooks } = require('./utils');

describe(
  'Event Repo getMessages',
  addDatabaseHooks(() => {
    it('should exist', () => {
      expect(getMessages).to.exist;
    });

    it('should be a function', () => {
      expect(getMessages).is.a('function');
    });

    it('should return an array of objects', () => {
      getMessages().then((result) => {
        expect(result).to.be.a('array');
      });
    });
  }),
);

describe(
  'Event Repo getMessagesByChannelName',
  addDatabaseHooks(() => {
    it('should exist', () => {
      expect(getMessagesByChannelName).to.exist;
    });

    it('should be a function', () => {
      expect(getMessagesByChannelName).is.a('function');
    });

    it('should return an array', () => {
      getMessagesByChannelName('#dev').then((result) => {
        expect(result).to.be.a('array');
      });
    });
  }),
);
