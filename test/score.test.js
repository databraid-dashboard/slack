const expect = require('chai').expect;
const { analyzeSentimentOfText, analyzeSentimentAndSaveScore } = require('../src/sentiment.js');

describe('analyzeSentimentOfText', function() {
  //exists
  it('should exist', function() {
    expect(analyzeSentimentOfText).to.exist;
  });

  //is a function
  it('should be a function', function() {
    expect(analyzeSentimentOfText).is.a('function');
  });

  //returns a number
  it('should return a number', function() {
    analyzeSentimentOfText('This is a string of text.', 1, 3)
      .then(result => {
        expect(result).to.be.a('number');
      })
  });
});

describe('analyzeSentimentAndSaveScore', function() {
  //exists
  it('should exist', function() {
    expect(analyzeSentimentAndSaveScore).to.exist;
  });

  //is a function
  it('should be a function', function() {
    expect(analyzeSentimentAndSaveScore).is.a('function');
  });

  //returns a number
  it('should return a number', function() {
    analyzeSentimentAndSaveScore(1)
      .then(result => {
        console.log(result);
        expect(result).to.be.a('number');
      })
  });
});
