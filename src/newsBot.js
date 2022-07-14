// const _Bot = require('/bot');
// const http = require('http');
const request = require('request');
const htmlParser = require('node-html-parser');
require('dotenv').config;

const Bot = require('./bot');


/**
 * NewsBot wich extends from Bot
*/
class NewsBot extends Bot {
  /**
   * Init the bot
   * @param {string} token The token to define the bot
  */
  constructor(token) {
    super(token);
  };

  /**
   * Send A New to The Channel
   * @param {int} chatId The id of the chat where the photo will be sended
   * @param {string} url The New Url from where we will get the image
   * @param {string} title The New Title
   * @param {string} description The New Description
   * @return {ReturnType} The result of the request
  */
  async sendNew(chatId, url, title, description) {
    const message =
`
*${title}*
 
${description}
 
[Clicka aquí para ver la noticia completa](${url})
`;

    return new Promise((resolve, reject) => {
      request(url, {method: 'GET'}, (error, response, body)=> {
        const parsedBody = htmlParser.parse(body);
        let img;
        let srcImg;

        if (url.search('criptonoticias') != -1) {
          img = parsedBody.querySelector('picture')
              .querySelector('img');
          srcImg = img.getAttribute('data-lazy-src');
        } else if (url.search('cointelegraph') != -1) {
          img = parsedBody.querySelector('.post-cover picture')
              .querySelector('img');
          srcImg = img.getAttribute('data-cfsrc');
        } else {
          this.sendError('Url not recognized');
        }

        this.sendPhoto(chatId, srcImg, message)
            .then((res) => resolve(res))
            .catch((res) => reject(res));
      });
    });
  };
}

const bot = new NewsBot('5220335725:AAFs2mS4bUKfS0NMpB6nOHWAf77mvc83n2o');

bot.sendNew(
    process.env.BLECKIN_CHANNEL_ID,
    'https://www.criptonoticias.com/finanzas/abre-primera-tienda-comprar-bitcoin-paraguay/',
    'Este es el título',
    'Esta es la descripción');

console.log('aqui va lo que devuelve el request');
res = bot.sendNew(
    process.env.BLECKIN_CHANNEL_ID,
    'https://es.cointelegraph.com/news/seven-cybersecurity-tips-to-keep-us-protected',
    'Este es el título',
    'Esta es la descripción').callback;

console.log(res);


module.exports = NewsBot;
