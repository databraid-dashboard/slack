exports.up = knex => knex.schema.createTable('sentiment_score', (table) => {
  table.increments('id').primary();
  table.integer('channel_id')
    .notNullable()
    .references('id')
    .inTable('channel_map')
    .onDelete('CASCADE')
    .index();
  table.decimal('score', 3, 2).notNullable();
  table.float('magnitude').notNullable();
  table.integer('number_of_messages').notNullable();
  table.timestamps(true, true);
});

exports.down = knex => knex.schema.dropTable('sentiment_score');
