const knex = require('../knex');
const rp = require('request-promise');

function getUsersData() {
  return knex('user_map').select('user_name');
}

function getUserData(slackUserId) {
  return knex('user_map').where('user_id', slackUserId).select('user_name');
}

function fetchUserDataFromSlack(slackUserId, token) {
  const options = {
    method: 'GET',
    uri: 'https://slack.com/api/users.info',
    qs: { user: slackUserId, token },
    json: true,
  };
  rp(options).then(data => knex('user_map').insert({
    user_id: slackUserId,
    user_name: data.user.name,
    // user_real_name: data.user.real_name,
  }, '*'));
}

module.exports = { getUsersData, getUserData, fetchUserDataFromSlack };
