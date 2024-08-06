const { NewsReaderConfig } = require("./news-reader/newsReader");

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