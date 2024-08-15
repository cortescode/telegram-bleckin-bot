const https = require("https")
const cheerio = require("cheerio")



class RSSReader {

    readItems = [];

    constructor(feed_url, config) {
        this.feed_url = feed_url
        this.config = config || new RSSReaderConfig()
    }


    readFeed() {
        return new Promise((resolve, reject) => {
            https.get(this.feed_url, (response, error) => {
                
                let data = ""

                // Obtains all data from response
                response.on("data", (chunk) => {
                    data+= chunk
                })
                
                // Once all data is obtained
                response.on("end", () => {
                    try {
                        const $ = cheerio.load(data, { xmlMode: true });
                        let items = $(this.config.item_tag).map((_, item) => (
                            new RSSItem(
                                $(item).find(this.config.title_tag).text(),
                                $(item).find(this.config.description_tag).text(),
                                $(item).find(this.config.url_tag).text()
                            )
                        )).get();

                        items = items.filter(item => {
                            return !this.readItems.some(readItem => readItem.equals(item));
                        })

                        this.readItems = [...this.readItems, ...items]

                        resolve(items);
                    } catch (error) {
                        reject(error);
                    }

                })

                response.on("error", () => {
                    reject("An unexpected error occurred")
                })
            })
        })
        
    }
}


class RSSReaderConfig {
    constructor(item_tag, title_tag, description_tag, url_tag) {
        this.item_tag = item_tag || "item"
        this.title_tag = title_tag || "title"
        this.description_tag = description_tag || "description"
        this.url_tag = url_tag || "link"
    }
}



class RSSItem {
    constructor(title, description, url) {
        this.title = title
        this.description = description
        this.url = url
    }

    toString() {
        return `
        Title: ${this.title}\n

        Description: ${this.description}\n

        Url: ${this.url}\n
        `
    }

    equals(rssItem) {
        return this.title == rssItem.title
    }
}



module.exports = { RSSReader, RSSReaderConfig, RSSItem};