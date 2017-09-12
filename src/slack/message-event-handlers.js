const { writeMessage, buildWidgetMessage } = require('../../repositories/event-repository');
const { updateMessage, deleteMessage } = require('../../repositories/message-repository');
const { updateUser } = require('../../repositories/user-repository');
const { analyzeSentimentAndSaveScore } = require('./sentiment-event-handlers');

function handleNewMessageEvent(io, req) {
  const { user, text, ts, channel } = req.body.event;

  return writeMessage(user, text, ts, channel)
    .then(result => buildWidgetMessage(result[0]))
    .then((message) => {
      const { channelId, channelName, messageId } = message;

      const newMessage = {};
      newMessage[channelName] = {}; // Slack's channel name as key
      newMessage[channelName][messageId] = {}; // Our message ID as key
      newMessage[channelName][messageId].avatarImage = message.image24;
      newMessage[channelName][messageId].userId = message.userId;
      newMessage[channelName][messageId].name = message.realName;
      newMessage[channelName][messageId].userName = message.userName;
      newMessage[channelName][messageId].text = message.message;
      newMessage[channelName][messageId].timestamp = message.messageTimestamp;
      newMessage[channelName][messageId].channelId = channelId;

      io.sockets.emit('messages', newMessage);

      analyzeSentimentAndSaveScore(io, channelId);
    });
}

function handleEditMessageEvent(req) {
  const { channel, message } = req.body.event;

  return updateMessage(channel, message);
}

function handleDeleteMessageEvent(req) {
  const { channel, deleted_ts } = req.body.event;

  return deleteMessage(channel, deleted_ts);
}

function handleEditUserEvent(req) {
  const { user } = req.body.event;

  const userId = user.id;
  const userDetails = {
    user_name: user.name,
    real_name: user.real_name,
    first_name: user.profile.first_name,
    last_name: user.profile.last_name,
    status_emoji: user.profile.status_emoji,
    image_24: user.profile.image_24,
    image_512: user.profile.image_512,
  };

  return updateUser(userId, userDetails);
}

module.exports = { handleNewMessageEvent,
  handleEditMessageEvent,
  handleDeleteMessageEvent,
  handleEditUserEvent };
