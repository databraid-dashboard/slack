exports.seed = knex => knex('user_map').del()
  .then(() => knex('user_map').insert([
    {
      id: 1,
      user_id: '111AGJG876',
      user_name: '@gillyhopkins',
    },
    {
      id: 2,
      user_id: '22298H7GG',
      user_name: '@bojangles',
    },
    {
      id: 3,
      user_id: '333HHD87HG',
      user_name: '@colonelforbin',
    },
  ]));
