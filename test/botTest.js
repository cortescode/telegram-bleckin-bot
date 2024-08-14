const telegramBot = require("../src/bots/telegramBot")
require('dotenv').config();


const telegram_bot_token = process.env.TELEGRAM_BLECKIN_BOT_TOKEN
const telegram_chat_id = process.env.TELEGRAM_BLECKIN_CHAT_ID


const bot = new telegramBot(telegram_bot_token)

const sendMessage = async () => {
    const result = await bot.sendMessage(telegram_chat_id, "Hello guys")
    
    console.log("Result: ", result)
}

sendMessage()