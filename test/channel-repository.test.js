/* eslint-disable no-undef, no-unused-expressions */
before(() => {
  process.env.NODE_ENV = 'test';
});

after(() => {
  process.env.NODE_ENV = 'docker_dev';
});

const expect = require('chai').expect;
const { getChannels } = require('../repositories/channel-repository');
const { addDatabaseHooks } = require('./utils');

describe('Channel Repo getChannels', addDatabaseHooks(() => {
  it('should exist', () => {
    expect(getChannels).to.exist;
  });

  it('should be a function', () => {
    expect(getChannels).is.a('function');
  });

  it('should return an array', () => {
    getChannels()
      .then((result) => {
        expect(result).to.be.a('array');
      });
  });
}));
