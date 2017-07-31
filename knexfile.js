// Update with your config settings.

module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/slack_dev'
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
