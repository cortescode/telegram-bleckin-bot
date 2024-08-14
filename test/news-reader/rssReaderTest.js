const { RRSReader, RRSItem } = require("../../src/newsManager/rssReader")
const assert = require("assert")


const test_feeds = {
    "cointelegraph": "https://cointelegraph.com/rss",
    "bitcoinmagazine": "https://bitcoinmagazine.com/.rss/full/",
    "coindesk": "https://www.coindesk.com/arc/outboundfeeds/rss/"
}

const reader = new RRSReader(test_feeds["cointelegraph"])

reader.readFeed().then((items) => {

    assert.ok(items.length > 1, "Feed should have more than 1 item")

    let item = items[0]

    assert.ok(item instanceof RRSItem, "Items must be of class RSSItem")

    assert.ok(item.hasOwnProperty("title"), "Item must have a 'title' property")
    assert.ok(typeof item.title == "string", "Item 'title' property must be an string")

    assert.ok(item.hasOwnProperty("description"), "Item must have a 'description' property")
    assert.ok(typeof item.description == "string", "Item 'description' property must be an string")

    assert.ok(item.hasOwnProperty("url"), "Item must have a 'url' property")
    assert.ok(typeof item.url == "string", "Item 'url' property must be an string")

})