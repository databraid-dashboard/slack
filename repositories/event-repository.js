const knex  = require('../knex.js');

class EventRepository{

  writeMessage(userId, text, date, channelId){

    if(userId && text && date && channelId){

      return knex('message').insert(
        {
          user_map_id      :'111AGJG876',
          message          :text,
          message_timestamp:new Date(date * 1000),
          channel_map_id   :'CCCC1111'
        }
        , '*');
    }
  }


}

module.exports=EventRepository;