'use strict';

process.env.NODE_ENV = 'development';

const assert = require('chai').assert;
const { suite, test } = require('mocha');
const knex = require('../knex');
const { addDatabaseHooks } = require('./utils')

suite('seeds', addDatabaseHooks(() => {
  test('user_map rows', (done) => {
    knex('user_map').orderBy('id', 'ASC')
      .then((actual) => {
        const expected = [
          {
            'id': 1,
            'user_id': 324968,
            'user_name': '@gillyhopkins'
          },
          {
            'id': 2,
            'user_id': 986514,
            'user_name': '@bojangles'
          },
          {
            'id': 3,
            'user_id': 548310,
            'user_name': '@colonelforbin'
          },
        ];

        for (let i = 0; i < expected.length; i++) {
          assert.deepEqual(
            actual[i],
            expected[i],
            `Row id=${i + 1} not the same`
          );
        }

        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test('channel_map rows', (done) => {
    knex('channel_map').orderBy('id', 'ASC')
      .then((actual) => {
        const expected = [
          {
            'id': 1,
            'channel_id': 847630912,
            'channel_name': '#channel'
          },
          {
            'id': 2,
            'channel_id': 63492017,
            'channel_name': '#other_channel'
          },
        ];

        for (let i = 0; i < expected.length; i++) {
          assert.deepEqual(
            actual[i],
            expected[i],
            `Row id=${i + 1} not the same`
          );
        }

        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test('sentiment_score rows', (done) => {
    knex('sentiment_score').orderBy('id', 'ASC')
      .then((actual) => {
        const expected = [
          {
            'id': 1,
            'channel_map_id': 1,
            'score': (0.50).toFixed(2),
            'magnitude': 30,
            'number_of_messages': 100,
            'created_at': new Date('2017-07-31 14:26:16 UTC'),
            'updated_at': new Date('2017-07-31 14:26:16 UTC')
          },
          {
            'id': 2,
            'channel_map_id': 1,
            'score': (-0.50).toFixed(2),
            'magnitude': 32,
            'number_of_messages': 100,
            'created_at': new Date('2017-07-31 14:26:16 UTC'),
            'updated_at': new Date('2017-07-31 14:26:16 UTC')
          },
          {
            'id': 3,
            'channel_map_id': 2,
            'score': (0.02).toFixed(2),
            'magnitude': 15,
            'number_of_messages': 100,
            'created_at': new Date('2017-07-31 14:26:16 UTC'),
            'updated_at': new Date('2017-07-31 14:26:16 UTC')
          },
        ];

        for (let i = 0; i < expected.length; i++) {
          assert.deepEqual(
            actual[i],
            expected[i],
            `Row id=${i + 1} not the same`
          );
        }

        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test('message rows', (done) => {
    knex('message').orderBy('id', 'ASC')
      .then((actual) => {
        const expected = [
          {
            'id': 1,
            'user_map_id': 1,
            'channel_map_id': 1,
            'message_id': 1003,
            'message': 'This is a message. This is what I would send over slack in this channel.',
            'created_at': new Date('2017-07-31 14:26:16 UTC'),
            'updated_at': new Date('2017-07-31 14:26:16 UTC')
          },
          {
            'id': 2,
            'user_map_id': 3,
            'channel_map_id': 1,
            'message_id': 1004,
            'message': 'This is another message. This is different than the last message.',
            'created_at': new Date('2017-07-31 14:26:16 UTC'),
            'updated_at': new Date('2017-07-31 14:26:16 UTC')
          },
          {
            'id': 3,
            'user_map_id': 1,
            'channel_map_id': 1,
            'message_id': 1005,
            'message': 'blahhhh blah blah. Look at this message. It is sooooo cool.',
            'created_at': new Date('2017-07-31 14:26:16 UTC'),
            'updated_at': new Date('2017-07-31 14:26:16 UTC')
          },
          {
            'id': 4,
            'user_map_id': 2,
            'channel_map_id': 2,
            'message_id': 1006,
            'message': 'I am trying to make a decent amount of messages.',
            'created_at': new Date('2017-07-31 14:26:16 UTC'),
            'updated_at': new Date('2017-07-31 14:26:16 UTC')
          },
          {
            'id': 5,
            'user_map_id': 1,
            'channel_map_id': 2,
            'message_id': 1003,
            'message': 'This is the last message I will add.',
            'created_at': new Date('2017-07-31 14:26:16 UTC'),
            'updated_at': new Date('2017-07-31 14:26:16 UTC')
          },
        ];

        for (let i = 0; i < expected.length; i++) {
          assert.deepEqual(
            actual[i],
            expected[i],
            `Row id=${i + 1} not the same`
          );
        }

        done();
      })
      .catch((err) => {
        done(err);
      });
  });
}));
