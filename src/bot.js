const request = require('request');
require('dotenv').config();


/**
* 
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
	async sendError(errorMessage) {
		const message = `*An error has occurred while fetching the new Image*
${errorMessage}`;

		const form = {
			'chat_id': process.env.BLECKIN_ERRORS_CHAT_ID,
			'text': message,
			'parse_mode': 'Markdown',
			'allow_sending_without_reply': true,
		};
		return await this.requestApi('sendMessage', form);
	}

	/**
	* Send a message to a determined chat.
	* @param {int} chatId Where the message will be sent
	* @param {string} message To send with the image
	* @return {request}
	*/
	async sendMessage(chatId, message) {
		const form = {
			'chat_id': chatId,
			'text': message,
			'parse_mode': 'Markdown',
			'allow_sending_without_reply': true,
		};

		return await this.requestApi('sendMessage', form);
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
	* Manage the requests to the telegram api
	* @param {string} action The action to be executed
	* @param {Json} form Needed data for the action and the request
	* @return {Promise} Return a promise with the result
	*/
	requestApi(action, form) {
		return new Promise((resolve, reject) => {
			const url = this.api + this.token + '/' + action;

			const options = {
				method: 'POST',
				form: form,
				json: true,
				headers: {
					'content-type': 'application/json',
				},
			};

			request(url, options, async (error, response, body) => {
				if (error) {
					await this.sendError(error.message);
				} else if (body.ok == false) {
					await this.sendError(body.description);
				} else {
					resolve(body);
				}
			});
		});
	}

}

module.exports = Bot;

