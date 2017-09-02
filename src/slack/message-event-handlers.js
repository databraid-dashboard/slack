const { writeMessage, buildWidgetMessage } = require('../../repositories/event-repository');
const { analyzeSentimentAndSaveScore } = require('../sentiment');

function handleNewMessageEvent(io, req) {
  const { user, text, ts, channel } = req.body.event;

  return writeMessage(user, text, ts, channel)
    .then(result => buildWidgetMessage(result[0]))
    .then((message) => {
      const { channelId, channelName, messageId } = message;

      const newMessage = {};
      newMessage[channelName] = {}; // Slack's channel ID as key
      newMessage[channelName][messageId] = {}; // Our message ID as key
      newMessage[channelName][messageId].avatarImage = message.image24;
      newMessage[channelName][messageId].userId = message.userId;
      newMessage[channelName][messageId].name = message.userName;
      newMessage[channelName][messageId].text = message.message;
      newMessage[channelName][messageId].timestamp = message.messageTimestamp;
      newMessage[channelName][messageId].channelId = channelId;

      io.sockets.emit('messages', newMessage);

      analyzeSentimentAndSaveScore(io, channelId);
    });
}

module.exports = { handleNewMessageEvent };