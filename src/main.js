const { NewsReader, NewsReaderConfig } = require("./newsManager/newsReader");
const { RRSReader } = require('./newsManager/rssReader');
const { Luke } = require('./aiAgents/luke');
const TelegramBot = require('./bots/telegramBot');

require('dotenv').config();


const telegram_bot_token = process.env.TELEGRAM_BLECKIN_BOT_TOKEN
const telegram_chat_id = process.env.TELEGRAM_BLECKIN_CHAT_ID

let bot = new TelegramBot(telegram_bot_token)


const feeds = {
    "bitcoinmagazine": {
        rss_url: "https://bitcoinmagazine.com/.rss/full/",
        config: new NewsReaderConfig(
            ".m-detail-header--title",
            ".m-detail-header--dek",
            ".m-detail--body"
        )
    },
    "coindesk": {
        rss_url: "https://www.coindesk.com/arc/outboundfeeds/rss/",
        config: new NewsReaderConfig(
            ".at-headline",
            ".at-subheadline",
            ".at-content-wrapper"
        )
    }
}

const MAX_RSS_ITEMS = 10


async function obtainNews() {
    let newsList = []
    
    for(const [key, value] of Object.entries(feeds)) {

        let rssReader = new RRSReader(value["rss_url"])
        
        let rssItems = await rssReader.readFeed()
        rssItems = rssItems.slice(0, MAX_RSS_ITEMS)

        console.log(rssItems)
        
        let newReader = new NewsReader(value["news_config"])

        for(let rssItem of rssItems) {
            console.log("item to read")
            console.log(rssItem)
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

    let luke = new Luke()

    let newsResume = await luke.selectMostRelevantNews(newsList)

    console.log(newsResume)

    bot.sendMessage(telegram_chat_id, newsResume)

}


scheduledNews()


module.exports = { scheduledNews }

