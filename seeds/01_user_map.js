exports.seed = knex => knex('user_map').del()
  .then(() => knex('user_map').insert([
    {
      id: 1,
      user_id: 324968,
      user_name: '@gillyhopkins',
    },
    {
      id: 2,
      user_id: 986514,
      user_name: '@bojangles',
    },
    {
      id: 3,
      user_id: 548310,
      user_name: '@colonelforbin',
    },
  ]));
