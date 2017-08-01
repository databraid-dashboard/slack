// Update with your config settings.

module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/slack_dev'
  },

  test: {
    client: 'pg',
    connection: 'postgres://localhost/slack_test',
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
  }

  // docker_dev: {
  //   client: 'postgresql',
  //   connection: {
  //     database: 'postgres',
  //     user: 'postgres',
  //     host: 'postgres',
  //   },
  // },

};
