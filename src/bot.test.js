const Bot = require('./bot');
require('dotenv').config();

const env = process.env;

describe('proof bot correct behaviour', () => {
  let bot;

  beforeAll(() => {
    // Arrange
    bot = new Bot(env.TOKEN);
  });

  test('Message Sent with success', () => {
    // Arrange
    // Act
    bot.sendMessage();
    // Assert
  });

  test('Send Error Message on error', () => {

  });

  test('Check Request API Correct Functioning', () => {

  });
});
