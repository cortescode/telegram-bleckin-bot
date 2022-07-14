const NewsBot = require('./newsBot');
require('dotenv').config();

const env = process.env;

describe('proof NewsBot correct behaviour', () => {
  let newsBot;

  beforeAll(() => {
    newsBot = new NewsBot(env.TOKEN);
  });

  it('Proof if the request get Resolved', () => {
    const req = newsBot.sendNew(
        process.env.BLECKIN_CHANNEL_ID,
        'https://es.cointelegraph.com/news/seven-cybersecurity-tips-to-keep-us-protected',
        'Este es el título',
        'Esta es la descripción');
    expect(req).resolves.toEqual(true);
  });

  it('Proof if the News is Sent Correctly', () => {
    let response;
    newsBot.sendNew(
        process.env.BLECKIN_CHANNEL_ID,
        'https://es.cointelegraph.com/news/seven-cybersecurity-tips-to-keep-us-protected',
        'Este es el título',
        'Esta es la descripción').then((res) => {
      response = res;
      expect(response.ok).toBe(true);
    }).catch(console.log);
  });
});
