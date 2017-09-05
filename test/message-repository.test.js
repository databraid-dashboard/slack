/* eslint-disable no-undef, no-unused-expressions */
before(() => {
  process.env.NODE_ENV = 'test';
});

after(() => {
  process.env.NODE_ENV = 'docker_dev';
});

const expect = require('chai').expect;
const { getMessages, getMessagesByChannelName } = require('../repositories/message-repository');
const { addDatabaseHooks } = require('./utils');

describe(
  'Event Repo getMessages',
  addDatabaseHooks(() => {
    it('should exist', () => {
      expect(getMessages).to.exist;
    });

    it('should be a function', () => {
      expect(getMessages).is.a('function');
    });

    it('should return an array of objects', () => {
      getMessages().then((result) => {
        expect(result).to.be.a('array');
      });
    });
  }),
);

describe(
  'Event Repo getMessagesByChannelName',
  addDatabaseHooks(() => {
    it('should exist', () => {
      expect(getMessagesByChannelName).to.exist;
    });

    it('should be a function', () => {
      expect(getMessagesByChannelName).is.a('function');
    });

    it('should return an array', () => {
      getMessagesByChannelName('dev').then((result) => {
        expect(result).to.be.a('array');
      });
    });

    it('should return an array with correct message info', () => {
      getMessagesByChannelName('dev').then((result) => {
        expect(result).to.deep.equal([
          {
            messageId: 3,
            userId: 'U6T3VM814',
            channelId: 'C6DUVSW3A',
            rawTs: '1501626043.643661',
            messageTimestamp: new Date('2017-08-01T22:20:43.643Z'),
            message: 'Happy things! Look at this message. It is sooooo cool.',
            channelName: 'dev',
            userName: 'tylerlangenbrunner',
            realName: 'Tyler Langenbrunner',
            firstName: 'Tyler',
            lastName: 'Langenbrunner',
            statusEmoji: ':slack:',
            image24:
              'https://secure.gravatar.com/avatar/bffb6bb05942ed7400905f9ceb0f6cdf.jpg?s=24&d=https%3A%2F%2Fa.slack-edge.com%2F66f9%2Fimg%2Favatars%2Fava_0011-24.png',
            image512:
              'https://secure.gravatar.com/avatar/bffb6bb05942ed7400905f9ceb0f6cdf.jpg?s=512&d=https%3A%2F%2Fa.slack-edge.com%2F7fa9%2Fimg%2Favatars%2Fava_0011-512.png',
          },
        ]);
      });
    });
  }),
);
