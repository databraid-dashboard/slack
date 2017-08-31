const { writeMessage, buildWidgetMessage } = require('../../repositories/event-repository');
const { analyzeSentimentAndSaveScore } = require('../sentiment');

function handleNewMessageEvent(io, req) {
  const { user, text, ts, channel } = req.body.event;

  return writeMessage(user, text, ts, channel)
    .then(result => buildWidgetMessage(result[0]))
    .then((message) => {
      const { channelId, messageId } = message;

      const newMessage = {};
      newMessage[channelId] = {}; // Slack's channel ID as key
      newMessage[channelId][messageId] = {}; // Our message ID as key
      newMessage[channelId][messageId].avatarImage = message.image24;
      newMessage[channelId][messageId].userId = message.userId;
      newMessage[channelId][messageId].name = message.userName;
      newMessage[channelId][messageId].text = message.message;
      newMessage[channelId][messageId].timestamp = message.messageTimestamp;
      newMessage[channelId][messageId].channelId = channelId;

      io.sockets.emit('messages', newMessage);

      analyzeSentimentAndSaveScore(io, channelId);
    });
}

module.exports = { handleNewMessageEvent };
