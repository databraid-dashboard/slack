exports.up = knex => knex.schema.createTable('user_map', (table) => {
  table.string('id', 255).primary();
  table.string('name', 255).notNullable();
  table.string('real_name', 255);
  table.string('first_name', 255);
  table.string('last_name', 255);
  table.string('status_emoji', 255);
  table.string('image_24', 255);
  table.string('image_512', 255);
});

exports.down = knex => knex.schema.dropTable('user_map');
