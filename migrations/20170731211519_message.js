exports.up = knex => knex.schema.createTable('message', (table) => {
  table.increments('id').primary();
  table.integer('user_map_id')
    .notNullable()
    .references('id')
    .inTable('user_map')
    .onDelete('CASCADE')
    .index();
  table.integer('channel_map_id')
    .notNullable()
    .references('id')
    .inTable('channel_map')
    .onDelete('CASCADE')
    .index();
  table.string('raw_ts', 20).notNullable();
  table.dateTime('message_timestamp').notNullable();
  table.text('message').notNullable().defaultTo('');
});

exports.down = knex => knex.schema.dropTable('message');
