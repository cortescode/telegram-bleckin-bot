const { describe, it } = require("../testing")
const { NewsReader, NewsReaderConfig } = require("../../src/news-reader/newsReader")
const assert = require("assert")


const test_news = {
    "cointelegraph": "https://cointelegraph.com/news/robinhood-24-hour-trade-suspend-8-hours?utm_source=rss_feed&utm_medium=rss&utm_campaign=rss_partner_inbound",
    "bitcoinmagazine": "https://bitcoinmagazine.com/.rss/full/",
    "coindesk": "https://www.coindesk.com/arc/outboundfeeds/rss/"
}



describe("News Reader test", () => {

    it("Obtains new", async () => {
        const config = new NewsReaderConfig(
            ".m-detail-header--title",
            ".m-detail-header--dek",
            ".m-detail--body"
        )

        let newsReader = new NewsReader(config)

        let newUrl = "https://bitcoinmagazine.com/business/semler-scientific-buys-another-6-million-worth-of-bitcoin"
        let _new = await newsReader.readNew(newUrl)

        assert.notEqual(_new, null)

    })

    it("Obtains title from new", async () => {
        const config = new NewsReaderConfig(
            ".m-detail-header--title",
            ".m-detail-header--dek",
            ".m-detail--body"
        )

        let newsReader = new NewsReader(config)

        let newUrl = "https://bitcoinmagazine.com/business/semler-scientific-buys-another-6-million-worth-of-bitcoin"
        let _new = await newsReader.readNew(newUrl)

        assert.notEqual(_new, null)
        assert.notEqual(_new.title, null)
    })

    it("Obtains description from new", async () => {

        const config = new NewsReaderConfig(
            ".m-detail-header--title",
            ".m-detail-header--dek",
            ".m-detail--body"
        )

        let newsReader = new NewsReader(config)

        let newUrl = "https://bitcoinmagazine.com/business/semler-scientific-buys-another-6-million-worth-of-bitcoin"
        let _new = await newsReader.readNew(newUrl)

        assert.notEqual(_new, null)
        assert.notEqual(_new.description, null)
    })

    it("Obtains new full text content", async () => {
        
        const config = new NewsReaderConfig(
            ".m-detail-header--title",
            ".m-detail-header--dek",
            ".m-detail--body"
        )

        let newsReader = new NewsReader(config)

        let newUrl = "https://bitcoinmagazine.com/business/semler-scientific-buys-another-6-million-worth-of-bitcoin"
        let _new = await newsReader.readNew(newUrl)

        assert.notEqual(_new, null)
        assert.notEqual(_new.textContent, null)
    })
})