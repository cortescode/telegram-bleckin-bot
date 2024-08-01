const { RRSReader } = require("../../src/news-reader/rssReader")



const test_feeds = {
    "cointelegraph": "https://cointelegraph.com/rss",
    "bitcoinmagazine": "https://bitcoinmagazine.com/.rss/full/",
    "coindesk": "https://www.coindesk.com/arc/outboundfeeds/rss/"
}

const reader = new RRSReader(test_feeds["cointelegraph"])

reader.readFeed().then((items) => {

    console.log("Items: ", items)
    items.forEach(item => {
        console.log(item.toString())
    });
})