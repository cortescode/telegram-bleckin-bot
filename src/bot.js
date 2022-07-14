const request = require('request');
require('dotenv').config();


/**
* Adds two numbers together.
* @param {string} token The first number.
* @param {int} num2 The second number.
*/
class Bot {
  /**
  * Create Telegram Bot with basic configuration.
  * @param {string} token The bot Token
  */
  constructor(token) {
    this.token = token;
    this.api = 'https://api.telegram.org/bot';
  }

  /**
  * Send a error to the Channel Error
  * @param {string} errorMessage To be sent
  */
  sendError(errorMessage) {
    const message = `*An error has occurred while fetching the new Image*
${errorMessage}`;

    const form = {
      'chat_id': process.env.BLECKIN_ERRORS_CHAT_ID,
      'text': message,
      'parse_mode': 'Markdown',
      'allow_sending_without_reply': true,
    };
    this.requestApi('sendMessage', form);
  }

  /**
  * Send a photo with or without message to a determined channel.
  * @param {int} chatId Where the message will be sent
  * @param {string} imgUrl To be sent
  * @param {string} message To send with the image
  * @return {request}
  */
  async sendPhoto(chatId, imgUrl, message) {
    const form = {
      'chat_id': chatId,
      'photo': imgUrl,
      'caption': message,
      'parse_mode': 'Markdown',
      'allow_sending_without_reply': true,
    };
    return await this.requestApi('sendPhoto', form);
  }

  /**
  * Send a photo with or without message to a determined channel.
  * @param {string} action The action to be executed
  * @param {Json} form Needed data for the action and the request
  * @return {Promise} Return a promise with the result
  */
  requestApi(action, form) {
    const url = this.api+this.token+'/'+action;
    console.log('url: ' + url);

    const options = {
      method: 'POST',
      form: form,
      json: true,
      headers: {
        'content-type': 'application/json',
      },
    };
    return new Promise((resolve, reject) => {
      request(url, options, (error, response, body) => {
        if (error || body.ok == false) {
          this.sendError(error.message);
          this.sendError(body.description);
          reject(body);
        } else {
          resolve(body);
        }
      });
    });
  }
};

module.exports = Bot;

