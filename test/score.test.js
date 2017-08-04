/* eslint-disable no-undef, no-unused-expressions */
const expect = require('chai').expect;
const { analyzeSentimentOfText, analyzeSentimentAndSaveScore } = require('../src/sentiment.js');

describe('analyzeSentimentOfText', () => {
  it('should exist', () => {
    expect(analyzeSentimentOfText).to.exist;
  });

  it('should be a function', () => {
    expect(analyzeSentimentOfText).is.a('function');
  });

  it('should return a number', () => {
    analyzeSentimentOfText('This is a string of text.', 1, 3)
      .then((result) => {
        expect(result).to.be.a('number');
      });
  });
});

describe('analyzeSentimentAndSaveScore', () => {
  it('should exist', () => {
    expect(analyzeSentimentAndSaveScore).to.exist;
  });

  it('should be a function', () => {
    expect(analyzeSentimentAndSaveScore).is.a('function');
  });
});
