module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/slack_dev',
  },

  docker_dev: {
    client: 'postgresql',
    connection: {
      database: 'postgres',
      user: 'postgres',
      host: 'postgres',
    },
  },

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
};
