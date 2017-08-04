exports.seed = knex => knex('user_map').del()
  .then(() => knex('user_map').insert([
    {
      id: 1,
      user_id: 'U1111111',
      user_name: '@gillyhopkins',
    },
    {
      id: 2,
      user_id: 'U2222222',
      user_name: '@bojangles',
    },
    {
      id: 3,
      user_id: 'U3333333',
      user_name: '@colonelforbin',
    },
    {
      id: 4,
      user_id: 'U6FMJ3J3Z',
      user_name: '@dave.gallup',
    },
  ]))
  .then(function(){
        return knex.raw(`SELECT setval('user_map_id_seq', (SELECT MAX(id) FROM user_map))`)
  });
