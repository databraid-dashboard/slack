const expect = require('chai').expect;
const { analyzeSentimentOfText, analyzeSentimentAndSaveScore } = require('../src/sentiment.js');

describe('analyzeSentimentOfText', () => {
  // exists
  it('should exist', () => {
    expect(analyzeSentimentOfText).to.exist;
  });

  // is a function
  it('should be a function', () => {
    expect(analyzeSentimentOfText).is.a('function');
  });

  // returns a number
  it('should return a number', () => {
    analyzeSentimentOfText('This is a string of text.', 1, 3)
      .then((result) => {
        expect(result).to.be.a('number');
      });
  });
});

describe('analyzeSentimentAndSaveScore', () => {
  // exists
  it('should exist', () => {
    expect(analyzeSentimentAndSaveScore).to.exist;
  });

  // is a function
  it('should be a function', () => {
    expect(analyzeSentimentAndSaveScore).is.a('function');
  });
});
