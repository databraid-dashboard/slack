exports.up = knex => knex.schema.createTable('user_map', (table) => {
  table.increments('id').primary();
  table.string('user_id').notNullable().unique();
  table.string('user_name', 255).notNullable();
});

exports.down = knex => knex.schema.dropTable('user_map');
