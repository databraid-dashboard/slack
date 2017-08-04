const expect = require('chai').expect;
const { analyzeSentimentOfText, analyzeSentimentAndSaveScore } = require('../src/sentiment.js');

/* eslint-disable no-undef */
describe('analyzeSentimentOfText', () => {
  /* eslint-disable no-undef */
  it('should exist', () => {
    /* eslint-disable no-unused-expressions */
    expect(analyzeSentimentOfText).to.exist;
  });

  /* eslint-disable no-undef */
  it('should be a function', () => {
    expect(analyzeSentimentOfText).is.a('function');
  });

  /* eslint-disable no-undef */
  it('should return a number', () => {
    analyzeSentimentOfText('This is a string of text.', 1, 3)
      .then((result) => {
        expect(result).to.be.a('number');
      });
  });
});

/* eslint-disable no-undef */
describe('analyzeSentimentAndSaveScore', () => {
  /* eslint-disable no-undef */
  it('should exist', () => {
    /* eslint-disable no-unused-expressions */
    expect(analyzeSentimentAndSaveScore).to.exist;
  });

  /* eslint-disable no-undef */
  it('should be a function', () => {
    expect(analyzeSentimentAndSaveScore).is.a('function');
  });
});
