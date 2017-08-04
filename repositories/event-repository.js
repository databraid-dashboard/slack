const knex  = require('../knex.js');

class EventRepository{

  writeMessage(userId, text, date, channelId){

    if(userId && text && date && channelId){

      return knex('message').insert(
        {
          user_map_id      :userId,
          message          :text,
          message_timestamp:date,
          channel_map_id   :channelId
        }
        , '*');
    }
  }


}

module.exports=EventRepository;