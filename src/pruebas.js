const request = require('request');
const Bot = require('./bot');
require('dotenv').config();

const message =
`
*Titulo*
 
Descripción
 
[Clicka aquí para ver la noticia completa](https://www.criptonoticias.com/wp-content/uploads/2022/07/venezuela-3er-pais-mayor-porcentaje-usuarios-bitcoin-1140x570.jpg)
`;

const _form = {
  'chat_id': process.env.BLECKIN_CHANNEL_ID,
  'photo': 'https://www.criptonoticias.com/wp-content/uploads/2022/07/venezuela-3er-pais-mayor-porcentaje-usuarios-bitcoin-1140x570.jpg',
  'caption': message,
  'parse_mode': 'Markdown',
  'allow_sending_without_reply': true,
};

const options = {
  method: 'POST',
  form: _form,
  json: true,
  headers: {
    'content-type': 'application/json',
  },
};

const url = 'https://api.telegram.org/bot5220335725:AAFs2mS4bUKfS0NMpB6nOHWAf77mvc83n2o/sendPhoto';

request(
    url,
    options,
    (err, body, res) => console.log(res));

const bot = new Bot(process.env.TOKEN);
bot.sendPhoto(process.env.TOKEN, 'https://www.criptonoticias.com/wp-content/uploads/2022/07/venezuela-3er-pais-mayor-porcentaje-usuarios-bitcoin-1140x570.jpg', 'message');
