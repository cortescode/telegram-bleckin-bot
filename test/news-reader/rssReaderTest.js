const { RSSReader, RSSItem } = require("../../src/newsManager/rssReader")
const assert = require("assert")
const { describe, it } = require("../testing")


const test_feeds = {
    "cointelegraph": "https://cointelegraph.com/rss",
    "bitcoinmagazine": "https://bitcoinmagazine.com/.rss/full/",
    "coindesk": "https://www.coindesk.com/arc/outboundfeeds/rss/"
}


describe("Rss Reader reads and filter already read posts", () => {
    it("RssItem objects created successfully after reading rss feed", async () => {

        const reader = new RSSReader(test_feeds["cointelegraph"])

        let items = await reader.readFeed()

        assert.ok(items.length > 1, "Feed should have more than 1 item")

        let item = items[0]

        assert.ok(item instanceof RSSItem, "Items must be of class RSSItem")

        assert.ok(item.hasOwnProperty("title"), "Item must have a 'title' property")
        assert.ok(typeof item.title == "string", "Item 'title' property must be an string")

        assert.ok(item.hasOwnProperty("description"), "Item must have a 'description' property")
        assert.ok(typeof item.description == "string", "Item 'description' property must be an string")

        assert.ok(item.hasOwnProperty("url"), "Item must have a 'url' property")
        assert.ok(typeof item.url == "string", "Item 'url' property must be an string")

    })

    it("Check old read items are filtered and don't appear in a second execution", async() => {
        const reader = new RSSReader(test_feeds["cointelegraph"])

        let items = await reader.readFeed()
        
        assert.ok(items.length > 1, "Feed should have more than 1 item")
        assert.ok(reader.readItems.length > 1, "Read items are saved")
        assert.ok(reader.readItems.length === items.length, "All items are saved on first call")

        let items2 = await reader.readFeed()

        assert.ok(items2 == 0, "The second time I fetch the same feed it don't return any element")
    })
})
