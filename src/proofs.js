const Bot = require('./bot');
require('dotenv').config();

const env = process.env;

const bot = new Bot(env.TOKEN);

const form = {
  channel: env.BLECKIN_CHANNEL_ID,
};

bot.requestApi('getUpdates', form);

