/* eslint-disable no-undef, no-unused-expressions */
before(() => {
  process.env.NODE_ENV = 'test';
});

after(() => {
  process.env.NODE_ENV = 'docker_dev';
});

const expect = require('chai').expect;
const { getChannels, getChannelById } = require('../repositories/channel-repository');
const { addDatabaseHooks } = require('./utils');

describe(
  'Event Repo getChannels',
  addDatabaseHooks(() => {
    it('should exist', () => {
      expect(getChannels).to.exist;
    });

    it('should be a function', () => {
      expect(getChannels).is.a('function');
    });

    it('should return an array of objects', () => {
      getChannels().then((result) => {
        expect(result).to.be.a('array');
      });
    });
  }),
);

describe(
  'Event Repo getChannelById',
  addDatabaseHooks(() => {
    it('should exist', () => {
      expect(getChannelById).to.exist;
    });

    it('should be a function', () => {
      expect(getChannelById).is.a('function');
    });

    it('should return an object', () => {
      getChannelById('C6E2XMK4H').then((result) => {
        expect(result).to.be.a('object');
      });
    });

    it('should return an object with channelId and channelName', () => {
      getChannelById('C6E2XMK4H').then((result) => {
        expect(result).to.deep.equal({
          channelId: 'C6E2XMK4H',
          channelName: 'general',
        });
      });
    });
  }),
);
