const knex  = require('../knex.js');

class EventRepository{

  retrieveUserKey(userId){
    return knex('user_map').select('id').where('user_id', userId);
  }


  writeMessage(userId, text, date, channelId){

    if(userId && text && date && channelId){

      return knex.raw(`INSERT INTO message
        (user_map_id, channel_map_id, message_timestamp, message)
        VALUES (
          (select id from user_map where user_id = '${userId}'),
          (select id from channel_map where channel_id = '${channelId}'),
          CURRENT_TIMESTAMP,
          '${text}'
        ) RETURNING *;`);

    }
  }



}

module.exports=EventRepository;