'use strict';

module.exports = {
  //TODO: potentially don't need this... ?
  // development: {
  //   client: 'pg',
  //   connection: 'postgres@postgres://postgres/slack_dev'
  // },

  test: {
    client: 'postgresql',
    connection: {
      database: 'slack_test',
      user: 'postgres',
      host: 'postgres',
    },
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
  },

  docker_dev: {
    client: 'postgresql',
    connection: {
      database: 'postgres',
      user: 'postgres',
      host: 'postgres',
    },
  },

};
