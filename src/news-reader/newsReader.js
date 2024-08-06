const request = require("request")
const cheerio = require("cheerio")




class NewsReader {
    constructor(config) {
        this.config = config || new NewsReaderConfig()
        this.userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }

    readNew(url) {
        return new Promise((resolve, reject) => {
            const options = {
                url: url,
                headers: {
                    'User-Agent': this.userAgent,
                    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                    'Accept-Language': 'en-US,en;q=0.5',
                    'Referer': 'https://www.google.com/'
                }
            };
            request(options, (error, response, html) => {
                if(error || response.statusCode != 200)
                    resolve(null)

                const $ = cheerio.load(html)


                // Extract the title
                const title = $(this.config.title_identifier).text().trim();
                
                // Extract the description or key points
                const description = $(this.config.description_identifier).text().trim();
                
                // Extract the text content
                const textContent = $(this.config.content_identifier).text().trim();
                
                // Resolve a new New object
                resolve(new New(title, description, textContent));
                
            })
        })
    }

}


class New {
    constructor(title, description, textContent) {
        this.title = title
        this.description = description
        this.textContent = textContent
    }


    toString() {
        return `
Title: ${this.title}\n
Description: ${this.description}\n
Content: ${this.textContent}
        `
    }
}


class NewsReaderConfig {
    constructor(title_identifier, description_identifier, content_identifier) {
        this.title_identifier = title_identifier || "title",
        this.description_identifier = description_identifier || "description",
        this.content_identifier = content_identifier || "content"
    }
}



module.exports = {NewsReader, New, NewsReaderConfig}