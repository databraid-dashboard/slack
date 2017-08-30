/* eslint-disable no-undef */
before(() => {
  process.env.NODE_ENV = 'test';
});

/* eslint-disable no-undef */
after(() => {
  process.env.NODE_ENV = 'docker_dev';
});

const assert = require('chai').assert;
const { suite, test } = require('mocha');
const knex = require('../knex');
const { addDatabaseHooks } = require('./utils');

suite(
  'seeds',
  addDatabaseHooks(() => {
    test('user_map rows', (done) => {
      knex('user_map')
        .orderBy('id', 'ASC')
        .then((actual) => {
          const expected = [
            {
              id: 1,
              user_id: 'a324968f',
              user_name: '@gillyhopkins',
            },
            {
              id: 2,
              user_id: 'b986514g',
              user_name: '@bojangles',
            },
            {
              id: 3,
              user_id: 'c548310h',
              user_name: '@colonelforbin',
            },
            {
              id: 4,
              user_id: 'U6FMJ3J3Z',
              user_name: '@dave.gallup',
            },
            {
              id: 5,
              user_id: 'U6KESJ1BN',
              user_name: '@meghanprestemon',
            },
            {
              id: 6,
              user_id: 'U6T3VM814',
              user_name: '@tylerlangenbrunner',
            },
            {
              id: 7,
              user_id: 'U6SPRFYLX',
              user_name: '@kurtishouser',
            },
            {
              id: 8,
              user_id: 'U6SHV2R5L',
              user_name: '@johanbmk',
            },
          ];

          expected.forEach((row, i) => {
            assert.deepEqual(actual[i], expected[i], `Row id=${i + 1} not the same`);
          });

          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    test('channel_map rows', (done) => {
      knex('channel_map')
        .orderBy('id', 'ASC')
        .then((actual) => {
          const expected = [
            {
              id: 1,
              channel_id: 'C6DUVSW3A',
              channel_name: 'dev',
            },
            {
              id: 2,
              channel_id: 'C6E2XMK4H',
              channel_name: 'general',
            },
            {
              id: 3,
              channel_id: 'l847630912p',
              channel_name: 'random',
            },
            {
              id: 4,
              channel_id: 'z63492017x',
              channel_name: 'other_channel',
            },
          ];

          expected.forEach((row, i) => {
            assert.deepEqual(actual[i], expected[i], `Row id=${i + 1} not the same`);
          });

          done();
        })
        .catch((err) => {
          done(err);
        });
    });
    test('channel_map rows', (done) => {
      knex('channel_map')
        .orderBy('id', 'ASC')
        .then((actual) => {
          const expected = [
            {
              id: 1,
              channel_id: 'C6DUVSW3A',
              channel_name: 'dev',
            },
            {
              id: 2,
              channel_id: 'C6E2XMK4H',
              channel_name: 'general',
            },
            {
              id: 3,
              channel_id: 'l847630912p',
              channel_name: 'random',
            },
            {
              id: 4,
              channel_id: 'z63492017x',
              channel_name: 'other_channel',
            },
          ];

          expected.forEach((row, i) => {
            assert.deepEqual(actual[i], expected[i], `Row id=${i + 1} not the same`);
          });

          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    test('sentiment_score rows', (done) => {
      knex('sentiment_score')
        .orderBy('id', 'ASC')
        .then((actual) => {
          const expected = [
            {
              id: 1,
              channel_map_id: 1,
              score: (0.5).toFixed(2),
              magnitude: 30,
              number_of_messages: 100,
              created_at: new Date('2017-07-31 14:26:16 UTC'),
              updated_at: new Date('2017-07-31 14:26:16 UTC'),
            },
            {
              id: 2,
              channel_map_id: 1,
              score: (-0.5).toFixed(2),
              magnitude: 32,
              number_of_messages: 100,
              created_at: new Date('2017-07-31 14:26:16 UTC'),
              updated_at: new Date('2017-07-31 14:26:16 UTC'),
            },
            {
              id: 3,
              channel_map_id: 2,
              score: (0.02).toFixed(2),
              magnitude: 15,
              number_of_messages: 100,
              created_at: new Date('2017-07-31 14:26:16 UTC'),
              updated_at: new Date('2017-07-31 14:26:16 UTC'),
            },
          ];

          expected.forEach((row, i) => {
            assert.deepEqual(actual[i], expected[i], `Row id=${i + 1} not the same`);
          });

          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    test('message rows', (done) => {
      knex('message')
        .orderBy('id', 'ASC')
        .then((actual) => {
          const expected = [
            {
              id: 1,
              user_map_id: 1,
              channel_map_id: 1,
              raw_ts: '1501624043.643661',
              message_timestamp: new Date(1501624043.643661 * 1000),
              message: 'This is a message. This is what I would send over slack in this channel.',
            },
            {
              id: 2,
              user_map_id: 3,
              channel_map_id: 1,
              raw_ts: '1501625043.643661',
              message_timestamp: new Date(1501625043.643661 * 1000),
              message: 'This is a great new message. This is different than the last message.',
            },
            {
              id: 3,
              user_map_id: 1,
              channel_map_id: 1,
              raw_ts: '1501626043.643661',
              message_timestamp: new Date(1501626043.643661 * 1000),
              message: 'Happy things! Look at this message. It is sooooo cool.',
            },
            {
              id: 4,
              user_map_id: 2,
              channel_map_id: 2,
              raw_ts: '1501627043.643661',
              message_timestamp: new Date(1501627043.643661 * 1000),
              message: 'I am trying to make a decent amount of messages.',
            },
            {
              id: 5,
              user_map_id: 1,
              channel_map_id: 2,
              raw_ts: '1501628043.643661',
              message_timestamp: new Date(1501628043.643661 * 1000),
              message: 'This is the last message I will add.',
            },
          ];

          expected.forEach((row, i) => {
            assert.deepEqual(actual[i], expected[i], `Row id=${i + 1} not the same`);
          });

          done();
        })
        .catch((err) => {
          done(err);
        });
    });
  }),
);
