/* eslint-disable no-undef, no-unused-expressions */
before(() => {
  process.env.NODE_ENV = 'test';
});

after(() => {
  process.env.NODE_ENV = 'docker_dev';
});

const expect = require('chai').expect;
const { writeOption, readOption } = require('../repositories/option-repository');
const { addDatabaseHooks } = require('./utils');

describe(
  'Options Repo writeOption',
  addDatabaseHooks(() => {
    it('should exist', () => {
      expect(writeOption).to.exist;
    });

    it('should be a function', () => {
      expect(writeOption).is.a('function');
    });

    it('should return an array', () => {
      writeOption().then((result) => {
        expect(result).to.be.a('array');
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
