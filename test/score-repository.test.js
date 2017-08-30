/* eslint-disable no-undef, no-unused-expressions */
before(() => {
  process.env.NODE_ENV = 'test';
});

after(() => {
  process.env.NODE_ENV = 'docker_dev';
});

const expect = require('chai').expect;
const { fetchMessageBatch, addSentimentScore } = require('../repositories/sentiment-repository.js');
const { addDatabaseHooks } = require('./utils');

describe(
  'fetchMessageBatch',
  addDatabaseHooks(() => {
    it('should exist', () => {
      expect(fetchMessageBatch).to.exist;
    });

    it('should be a function', () => {
      expect(fetchMessageBatch).is.a('function');
    });

    it('should return an array', () => {
      fetchMessageBatch(1).then((result) => {
        expect(result).to.be.an('array');
      });
    });
  }),
);

describe(
  'addSentimentScore',
  addDatabaseHooks(() => {
    it('should exist', () => {
      expect(addSentimentScore).to.exist;
    });

    it('should be a function', () => {
      expect(addSentimentScore).is.a('function');
    });

    it('should return an array of one object', () => {
      addSentimentScore(0.5, 30, 'C6E2XMK4H', 100).then((result) => {
        expect(result[0]).to.be.an('object');
        expect(result[1]).to.be.an('undefined');
      });
    });
  }),
);
