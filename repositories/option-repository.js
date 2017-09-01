const knex = require('../knex.js');

function readOption(optionName) {
  return knex('options')
    .where({ option_name: optionName });
}

function updateOption(optionName, optionValue) {
  return knex('options')
    .where({ option_name: optionName })
    .update({ option_value: optionValue });
}

module.exports = { readOption, updateOption };
