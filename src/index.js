const NewsBot = require('./newsBot');
require('dotenv').config;

const newsBot = new NewsBot(env.TOKEN);

exports.handler = async (event) => {
  newsBot.sendPhotoWithText(
      process.env.CHAT_ID,
      event.link,
      event.title,
      event.description);


  // TODO implement
  const response = {
    statusCode: 200,
    body: JSON.stringify('Hello from Lambda!'),
    title: event.title,
    description: event.description,
    link: event.link,
  };
  return response;
};
