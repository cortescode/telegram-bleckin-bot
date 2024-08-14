import { request } from 'request';
const htmlParser = require('node-html-parser');
require('dotenv').config;

const telegramBot = require('./telegramBot');


/**
 * NewsBot wich extends from Bot
*/
class NewsBot extends telegramBot {
	/**
	 * Init the bot
	 * @param {string} token The token to define the bot
	*/
	constructor(token) {
		super(token);
	}

	/**
	 * Send A New to The Channel
	 * @param {int} chatId The id of the chat where the photo will be sent
	 * @param {string} url The New Url from where we will get the image
	 * @param {string} title The New Title
	 * @param {string} description The New Description
	 * @return {ReturnType} The result of the request
	*/
	async sendNew(chatId, url, title, description) {

		let img;
		let srcImg;
		let message;

		if (description.includes('Leer más')) {
			let _description = description.replace('Leer más', `[Leer más](${url})`);

			message =`
*${title}*
 
${_description}
 
[Bleckin News Channel](https://t.me/bleckin)
`;
		} else {
			message =
				`
*${title}*
 
${description}
 
[Leer más](${url})
 
[Bleckin News Channel](https://t.me/bleckin)
`;
		}

		const req = new Promise((resolve, reject) => {
			request(url, { method: 'GET' }, async (error, response, body) => {
				if (error) {
					await this.sendError(`Error getting url in ${url}`);
					return;
				}

				const parsedBody = htmlParser.parse(body);

				if (url.search('criptonoticias') != -1) {
					img = parsedBody.querySelector('.wp-post-image')
						.querySelector('img');
					srcImg = img.getAttribute('data-lazy-src');
					resolve();
				} else if (url.search('cointelegraph') != -1) {
					img = parsedBody.querySelector('.post-cover picture')
						.querySelector('img');
					srcImg = img.getAttribute('data-cfsrc');
					resolve();
				} else {
					await this.sendError(`Url not recognized in ${url}`);
					reject();
				}
			});
		});

		return req.then(async () => {
			return await this.sendPhoto(chatId, srcImg, message);
		});

	}
}

module.exports = NewsBot;
