exports.up = knex => knex.schema.createTable('channel_map', (table) => {
  table.string('id', 255).primary();
  table.string('name', 255);
});

exports.down = knex => knex.schema.dropTable('channel_map');
