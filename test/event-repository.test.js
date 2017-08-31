/* eslint-disable no-undef, no-unused-expressions */
before(() => {
  process.env.NODE_ENV = 'test';
});

after(() => {
  process.env.NODE_ENV = 'docker_dev';
});

const expect = require('chai').expect;
const { writeMessage, getMessageById } = require('../repositories/event-repository');
const { addDatabaseHooks } = require('./utils');

describe('Event Repo writeMessage', addDatabaseHooks(() => {
  it('should exist', () => {
    expect(writeMessage).to.exist;
  });

  it('should be a function', () => {
    expect(writeMessage).is.a('function');
  });

  it('should return an array', () => {
    writeMessage('a324968f', 'Message text', '123456789', 'l847630912p')
      .then((result) => {
        expect(result).to.be.a('array');
      });
  });
}));

describe('Event Repo getMessageById', addDatabaseHooks(() => {
  it('should exist', () => {
    expect(getMessageById).to.exist;
  });

  it('should be a function', () => {
    expect(getMessageById).is.a('function');
  });

  it('should return an object with correct message', () => {
    getMessageById(1)
      .then((result) => {
        expect(result).to.deep.equal({
          messageId: 1,
          userId: 'U6FMJ3J3Z',
          channelId: 'C6E2XMLAV',
          rawTs: '1501624043.643661',
          messageTimestamp: new Date('2017-08-01T21:47:23.643Z'),
          message: 'This is a message. This is what I would send over slack in this channel.',
          channelName: 'random',
          userName: 'dave.gallup',
          realName: 'Dave Gallup',
          firstName: 'Dave',
          lastName: 'Gallup',
          statusEmoji: ':slack:',
          image24: 'https://secure.gravatar.com/avatar/bffb6bb05942ed7400905f9ceb0f6cdf.jpg?s=24&d=https%3A%2F%2Fa.slack-edge.com%2F66f9%2Fimg%2Favatars%2Fava_0011-24.png',
          image512: 'https://secure.gravatar.com/avatar/bffb6bb05942ed7400905f9ceb0f6cdf.jpg?s=512&d=https%3A%2F%2Fa.slack-edge.com%2F7fa9%2Fimg%2Favatars%2Fava_0011-512.png',
        });
      });
  });
}));
