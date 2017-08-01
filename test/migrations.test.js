'use strict';

process.env.NODE_ENV = 'test';

const assert = require('chai').assert;
const { suite, test } = require('mocha');
const knex = require('../knex');
const { addDatabaseHooks } = require('./utils')

// suite('migrations', addDatabaseHooks(() => {
//   test('users columns', (done) => {
//     knex('users').columnInfo()
//       .then((actual) => {
//         const expected = {
//           id: {
//             type: 'integer',
//             maxLength: null,
//             nullable: false,
//             defaultValue: 'nextval(\'users_id_seq\'::regclass)'
//           },
//
//           first_name: {
//             type: 'character varying',
//             maxLength: 50,
//             nullable: false,
//             defaultValue: '\'\'::character varying'
//           },
//
//           last_name: {
//             type: 'character varying',
//             maxLength: 50,
//             nullable: false,
//             defaultValue: '\'\'::character varying'
//           },
//
//           email: {
//             type: 'character varying',
//             maxLength: 100,
//             nullable: false,
//             defaultValue: null
//           },
//
//           hashed_password: {
//             type: 'character',
//             maxLength: 60,
//             nullable: false,
//             defaultValue: null
//           },
//
//           created_at: {
//             type: 'timestamp with time zone',
//             maxLength: null,
//             nullable: false,
//             defaultValue: 'now()'
//           },
//
//           updated_at: {
//             type: 'timestamp with time zone',
//             maxLength: null,
//             nullable: false,
//             defaultValue: 'now()'
//           }
//         };
//
//         for (const column in expected) {
//           assert.deepEqual(
//             actual[column],
//             expected[column],
//             `Column ${column} is not the same`
//           );
//         }
//
//         done();
//       })
//       .catch((err) => {
//         done(err);
//       });
//   });
//
//   test('podcasts columns', (done) => {
//     knex('podcasts').columnInfo()
//       .then((actual) => {
//         const expected = {
//           id: {
//             type: 'integer',
//             maxLength: null,
//             nullable: false,
//             defaultValue: 'nextval(\'podcasts_id_seq\'::regclass)'
//           },
//
//           artist_id: {
//             type: 'integer',
//             maxLength: null,
//             nullable: false,
//             defaultValue: null
//           },
//
//           collection_id: {
//             type: 'integer',
//             maxLength: null,
//             nullable: false,
//             defaultValue: null
//           },
//
//           track_id: {
//             type: 'integer',
//             maxLength: null,
//             nullable: false,
//             defaultValue: null
//           },
//
//           artist_name: {
//             type: 'character varying',
//             maxLength: 255,
//             nullable: false,
//             defaultValue: '\'\'::character varying'
//           },
//
//           collection_name: {
//             type: 'character varying',
//             maxLength: 255,
//             nullable: false,
//             defaultValue: '\'\'::character varying'
//           },
//
//           artist_view_url: {
//             type: 'character varying',
//             maxLength: 255,
//             nullable: false,
//             defaultValue: '\'\'::character varying'
//           },
//
//           collection_view_url: {
//             type: 'character varying',
//             maxLength: 255,
//             nullable: false,
//             defaultValue: '\'\'::character varying'
//           },
//
//           feed_url: {
//             type: 'character varying',
//             maxLength: 255,
//             nullable: false,
//             defaultValue: '\'\'::character varying'
//           },
//
//           track_view_url: {
//             type: 'character varying',
//             maxLength: 255,
//             nullable: false,
//             defaultValue: '\'\'::character varying'
//           },
//
//           artwork_url_60: {
//             type: 'character varying',
//             maxLength: 255,
//             nullable: true,
//             defaultValue: null
//           },
//
//           release_date: {
//             type: 'character varying',
//             maxLength: 50,
//             nullable: true,
//             defaultValue: null
//           },
//
//           artwork_url_600: {
//             type: 'character varying',
//             maxLength: 255,
//             nullable: true,
//             defaultValue: null
//           },
//
//           genre_ids: {
//             type: 'ARRAY',
//             maxLength: null,
//             nullable: true,
//             defaultValue: null
//           },
//
//           genres: {
//             type: 'ARRAY',
//             maxLength: null,
//             nullable: true,
//             defaultValue: null
//           },
//
//           created_at: {
//             type: 'timestamp with time zone',
//             maxLength: null,
//             nullable: false,
//             defaultValue: 'now()'
//           },
//
//           updated_at: {
//             type: 'timestamp with time zone',
//             maxLength: null,
//             nullable: false,
//             defaultValue: 'now()'
//           }
//         };
//
//         for (const column in expected) {
//           assert.deepEqual(
//             actual[column],
//             expected[column],
//             `Column ${column} is not the same`
//           );
//         }
//
//         done();
//       })
//       .catch((err) => {
//         done(err);
//       });
//   });
//
//   test('favorites columns', (done) => {
//     knex('favorites').columnInfo()
//       .then((actual) => {
//         const expected = {
//           id: {
//             type: 'integer',
//             maxLength: null,
//             nullable: false,
//             defaultValue: 'nextval(\'favorites_id_seq\'::regclass)'
//           },
//
//           user_id: {
//             type: 'integer',
//             maxLength: null,
//             nullable: false,
//             defaultValue: null
//           },
//
//           user_id_shared: {
//             type: 'integer',
//             maxLength: null,
//             nullable: true,
//             defaultValue: null
//           },
//
//           podcast_id: {
//             type: 'integer',
//             maxLength: null,
//             nullable: false,
//             defaultValue: null
//           },
//
//           // episode_id: {
//           //   type: 'integer',
//           //   maxLength: null,
//           //   nullable: true,
//           //   defaultValue: null
//           // },
//
//           created_at: {
//             type: 'timestamp with time zone',
//             maxLength: null,
//             nullable: false,
//             defaultValue: 'now()'
//           },
//
//           updated_at: {
//             type: 'timestamp with time zone',
//             maxLength: null,
//             nullable: false,
//             defaultValue: 'now()'
//           }
//         };
//
//         for (const column in expected) {
//           assert.deepEqual(
//             actual[column],
//             expected[column],
//             `Column ${column} is not the same`
//           );
//         }
//
//         done();
//       })
//       .catch((err) => {
//         done(err);
//       });
//   });
//
//   test('shared columns', (done) => {
//     knex('shared').columnInfo()
//       .then((actual) => {
//         const expected = {
//           id: {
//             type: 'integer',
//             maxLength: null,
//             nullable: false,
//             defaultValue: 'nextval(\'shared_id_seq\'::regclass)'
//           },
//
//           comments: {
//             type: 'text',
//             maxLength: null,
//             nullable: true,
//             defaultValue: null
//           },
//
//           user_id_from: {
//             type: 'integer',
//             maxLength: null,
//             nullable: false,
//             defaultValue: null
//           },
//
//           user_id_to: {
//             type: 'integer',
//             maxLength: null,
//             nullable: false,
//             defaultValue: null
//           },
//
//           podcast_id: {
//             type: 'integer',
//             maxLength: null,
//             nullable: true,
//             defaultValue: null
//           },
//
//           // episode_id: {
//           //   type: 'integer',
//           //   maxLength: null,
//           //   nullable: true,
//           //   defaultValue: null
//           // },
//
//           created_at: {
//             type: 'timestamp with time zone',
//             maxLength: null,
//             nullable: false,
//             defaultValue: 'now()'
//           },
//
//           updated_at: {
//             type: 'timestamp with time zone',
//             maxLength: null,
//             nullable: false,
//             defaultValue: 'now()'
//           }
//         };
//
//         for (const column in expected) {
//           assert.deepEqual(
//             actual[column],
//             expected[column],
//             `Column ${column} is not the same`
//           );
//         }
//
//         done();
//       })
//       .catch((err) => {
//         done(err);
//       });
//   });
// }));
