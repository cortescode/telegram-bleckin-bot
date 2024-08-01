const NewsBot = require('./src/newsBot');
require('dotenv').config;


exports.handler = async (event) => {

  const newsBot = new NewsBot(process.env.TOKEN);
  
  return await newsBot.sendNew(
      process.env.BLECKIN_CHANNEL_ID,
      event.link,
      event.title,
      event.description);
};
