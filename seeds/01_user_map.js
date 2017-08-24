exports.seed = knex =>
  knex('user_map')
    .del()
    .then(() =>
      knex('user_map').insert([
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
      ]),
    )
    .then(() => knex.raw("SELECT setval('user_map_id_seq', (SELECT MAX(id) FROM user_map))"));
