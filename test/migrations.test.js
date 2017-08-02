const assert = require('chai').assert;
const { suite, test } = require('mocha');
const knex = require('../knex');
const { addDatabaseHooks } = require('./utils');

suite('migrations', addDatabaseHooks(() => {
  test('user_map columns', (done) => {
    knex('user_map').columnInfo()
      .then((actual) => {
        const expected = {
          id: {
            type: 'integer',
            maxLength: null,
            nullable: false,
            defaultValue: 'nextval(\'user_map_id_seq\'::regclass)',
          },

          user_id: {
            type: 'integer',
            maxLength: null,
            nullable: false,
            defaultValue: null,
          },

          user_name: {
            type: 'character varying',
            maxLength: 255,
            nullable: false,
            defaultValue: null,
          },
        };

        Object.keys(expected).forEach((column) => {
          assert.deepEqual(
            actual[column],
            expected[column],
            `Column ${column} is not the same`,
          );
        });

        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test('channel_map columns', (done) => {
    knex('channel_map').columnInfo()
      .then((actual) => {
        const expected = {
          id: {
            type: 'integer',
            maxLength: null,
            nullable: false,
            defaultValue: 'nextval(\'channel_map_id_seq\'::regclass)',
          },

          channel_id: {
            type: 'integer',
            maxLength: null,
            nullable: false,
            defaultValue: null,
          },

          channel_name: {
            type: 'character varying',
            maxLength: 255,
            nullable: false,
            defaultValue: null,
          },
        };

        Object.keys(expected).forEach((column) => {
          assert.deepEqual(
            actual[column],
            expected[column],
            `Column ${column} is not the same`,
          );
        });

        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test('sentiment_score columns', (done) => {
    knex('sentiment_score').columnInfo()
      .then((actual) => {
        const expected = {
          id: {
            type: 'integer',
            maxLength: null,
            nullable: false,
            defaultValue: 'nextval(\'sentiment_score_id_seq\'::regclass)',
          },

          channel_map_id: {
            type: 'integer',
            maxLength: null,
            nullable: false,
            defaultValue: null,
          },

          score: {
            type: 'numeric',
            maxLength: null,
            nullable: false,
            defaultValue: null,
          },

          magnitude: {
            type: 'real',
            maxLength: null,
            nullable: false,
            defaultValue: null,
          },

          number_of_messages: {
            type: 'integer',
            maxLength: null,
            nullable: false,
            defaultValue: null,
          },

          created_at: {
            type: 'timestamp with time zone',
            maxLength: null,
            nullable: false,
            defaultValue: 'now()',
          },

          updated_at: {
            type: 'timestamp with time zone',
            maxLength: null,
            nullable: false,
            defaultValue: 'now()',
          },
        };

        Object.keys(expected).forEach((column) => {
          assert.deepEqual(
            actual[column],
            expected[column],
            `Column ${column} is not the same`,
          );
        });

        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test('message columns', (done) => {
    knex('message').columnInfo()
      .then((actual) => {
        const expected = {
          id: {
            type: 'integer',
            maxLength: null,
            nullable: false,
            defaultValue: 'nextval(\'message_id_seq\'::regclass)',
          },

          user_map_id: {
            type: 'integer',
            maxLength: null,
            nullable: false,
            defaultValue: null,
          },

          channel_map_id: {
            type: 'integer',
            maxLength: null,
            nullable: false,
            defaultValue: null,
          },

          message_id: {
            type: 'integer',
            maxLength: null,
            nullable: false,
            defaultValue: null,
          },

          message_timestamp: {
            type: 'timestamp with time zone',
            maxLength: null,
            nullable: false,
            defaultValue: null,
          },

          message: {
            type: 'text',
            maxLength: null,
            nullable: false,
            defaultValue: '\'\'::text',
          },
        };

        Object.keys(expected).forEach((column) => {
          assert.deepEqual(
            actual[column],
            expected[column],
            `Column ${column} is not the same`,
          );
        });

        done();
      })
      .catch((err) => {
        done(err);
      });
  });
}));
