const knex = require('../knex');
const rp = require('request-promise');

function getUsers() {
  return knex('users');
}

function getUserData(slackUserId) {
  return knex('users')
    .where('user_id', slackUserId)
    .select('user_name');
}

function addUserDataFromSlack(slackUserId, token) {
  const options = {
    method: 'GET',
    uri: 'https://slack.com/api/users.info',
    qs: { user: slackUserId, token },
    json: true,
  };
  return rp(options).then(data => knex('users').insert({
    user_id: slackUserId,
    user_name: data.user.name,
    real_name: data.user.real_name,
    first_name: data.user.profile.first_name,
    last_name: data.user.profile.last_name,
    status_emoji: data.user.profile.status_emoji || '',
    image_24: data.user.profile.image_24,
    image_512: data.user.profile.image_512,
  }));
}

function updateUser(slackUserId, userDetails) {
  return knex('users')
    .update(userDetails)
    .where('user_id', slackUserId)
    .catch(err => err);
}

module.exports = { getUsers,
  getUserData,
  addUserDataFromSlack,
  updateUser };
