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
  sendNew(chatId, url, title, description) {
    const message =
`
*${title}*
 
${description}
 
[Clicka aquí para ver la noticia completa](https://www.criptonoticias.com/wp-content/uploads/2022/07/venezuela-3er-pais-mayor-porcentaje-usuarios-bitcoin-1140x570.jpg)
`;

    return request(url, {method: 'GET'}, (error, response, body)=> {
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
        console.error('Url not recognized');
      }

      this.sendPhoto(chatId, srcImg, message);
    });
  };
}

const bot = new NewsBot('5220335725:AAFs2mS4bUKfS0NMpB6nOHWAf77mvc83n2o');

bot.sendNew(
    process.env.BLECKIN_CHANNEL_ID,
    'https://www.criptonoticias.com/finanzas/abre-primera-tienda-comprar-bitcoin-paraguay/',
    'Este es el título',
    'Esta es la descripción');

bot.sendNew(
    process.env.BLECKIN_CHANNEL_ID,
    'https://es.cointelegraph.com/news/seven-cybersecurity-tips-to-keep-us-protected',
    'Este es el título',
    'Esta es la descripción');


module.exports = NewsBot;
