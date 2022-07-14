const NewsBot = require('./newsBot');
require('dotenv').config;

const newsBot = new NewsBot(env.TOKEN);

exports.handler = async (event) => {
  newsBot.sendNew(
      process.env.CHAT_ID,
      event.link,
      event.title,
      event.description)
      .then((res) => {
        return res;
      })
      .catch((res) => {
        return res;
      });
};
