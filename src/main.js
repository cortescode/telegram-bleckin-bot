const { NewsReader, NewsReaderConfig } = require("./newsManager/newsReader");
const { RSSReader } = require('./newsManager/rssReader');
const { Luke } = require('./aiAgents/luke');
const TelegramBot = require('./bots/telegramBot');

require('dotenv').config();


const telegram_bot_token = process.env.TELEGRAM_BLECKIN_BOT_TOKEN
const telegram_chat_id = process.env.TELEGRAM_BLECKIN_CHAT_ID


const luke = new Luke()
const bot = new TelegramBot(telegram_bot_token)


const feeds = {
    "bitcoinmagazine": {
        rss_reader: new RSSReader("https://bitcoinmagazine.com/.rss/full/"),
        config: new NewsReaderConfig(
            ".m-detail-header--title",
            ".m-detail-header--dek",
            ".m-detail--body",
            ".m-detail-header--picture picture img"
        )
    },
    "coindesk": {
        rss_reader: new RSSReader("https://www.coindesk.com/arc/outboundfeeds/rss/"),
        config: new NewsReaderConfig(
            ".at-headline",
            ".at-subheadline",
            ".at-content-wrapper",
            ".media picture img"
        )
    }
}


const MAX_RSS_ITEMS = 10


async function obtainNews() {
    let newsList = []
    
    for(const [key, value] of Object.entries(feeds)) {
        
        let rssReader = value["rss_reader"]
        
        let rssItems = await rssReader.readFeed()
        rssItems = rssItems.slice(0, MAX_RSS_ITEMS)
        
        let newReader = new NewsReader(value["news_config"])

        for(let rssItem of rssItems) {
            
            let readed_new = await newReader.readNew(rssItem.url)

            if(readed_new)
                newsList.push(readed_new)
        }
    }

    return newsList
}



// Function to be executed every 3 hours
async function scheduledNews() {
    console.log('Executing scheduled task...');
    // Add your task logic here

    let newsList = await obtainNews()

    let newsResume = await luke.selectMostRelevantNews(newsList)

    console.log(newsResume)

    bot.sendMessage(telegram_chat_id, newsResume)

}


scheduledNews()


module.exports = { scheduledNews }

