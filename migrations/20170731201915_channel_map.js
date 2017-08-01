'use strict';

exports.up = function(knex) {
  return knex.schema.createTable('channel_map', (table) => {
    table.increments('id').primary();
    table.integer('channel_id').notNullable();
    table.string('channel_name', 255).notNullable();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('channel_map');
};
