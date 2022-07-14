const NewsBot = require('./newsBot');
require('dotenv').config();

const env = process.env;

describe('proof NewsBot correct behaviour', () => {
  let newsBot;

  beforeAll(() => {
    newsBot = new NewsBot(env.TOKEN);
  });
  test('Proof if the News is Sent Correctly', () => {
    response = newsBot.sendNew(
        process.env.BLECKIN_CHANNEL_ID,
        'https://es.cointelegraph.com/news/seven-cybersecurity-tips-to-keep-us-protected',
        'Este es el título',
        'Esta es la descripción');
    console.log(response);
  });
});
