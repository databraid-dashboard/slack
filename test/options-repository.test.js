/* eslint-disable no-undef, no-unused-expressions */
before(() => {
  process.env.NODE_ENV = 'test';
});

after(() => {
  process.env.NODE_ENV = 'docker_dev';
});

const expect = require('chai').expect;
const { updateOption, readOption } = require('../repositories/option-repository');
const { addDatabaseHooks } = require('./utils');

describe(
  'Options Repo updateOption',
  addDatabaseHooks(() => {
    it('should exist', () => {
      expect(updateOption).to.exist;
    });

    it('should be a function', () => {
      expect(updateOption).is.a('function');
    });

    it('should return an array', () => {
      updateOption('oauth_token', '123456789')
        .then((result) => {
          expect(result).to.equal(1);
        });
    });
  }),
);

describe(
  'Options Repo readOption',
  addDatabaseHooks(() => {
    it('should exist', () => {
      expect(readOption).to.exist;
    });

    it('should be a function', () => {
      expect(readOption).is.a('function');
    });

    it('should return an array', () => {
      readOption('oauth_token').then((result) => {
        expect(result).to.be.a('array');
      });
    });
  }),
);
