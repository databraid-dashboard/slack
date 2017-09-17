/* eslint-disable no-undef, no-unused-expressions */
before(() => {
  process.env.NODE_ENV = 'test';
});

after(() => {
  process.env.NODE_ENV = 'docker_dev';
});

const expect = require('chai').expect;
const { handleNewMessageEvent,
  handleEditMessageEvent,
  handleDeleteMessageEvent,
  handleUserJoinedTeamEvent,
  handleEditUserEvent } = require('../src/slack/message-event-handlers');

describe.only('Slack message event handlers', () => {
  describe('handleNewMessageEvent()', () => {
    it('should be a function', () => {
      expect(handleNewMessageEvent).is.a('function');
    });
  });

  describe('handleEditMessageEvent()', () => {
    it('should be a function', () => {
      expect(handleEditMessageEvent).is.a('function');
    });
  });

  describe('handleDeleteMessageEvent()', () => {
    it('should be a function', () => {
      expect(handleDeleteMessageEvent).is.a('function');
    });
  });

  describe('handleUserJoinedTeamEvent()', () => {
    it('should be a function', () => {
      expect(handleUserJoinedTeamEvent).is.a('function');
    });
  });

  describe('handleEditUserEvent()', () => {
    it('should be a function', () => {
      expect(handleEditUserEvent).is.a('function');
    });
  });
});
