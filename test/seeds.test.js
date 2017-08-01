'use strict';

process.env.NODE_ENV = 'development';

const assert = require('chai').assert;
const { suite, test } = require('mocha');
const knex = require('../knex');
const { addDatabaseHooks } = require('./utils')

// suite('seeds', addDatabaseHooks(() => {
//   test('users rows', (done) => {
//     knex('users').orderBy('id', 'ASC')
//       .then((actual) => {
//         const expected = [{
//           id: 1,
//           first_name: 'Grant',
//           last_name: 'Willison',
//           email: 'emailgdw@gmail.com',
//           hashed_password: '$2a$10$AdBWIytdZxElaGvlxGKb6e0NF5P1rv3sCyQyWHZIqYvV1JbqxHEdS',
//           created_at: new Date('2016-06-29 14:26:16 UTC'),
//           updated_at: new Date('2016-06-29 14:26:16 UTC')
//         }, {
//           id: 2,
//           first_name: 'Meghan',
//           last_name: 'Prestemon',
//           email: 'm.m.hares@gmail.com',
//           hashed_password: '$2a$10$MHCRByQXcrufNuhLRuOAv.WdyAC5R5f/Qjz9xvilWN4OGm0qL4/Hm',
//           created_at: new Date('2016-06-29 14:26:16 UTC'),
//           updated_at: new Date('2016-06-29 14:26:16 UTC')
//         }, {
//           id: 3,
//           first_name: 'Dummy',
//           last_name: 'user',
//           email: 'dummyUser@gmail.com',
//           hashed_password: '$2a$10$2.0gXjKB5FY5RHMNzuUVYO9xg.OcUuv5wbRTPjxYHZEbiUSIasDou',
//           created_at: new Date('2016-06-29 14:26:16 UTC'),
//           updated_at: new Date('2016-06-29 14:26:16 UTC')
//         }];
//
//         for (let i = 0; i < expected.length; i++) {
//           assert.deepEqual(
//             actual[i],
//             expected[i],
//             `Row id=${i + 1} not the same`
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
//   test('podcasts rows', (done) => {
//     knex('podcasts').orderBy('id', 'ASC')
//       .then((actual) => {
//         const expected = [{
//           id: 1,
//           artist_id: 1134742667,
//           collection_id: 948976028,
//           track_id: 948976028,
//           artist_name: "Stories Podcast / Wondery",
//           collection_name: "Stories Podcast - A Free Children's Story Podcast for Bedtime, Car Rides, and Kids of All Ages!",
//           artist_view_url: "https://itunes.apple.com/us/artist/wondery/id1134742667?mt=2&uo=4",
//           collection_view_url: "https://itunes.apple.com/us/podcast/stories-podcast-free-childrens-story-podcast-for-bedtime/id948976028?mt=2&uo=4",
//           feed_url: "http://rss.art19.com/stories-podcast",
//           track_view_url: "https://itunes.apple.com/us/podcast/stories-podcast-free-childrens-story-podcast-for-bedtime/id948976028?mt=2&uo=4",
//           artwork_url_60: "http://is1.mzstatic.com/image/thumb/Music62/v4/ce/22/03/ce220318-10da-b927-16fb-ab5479045e1b/source/60x60bb.jpg",
//           release_date: "2017-06-14T21:51:00Z",
//           artwork_url_600: "http://is1.mzstatic.com/image/thumb/Music62/v4/ce/22/03/ce220318-10da-b927-16fb-ab5479045e1b/source/600x600bb.jpg",
//           genre_ids: [
//             "1305",
//             "26",
//             "1301",
//             "1304"
//           ],
//           genres: [
//             "Kids & Family",
//             "Podcasts",
//             "Arts",
//             "Education"
//           ],
//           created_at: new Date('2016-06-29 14:26:16 UTC'),
//           updated_at: new Date('2016-06-29 14:26:16 UTC')
//         }, {
//           id: 2,
//           artist_id: 135082710,
//           collection_id: 555384933,
//           track_id: 555384933,
//           artist_name: "Roadshow by CNET",
//           collection_name: "On Cars (HD)",
//           artist_view_url: "https://itunes.apple.com/us/artist/cnet-com/id135082710?mt=2&uo=4",
//           collection_view_url: "https://itunes.apple.com/us/podcast/on-cars-hd/id555384933?mt=2&uo=4",
//           feed_url: "http://feed.cnet.com/feed/podcast/cnet-on-cars/hd.xml",
//           track_view_url: "https://itunes.apple.com/us/podcast/on-cars-hd/id555384933?mt=2&uo=4",
//           artwork_url_60: "http://is1.mzstatic.com/image/thumb/Music111/v4/30/65/c2/3065c294-252c-bd78-36f4-31659eb2af15/source/60x60bb.jpg",
//           release_date: "2017-03-28T23:33:00Z",
//           artwork_url_600: "http://is1.mzstatic.com/image/thumb/Music111/v4/30/65/c2/3065c294-252c-bd78-36f4-31659eb2af15/source/600x600bb.jpg",
//           genre_ids: [
//             "1446",
//             "26",
//             "1318"
//           ],
//           genres: [
//             "Gadgets",
//             "Podcasts",
//             "Technology"
//           ],
//           created_at: new Date('2016-06-29 14:26:16 UTC'),
//           updated_at: new Date('2016-06-29 14:26:16 UTC')
//         }];
//
//         for (let i = 0; i < expected.length; i++) {
//           assert.deepEqual(
//             actual[i],
//             expected[i],
//             `Row id=${i + 1} not the same`
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
//   test('shared rows', (done) => {
//     knex('shared').orderBy('id', 'ASC')
//       .then((actual) => {
//         const expected = [{
//           id: 1,
//           user_id_from: 1,
//           user_id_to: 2,
//           podcast_id:1,
//           comments: "hey I think you'd really like this podcast",
//           created_at: new Date('2016-06-29 14:26:16 UTC'),
//           updated_at: new Date('2016-06-29 14:26:16 UTC')
//         },{
//           id: 2,
//           user_id_from: 3,
//           user_id_to: 2,
//           podcast_id:2,
//           comments: "hey, i\'m the dummy, I think you'd really like this podcast",
//           created_at: new Date('2016-06-29 14:26:16 UTC'),
//           updated_at: new Date('2016-06-29 14:26:16 UTC')
//         }, {
//           id: 3,
//           user_id_from: 3,
//           user_id_to: 1,
//           podcast_id:2,
//           comments: "hey i\'m a dummy, I think you'd really like this podcast",
//           created_at: new Date('2016-06-29 14:26:16 UTC'),
//           updated_at: new Date('2016-06-29 14:26:16 UTC')
//         }];
//
//         for (let i = 0; i < expected.length; i++) {
//           assert.deepEqual(
//             actual[i],
//             expected[i],
//             `Row id=${i + 1} not the same`
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
//   test('favorites rows', (done) => {
//     knex('favorites').orderBy('id', 'ASC')
//       .then((actual) => {
//         const expected = [{
//           id: 1,
//           user_id: 1,
//           user_id_shared: 2,
//           podcast_id: 1,
//           created_at: new Date('2016-06-29 14:26:16 UTC'),
//           updated_at: new Date('2016-06-29 14:26:16 UTC')
//         }, {
//           id: 2,
//           user_id: 3,
//           user_id_shared: 2,
//           podcast_id: 2,
//           created_at: new Date('2016-06-29 14:26:16 UTC'),
//           updated_at: new Date('2016-06-29 14:26:16 UTC')
//         }, {
//           id: 3,
//           user_id: 3,
//           user_id_shared: 1,
//           podcast_id: 2,
//           created_at: new Date('2016-06-29 14:26:16 UTC'),
//           updated_at: new Date('2016-06-29 14:26:16 UTC')
//         }];
//
//         for (let i = 0; i < expected.length; i++) {
//           assert.deepEqual(
//             actual[i],
//             expected[i],
//             `Row id=${i + 1} not the same`
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
