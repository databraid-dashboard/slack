exports.up = knex => knex.schema.createTable('sentiment_score', (table) => {
  table.increments('id').primary();
  table.string('channel_map_id')
    .notNullable()
    .references('channel_id')
    .inTable('channel_map')
    .onDelete('CASCADE')
    .index();
  table.decimal('score', 3, 2).notNullable();
  table.float('magnitude').notNullable();
  table.integer('number_of_messages').notNullable();
  table.timestamps(true, true);
});

exports.down = knex => knex.schema.dropTable('sentiment_score');
