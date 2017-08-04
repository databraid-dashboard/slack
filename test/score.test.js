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

  //returns the sum of 2 passed in numbers (you will need to test against several inputs)
  // it('should return the sum of 2 passed in numbers', function() {
  //   expect(add(1, 2)).to.deep.equal(3);
  //   expect(add(11, 22)).to.deep.equal(33);
  //   expect(add(-3, 5)).to.deep.equal(2);
  // });

});

describe('analyzeSentimentAndSaveScore', function() {
  //exists
  // it('should exist', function() {
  //   expect(add).to.exist;
  // });
  //
  // //is a function
  // it('should be a function', function() {
  //   expect(add).is.a('function');
  // });
  //
  // //returns a number
  // it('should return a number', function() {
  //   expect(add(1, 2)).to.be.a('number');
  // });
  //
  // //returns the sum of 2 passed in numbers (you will need to test against several inputs)
  // it('should return the sum of 2 passed in numbers', function() {
  //   expect(add(1, 2)).to.deep.equal(3);
  //   expect(add(11, 22)).to.deep.equal(33);
  //   expect(add(-3, 5)).to.deep.equal(2);
  // });

});
