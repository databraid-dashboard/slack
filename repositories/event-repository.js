const knex  = require('../knex.js');

class EventRepository{

  retrieveUserKey(userId){
    return knex('user_map').select('id').where('user_id', userId);
  }


  writeMessage(userId, text, rawTS, channelId){

    if(userId && text && rawTS && channelId){

      return knex.raw(`INSERT INTO message
        (user_map_id, channel_map_id, raw_ts, message_timestamp, message)
        VALUES (
          (select id from user_map where user_id = '${userId}'),
          (select id from channel_map where channel_id = '${channelId}'),
          ${rawTS},
          CURRENT_TIMESTAMP,
          '${text}'
        ) RETURNING *;`);

    }
  }



}

module.exports=EventRepository;