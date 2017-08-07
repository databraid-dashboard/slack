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

describe('fetchMessageBatch', addDatabaseHooks(() => {
  it('should exist', () => {
    expect(fetchMessageBatch).to.exist;
  });

  it('should be a function', () => {
    expect(fetchMessageBatch).is.a('function');
  });

  it('should return an array', () => {
    fetchMessageBatch(1)
      .then(result => {
        expect(result).to.be.an('array');
      })
  });

  //          NOT YET WORKING
  // it('should return an array of message objects', () => {
  //   fetchMessageBatch(1)
  //     .then(result => {
  //       console.log(JSON.parse(JSON.stringify(result)));
  //       expect(JSON.parse(JSON.stringify(result))).to.equal([
  //          { message: 'This is a message. This is what I would send over slack in this channel.' },
  //         { message: 'This is a great new message. This is different than the last message.' },
  //         { message: 'Happy things! Look at this message. It is sooooo cool.' }
  //       ]);
  //     })
  // });
}));

describe('addSentimentScore', addDatabaseHooks(() => {
  it('should exist', () => {
    expect(addSentimentScore).to.exist;
  });

  it('should be a function', () => {
    expect(addSentimentScore).is.a('function');
  });

  it('should return an array of one object', () => {
    addSentimentScore(0.11, 22, 1, 15)
      .then(result => {
        expect(result[0]).to.be.an('object');
        expect(result[1]).to.be.an('undefined');
      })
  });

  // it('should return the new score data', () => {
  //   addSentimentScore(0.11, 22, 1, 15)
  //     .then(result => {
  //       expect(result[0]).to.equal
  //     })
  // })
}));
