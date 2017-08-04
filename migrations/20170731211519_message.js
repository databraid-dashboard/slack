exports.up = knex => knex.schema.createTable('message', (table) => {
  table.increments('id').primary();
  table.string('user_map_id')
    .notNullable()
    .references('user_id')
    .inTable('user_map')
    .onDelete('CASCADE')
    .index();
  table.string('channel_map_id')
    .notNullable()
    .references('channel_id')
    .inTable('channel_map')
    .onDelete('CASCADE')
    .index();
  table.dateTime('message_timestamp').notNullable();
  table.text('message').notNullable().defaultTo('');
});

exports.down = knex => knex.schema.dropTable('message');
